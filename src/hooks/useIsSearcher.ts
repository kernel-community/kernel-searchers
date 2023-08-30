// fetch all records from https://airtable.com/appYaT73RTzmoKIrq/tblWJoEbUvBNuI7za/viwyOE4wFq6es9a7B?blocks=hide
// check if currently connected acc is inthe list

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAccount } from "wagmi";

export const useIsSearcher = () => {
  const [isSearcher, setIsSearcher] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { isDisconnected, address } = useAccount();

  useQuery(
    [`user-searcher`],
    async () => {
      await axios.post<{ ok: boolean, data: { addresses: string[] } }>(`/api/airtable/allSearchers`, {
        headers: { "Content-Type": "application/json" }
      })
      .then((v) => {
        if (v.data && v.data.data.addresses.length > 0) {
          const allSearchers = v.data.data.addresses;
          const found = allSearchers.find(searcher => searcher.toLowerCase() === address?.toLowerCase())
          if (found) {
            return setIsSearcher(true);
          }
          return setIsSearcher(false);
        }
        setIsSearcher(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    },
    {
      enabled: !isDisconnected && !!(address),
    }
  );

  return { isSearcher, loading, error }
}

