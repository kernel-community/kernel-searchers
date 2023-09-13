// get all applications assigned to a searcher
import { type NextApiRequest, type NextApiResponse } from "next";
import { pick } from "lodash";
import isInSearcherList from "src/server/utils/isInSearcherList";
import { allApplicationsForSearcher } from "src/server/airtable/allApplicationsForSearcher";

const searcherApplications = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = pick(req.body, ["address"]) as { address: string };
  const isSearcher = await isInSearcherList(address);
  if (!isSearcher) {
    return res.status(500).json({ ok: false, data: { message: "is not a searcher" } });
  }
  const applicants = await allApplicationsForSearcher(address);
  return res.status(200).json({ ok: true, data: {applicants} });
}

export default searcherApplications;

