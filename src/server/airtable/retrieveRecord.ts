import Airtable from "airtable";
import { BASE_ID, EXPRESSIONS_TABLE } from "./constants";
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })

const baseId = BASE_ID;
const table = EXPRESSIONS_TABLE.tableName;
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
