import { type Searcher } from "src/@types";
import { allSearchers } from "../airtable/allSearchers";

const isInSearcherList = async (wallet: string): Promise<{
  isSearcher: boolean,
  searcher?: Searcher
}> => {
  let addresses: Searcher[] = [];
  try {
    addresses = await allSearchers();
  } catch(error) {
    console.error(error);
    throw error;
  }
  if (wallet) {
    const found = addresses.find(searcher => searcher.wallet.toLowerCase() === wallet.toLowerCase());
    return {
      isSearcher: !!found,
      searcher: {
        wallet,
        name: found?.name ?? ""
      }
    };
  }
  else return {
    isSearcher: false,
    searcher: undefined
  };
}
export default isInSearcherList;