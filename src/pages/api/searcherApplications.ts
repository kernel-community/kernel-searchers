// get all applications assigned to a searcher
import { type NextApiRequest, type NextApiResponse } from "next";
import { pick, uniqBy } from "lodash";
import isInSearcherList from "src/server/utils/isInSearcherList";
import { allApplicationsForSearcher } from "src/server/airtable/allApplicationsForSearcher";
import { retrieveRecord } from "src/server/airtable/retrieveRecord";
import { ASSIGNMENTS_TABLE } from "src/server/airtable/constants";
import { type Applicant } from "src/@types";


const searcherApplications = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = pick(req.body, ["address"]) as { address: string };
  const isSearcher = await isInSearcherList(address);
  if (!isSearcher) {
    return res.status(500).json({ ok: false, data: { message: "is not a searcher" } });
  }
  let applicants: Applicant[] = [];
  const assignmentIds = await allApplicationsForSearcher(address);
  const retrievedAssignmentRecordPromises = assignmentIds.map(id => retrieveRecord(id));
  const retrievedAssignment = await Promise.all(retrievedAssignmentRecordPromises);

  applicants = uniqBy(retrievedAssignment.map((applicant) => {
    return {
      id: applicant.fields[ASSIGNMENTS_TABLE.columns.applicantRecordId]?.toString(),
      name: applicant.fields[ASSIGNMENTS_TABLE.columns.applicantName]?.toString(),
      searcherDecision: applicant.fields[ASSIGNMENTS_TABLE.columns.decision]?.toString()
    }
  }), "id");


  // fetch data for each of these ids
  return res.status(200).json({ ok: true, data: {applicants} });
}

export default searcherApplications;

