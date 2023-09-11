import { allSearchers } from "../airtable/allSearchers";

const isInSearcherList = async (wallet: string) => {
  let addresses: string[] = [];
  try {
    addresses = await allSearchers();
  } catch(error) {
    console.error(error);
    throw error;
  }
  if (wallet) {
    const found = !!(addresses.find(searcher => searcher.toLowerCase() === wallet.toLowerCase()));
    return found;
  }
  else return false;
}
export default isInSearcherList;