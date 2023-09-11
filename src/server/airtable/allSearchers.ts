import Airtable from "airtable";
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })

const baseId = "appYaT73RTzmoKIrq";
const table = "v2: Searchers";
// make sure this view is filtered for wallets = not null
const view = "[don't edit] With Wallets";
const addressColumn = "wallet"
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