import { createAnalyze, getAnalyzes } from "firestore/analyze";
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
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 3000,
      });
      await createAnalyze(userId, projectId, documentId, pageId, {
        //@ts-ignore
        text: completion.data.choices[0].text,
        created: new Date(),
        //@ts-ignore
        usage: {
          ...completion.data.usage,
          //@ts-ignore
          thb: (completion.data.usage?.total_tokens / 1000) * 0.02 * 35,
        },
      });
      // console.log(completion.data.choices[0].text);
      return res.status(200).send(completion.data);
    } catch (e: any) {
      console.log(e);
      return res.status(400).send("Error with the AI");
    }
  }
  if (req.method === "PUT") {
  }
  if (req.method === "DELETE") {
  }
  return res.status(400).send("Bad request");
}
