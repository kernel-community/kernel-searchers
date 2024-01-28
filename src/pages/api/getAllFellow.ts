import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db";
import _ from "lodash";

const getAllFellow = async (req: NextApiRequest, res: NextApiResponse) => {
  const getBlock = _.property('req.query.block')
  const block: number = getBlock(req) as number
  const profiles = await prisma.user.findMany({
    where: { block: { equals: block } },
    include: { profile: true }
  })
  if (!profiles) {
    res.status(500).json({ ok: false, data: { message: `No profiles found` } });
  }
  res.status(200).json({ ok: true, data: { profiles } });
}

export default getAllFellow
