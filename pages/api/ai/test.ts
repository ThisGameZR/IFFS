import type { NextApiRequest, NextApiResponse } from "next";
import openai from "utils/openaiClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return res.status(400).send("No request available now");
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You there?`,
  });
  return res.status(200).send(completion.data);
}
