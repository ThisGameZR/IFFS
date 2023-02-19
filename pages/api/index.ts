import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
  }
  if (req.method === "POST") {
  }
  if (req.method === "PUT") {
  }
  if (req.method === "DELETE") {
  }
  res.status(200).send({ name: "John Doe" });
}
