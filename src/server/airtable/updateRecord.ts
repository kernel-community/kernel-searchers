// given record id and column name and value
// update
import Airtable from "airtable";
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })
const baseId = "appYaT73RTzmoKIrq";
const base = airtable.base(baseId);

export const updateRecord = async ({
  recordId, columnName, value, table
}: {
  recordId: string,
  columnName: string,
  value: string | undefined,
  table: string
}) => {
  let response;
  console.log("value", value);
  try {
    response = await base(table).update([
      {
        "id": recordId,
        "fields": {
          [columnName]: value
        }
      }
    ])
    console.log({response});
  } catch (err) {
    console.error(err);
    throw err;
  }

  return response;
}
