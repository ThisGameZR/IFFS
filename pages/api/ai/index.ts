import { createAnalyze, getAnalyzes } from "firestore/analyze";
import { Analyze } from "models/Project";
import type { NextApiRequest, NextApiResponse } from "next";
import openai from "utils/openaiClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
    try {
      const { userId, projectId, documentId, pageId } = req.query;
      const analyzes = await getAnalyzes(userId as string, projectId as string, documentId as string, pageId as string);
      // console.log(analyzes);
      return res.status(200).json(analyzes);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  }
  if (req.method === "POST") {
    const { prompt, userId, projectId, documentId, pageId } = req.body;
    if (!prompt) {
      return res.status(400).json({
        message: "Require prompt",
        success: false,
      });
    }
    try {
      let query = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `prompt:${prompt}\n Identify sentences which imply issue and return it in array`,
        max_tokens: 3000,
        temperature: 0,
      });

      let usage = {
        created: new Date(),
        //@ts-ignore
        thb: (query.data.usage?.total_tokens / 1000) * 0.02 * 35,
      };
      const issues = JSON.parse(query.data.choices[0].text!);
      let arrays: any[] = [];
      await Promise.all(
        issues.map(async (i: any) => {
          let sentiment = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `prompt:${i} Return sentiment as <Positive || Negative> only do not include any thing other than this`,
            max_tokens: 1000,
            temperature: 0,
          });
          let type = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `prompt:${i} Return type as <UX || UI> only do not include any thing other than this`,
            max_tokens: 1000,
            temperature: 0,
          });
          let label = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `prompt:${i} Giving this issue a label, return only label name`,
            max_tokens: 1000,
            temperature: 0,
          });
          let suggestion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `prompt:${i} Return any suggestion you could think of (not too long)`,
            max_tokens: 2000,
            temperature: 0.7,
          });
          usage = {
            ...usage,
            thb:
              usage.thb +
              //@ts-ignore
              (sentiment.data.usage?.total_tokens / 1000) * 0.02 * 35 +
              //@ts-ignore
              (type.data.usage?.total_tokens / 1000) * 0.02 * 35 +
              //@ts-ignore
              (label.data.usage?.total_tokens / 1000) * 0.02 * 35 +
              //@ts-ignore
              (suggestion.data.usage?.total_tokens / 1000) * 0.02 * 35,
          };
          arrays.push({
            issue: i,
            sentiment: sentiment.data.choices[0].text!,
            type: type.data.choices[0].text,
            label: label.data.choices[0].text,
            suggestion: suggestion.data.choices[0].text,
          });
        })
      );
      arrays = arrays.map((a) => {
        return {
          issue: a.issue.replace(/(\r\n|\n|\r)/gm, ""),
          sentiment: a.sentiment.replace(/(\r\n|\n|\r)/gm, ""),
          type: a.type.replace(/(\r\n|\n|\r)/gm, ""),
          label: a.label.replace(/(\r\n|\n|\r)/gm, ""),
          suggestion: a.suggestion.replace(/(\r\n|\n|\r)/gm, ""),
        };
      });
      const analyze = {
        issues: arrays,
        usage: usage,
      } as Analyze;
      await createAnalyze(userId, projectId, documentId, pageId, analyze);
      return res.status(200).send(analyze);
    } catch (e: any) {
      console.log(e);
      return res.status(400).send("AI error: " + JSON.stringify(e));
    }
  }
  if (req.method === "PUT") {
  }
  if (req.method === "DELETE") {
  }
  return res.status(400).send("Bad request");
}
