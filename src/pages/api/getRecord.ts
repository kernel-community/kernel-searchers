// get all application data given an airtable record id
import { type NextApiRequest, type NextApiResponse } from "next";
import { pick } from "lodash";
import { retrieveRecord } from "src/server/airtable/retrieveRecord";

const getRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = pick(req.body, ["id"]) as { id: string };
  const application = await retrieveRecord(id);
  res.status(200).json({ ok: true, data: {application} });
}

export default getRecord;
