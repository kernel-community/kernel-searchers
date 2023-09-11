import { type NextApiRequest, type NextApiResponse } from "next";
import { allSearchers } from "src/server/airtable/allSearchers";
import { pick } from "lodash";

const isWalletSearcher = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = pick(req.body, ["address"]) as { address: string };
  let addresses: string[] = [];
  try {
    addresses = await allSearchers();
  } catch(error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error
    })
  }
  const found = !!(addresses.find(searcher => searcher.toLowerCase() === address?.toLowerCase()));
  res.status(200).json({ ok: true, data: { isSearcher: found } });
}

export default isWalletSearcher;

