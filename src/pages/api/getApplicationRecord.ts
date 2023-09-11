// get all application data given an airtable record id
import { type NextApiRequest, type NextApiResponse } from "next";
import { pick } from "lodash";
import { retrieveApplication } from "src/server/airtable/retrieveApplication";

const getApplicationRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const { applicationId } = pick(req.body, ["applicationId"]) as { applicationId: string };
  const application = await retrieveApplication(applicationId);
  res.status(200).json({ ok: true, data: {application} });
}

export default getApplicationRecord;
