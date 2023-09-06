// get all searchers from airtable
import Airtable from "airtable";
import { type NextApiRequest, type NextApiResponse } from "next";
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })

const baseId = "appYaT73RTzmoKIrq";
const table = "v2: Searchers";
const view = "Grid view";
const addressColumn = "wallet"

const base = airtable.base(baseId);

const allSearchers = async (req: NextApiRequest, res: NextApiResponse) => {
  const addresses: string[] = [];
  try {
    await base(table).select({ view }).eachPage((records, next) => {
      records.forEach(record => addresses.push(record.get(addressColumn) as string));
      next();
    })
  } catch(error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error
    })
  }

  res.status(200).json({ ok: true, data: { addresses } });
}

export default allSearchers;

