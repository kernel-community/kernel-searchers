// update decsion on airtable
// given a searcher waller + application id -> update the "Decision" column
// get all applications assigned to a searcher
import { type NextApiRequest, type NextApiResponse } from "next";
import { pick } from "lodash";
import isInSearcherList from "src/server/utils/isInSearcherList";
import { retrieveDecisionRecord } from "src/server/airtable/retrieveDecisionRecord";
import { updateRecord } from "src/server/airtable/updateRecord";

const table = "v2: Searcher <> Applicant";


export type Decision = "YES" | "NO" | "UNDECIDED";

const updateApplicationDecision = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("[api] updating decision")

  const { address, applicationId, decision } = pick(req.body, ["address", "applicationId", "decision"]) as { address: string, applicationId: string, decision: Decision };

  const isSearcher = await isInSearcherList(address);

  if (!isSearcher) {
    res.status(500).json({ ok: false, data: { message: `address:${address} is not a searcher` } });
  }
  // fetch record id where searcher wallet = address and application id = applicationId
  const decisionRecord = await retrieveDecisionRecord({ searcherWalletAddress: address, applicationId });

  console.log("[api] decision record", decisionRecord);

  // update "DECISION" field for the record ID
  if (!decisionRecord?.[0]) {
    return res.status(200).json({ok:true, data: {message: "no update happened, couldnt fetch decision record id"}});
  }

  const response = await updateRecord({
    recordId: decisionRecord[0],
    columnName: "DECISION",
    value: decision,
    table
  })

  res.status(200).json({ ok: true, data: { response } });
}

export default updateApplicationDecision;

