import Airtable from "airtable";
import { BASE_ID, SEARCHERS_TABLE } from "./constants";
import { type Searcher } from "src/@types";
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })
const baseId = BASE_ID;
const table = SEARCHERS_TABLE.tableName;
// make sure this view is filtered for wallets = not null
const view = SEARCHERS_TABLE.views.wallet;
const addressColumn = SEARCHERS_TABLE.columns.address;
const nameColumn = SEARCHERS_TABLE.columns.name;
const base = airtable.base(baseId);

export const allSearchers = async () => {
  const addresses: Searcher[] = [];
  try {
    await base(table).select({ view }).eachPage((records, next) => {
      records.forEach(record => addresses.push({
        wallet: record.get(addressColumn) as string,
        name: record.get(nameColumn) as string
      }));
      next();
    })
  } catch(error) {
    console.error(error);
    throw error;
  }
  return addresses;
}