import { allSearchers } from "../airtable/allSearchers";

const isInSearcherList = async (wallet: string) => {
  let addresses: string[] = [];
  try {
    addresses = await allSearchers();
  } catch(error) {
    console.error(error);
    throw error;
  }
  const found = !!(addresses.find(searcher => searcher.toLowerCase() === wallet.toLowerCase()));
  return found;
}
export default isInSearcherList;