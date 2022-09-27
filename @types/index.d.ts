import type { NextApiRequest } from "next";

interface NextApiAuthRequest extends NextApiRequest {
  user: string;
}
