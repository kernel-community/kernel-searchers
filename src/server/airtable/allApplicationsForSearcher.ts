import Airtable from "airtable";
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })

const baseId = "appYaT73RTzmoKIrq";
const table = "v2: Searcher <> Applicant";
// make sure this view is filtered for wallets = not null
const view = "[don't edit] Grid view";
const addressColumn = "Searcher wallet"
const applicantRecordIdColumn = "Applicant ID";
const base = airtable.base(baseId);

export const allApplicationsForSearcher = async (address: string): Promise<string[]> => {
  const applicants: string[] = [];
  try {
    await base(table).select({
      view,
      filterByFormula: `({${addressColumn}} = '${address}')`
    }).eachPage((records, next) => {
      records.forEach(record => applicants.push(record.get(applicantRecordIdColumn) as string));
      next();
    })
  } catch(error) {
    console.error(error);
    throw error;
  }
  return applicants.flat();
}