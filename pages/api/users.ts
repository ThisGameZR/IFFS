import { createUser, getUsers } from "firestore/user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;
  switch (method) {
    case "GET":
      return res.status(200).json(await getUsers());
    case "POST":
      const { user } = req.body;
      const newUser = await createUser(user);
      return res.status(200).json(newUser);
    default:
      return res.status(405).end();
  }
}
