import { NextApiRequest, NextApiResponse } from "next";

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    return res
      .status(200)
      .json({ success: "the api has successfully been called" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
