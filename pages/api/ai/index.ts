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
      let query = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You're an UX/UI Designer expert" },
          {
            role: "assistant",
            content: `Give the response in following format:
            [
              {
                "issue": "<text that refer to the phrase in content>",
                "type": "<UX | UI>",
                "sentiment": "<Positive | Negative | Neutral>",
                "label": "<Label of the phrase>",
                "suggestion": "<any suggestion | null>"
              },
              {
                ...
              }
            ]
          `,
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });
      const result = query.data.choices[0].message?.content || "";
      const jsonArray = JSON.parse(result) || [];
      const usage = {
        created: new Date(),
        //@ts-ignore
        thb: (query.data.usage?.total_tokens / 1000) * 0.02 * 35,
      };
      const analyze = {
        issues: jsonArray,
        usage: usage,
      } as Analyze;
      await createAnalyze(userId, projectId, documentId, pageId, analyze);
      console.timeEnd("ai");
      return res.status(200).send("");
    } catch (e: any) {
      console.log("Error with AI");
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
