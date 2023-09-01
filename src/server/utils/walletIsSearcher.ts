import { URL } from "./myUrl";

const walletIsSearcher = async (address: string): Promise<boolean> => {
  const res = await fetch(`${URL}/api/airtable/allSearchers`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
  });
  const data = await res.json() as { data: {addresses: string[] }};
  if (!data || !(data.data.addresses.length > 0)) return false;
  const allSearchers = data.data.addresses;
  const found = !!(allSearchers.find(searcher => searcher.toLowerCase() === address?.toLowerCase()));
  return found;
}

export default walletIsSearcher;
