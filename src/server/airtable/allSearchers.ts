import Airtable from "airtable";
import { BASE_ID, SEARCHERS_TABLE } from "./constants";
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })

const baseId = BASE_ID;
const table = SEARCHERS_TABLE.tableName;
// make sure this view is filtered for wallets = not null
const view = SEARCHERS_TABLE.views.wallet;
const addressColumn = SEARCHERS_TABLE.columns.address
const base = airtable.base(baseId);

export const allSearchers = async () => {
  const addresses: string[] = [];
  try {
    await base(table).select({ view }).eachPage((records, next) => {
      records.forEach(record => addresses.push(record.get(addressColumn) as string));
      next();
    })
  } catch(error) {
    console.error(error);
    throw error;
  }
  return addresses;
}