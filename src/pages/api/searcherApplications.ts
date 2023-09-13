// get all applications assigned to a searcher
import { type NextApiRequest, type NextApiResponse } from "next";
import { pick } from "lodash";
import isInSearcherList from "src/server/utils/isInSearcherList";
import { allApplicationsForSearcher } from "src/server/airtable/allApplicationsForSearcher";
import { retrieveRecord } from "src/server/airtable/retrieveRecord";
import { EXPRESSIONS_TABLE } from "src/server/airtable/constants";

type Applicant = {
  id: string | undefined;
  name: string | undefined;
  searcherDecision: string | undefined;
}


const searcherApplications = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = pick(req.body, ["address"]) as { address: string };
  const isSearcher = await isInSearcherList(address);
  if (!isSearcher) {
    return res.status(500).json({ ok: false, data: { message: "is not a searcher" } });
  }
  let applicants: Applicant[] = [];
  const applicantsIds = await allApplicationsForSearcher(address);
  const retrievedApplicantRecordPromises = applicantsIds.map(id => retrieveRecord(id));
  const retrievedApplicants = await Promise.all(retrievedApplicantRecordPromises);

  applicants = retrievedApplicants.map((applicant) => {
    return {
      id: applicant.fields[EXPRESSIONS_TABLE.columns.recordId]?.toString(),
      name: applicant.fields[EXPRESSIONS_TABLE.columns.name]?.toString(),
      searcherDecision: applicant.fields[EXPRESSIONS_TABLE.columns.decision]?.toString()
    }
  })

  // fetch data for each of these ids
  return res.status(200).json({ ok: true, data: {applicants} });
}

export default searcherApplications;

