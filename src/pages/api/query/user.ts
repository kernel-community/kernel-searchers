import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import  {prisma} from "src/server/db";
export default async function user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = _.pick(req.body, ["email"]);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  res.status(200).json({
    data: user,
  });
}
