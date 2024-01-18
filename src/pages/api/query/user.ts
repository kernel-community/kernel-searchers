import { type User } from "@prisma/client";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import  {prisma} from "src/server/db";
export default async function user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, userId } = _.pick(req.body, ["email", "userId"]);
  let user: User | null = null;
  if (userId) {
    user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true
      }
    });
  }
  if (email) {
    user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true
      }
    });
  }
  if (!user) {
    return res.status(200).json({
      ok: false,
      data: undefined,
    });
  }
  return res.status(200).json({
    ok: true,
    data: user,
  });
}
