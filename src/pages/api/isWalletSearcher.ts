import { type NextApiRequest, type NextApiResponse } from "next";
import { pick } from "lodash";
import isInSearcherList from "src/server/utils/isInSearcherList";

const isWalletSearcher = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = pick(req.body, ["address"]) as { address: string };
  const found = await isInSearcherList(address);
  res.status(200).json({ ok: true, data: { isSearcher: found.isSearcher, searcher: found.searcher } });
}

export default isWalletSearcher;

