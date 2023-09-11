import Airtable from "airtable";
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })

const baseId = "appYaT73RTzmoKIrq";
const table = "v2: Expressions";
const base = airtable.base(baseId);

export const retrieveRecord = async (id: string) => {
  let application;
  try {
    application = await base(table).find(id);
  } catch(error) {
    console.error(error);
    throw error;
  }
  return application;
}