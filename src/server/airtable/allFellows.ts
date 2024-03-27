import Airtable from "airtable";
import { ALL_FELLOWS_TABLE } from "./constants";
import { type Fellow } from "src/@types";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })
const baseId = ALL_FELLOWS_TABLE.base;
const table = ALL_FELLOWS_TABLE.tableName;
// make sure this view is filtered for wallets = not null
const view = ALL_FELLOWS_TABLE.views.raw;
const emailColumn = ALL_FELLOWS_TABLE.columns.email;
const nameColumn = ALL_FELLOWS_TABLE.columns.name;
const base = airtable.base(baseId);

export const allFellows = async () => {
  const fellows: Fellow[] = [];
  try {
    await base(table).select({ view }).eachPage((records, next) => {
      records.forEach(record => fellows.push({
        email: record.get(emailColumn) as string,
        name: record.get(nameColumn) as string
      }));
      next();
    })
  } catch(error) {
    console.error(error);
    throw error;
  }
  return fellows;
}