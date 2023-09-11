// update decsion on airtable
// given a searcher waller + application id -> get the "Decision" column
import { type NextApiRequest, type NextApiResponse } from "next";
import { pick } from "lodash";
import isInSearcherList from "src/server/utils/isInSearcherList";
import { retrieveDecisionRecord } from "src/server/airtable/retrieveDecisionRecord";


const getApplicationDecision = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, applicationId } = pick(req.body, ["address", "applicationId"]) as { address: string, applicationId: string };
  const isSearcher = await isInSearcherList(address);
  if (!isSearcher) {
    res.status(500).json({ ok: false, data: { message: `address:${address} is not a searcher` } });
  }
  // fetch record id where searcher wallet = address and application id = applicationId
  const decisionRecord = await retrieveDecisionRecord({ searcherWalletAddress: address, applicationId });
  res.status(200).json({ ok: true, data: { decisionRecord } });
}

export default getApplicationDecision;

