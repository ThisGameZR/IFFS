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
    console.time("ai");
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
        prompt: `prompt:"${prompt}"\n Identify phrases and return it as an array`,
        max_tokens: 3000,
        temperature: 0.7,
      });

      let usage = {
        created: new Date(),
        //@ts-ignore
        thb: (query.data.usage?.total_tokens / 1000) * 0.02 * 35,
      };
      const issues = query.data.choices[0]
        .text!.replace(/\[|\]/g, "")
        .replaceAll("'", "")
        .replace(/(\r\n|\n|\r)/gm, "")
        .trim()
        .split(",");
      let arrays: any[] = [];
      await Promise.all(
        issues.map(async (i: any) => {
          let sentiment = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `prompt:"${i}" Is this Positive, Negative or Neutral`,
            max_tokens: 1000,
            temperature: 0,
          });
          let type = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `prompt:"${i}" Is this UX or UI problem, return only UX or UI do not type anything other than this`,
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
            prompt: `How to improve this or any suggestion: ${i}`,
            max_tokens: 3000,
            temperature: 1,
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
          const sen = sentiment.data.choices[0].text?.toLowerCase().includes("neutral")
            ? "Neutral"
            : sentiment.data.choices[0].text?.toLowerCase().includes("positive")
            ? "Positive"
            : "Negative";
          const ty = type.data.choices[0].text?.toLowerCase().includes("ux") ? "UX" : "UI";
          arrays.push({
            issue: i,
            sentiment: sen,
            type: ty,
            label: label.data.choices[0].text,
            suggestion: suggestion.data.choices[0].text,
          });
        })
      );
      arrays = arrays.map((a) => {
        return {
          issue: cleanString(a.issue),
          sentiment: cleanString(a.sentiment),
          type: cleanString(a.type),
          label: cleanString(a.label),
          suggestion: cleanString(a.suggestion),
        };
      });
      const analyze = {
        issues: arrays,
        usage: usage,
      } as Analyze;
      await createAnalyze(userId, projectId, documentId, pageId, analyze);
      console.timeEnd("ai");
      return res.status(200).send(analyze);
    } catch (e: any) {
      console.log(e);
      return res.status(400).send(e);
    }
  }
  if (req.method === "PUT") {
  }
  if (req.method === "DELETE") {
  }
  return res.status(400).send("Bad request");
}

function cleanString(string: string) {
  return string.replace(/(\r\n|\n|\r)/gm, "");
}
