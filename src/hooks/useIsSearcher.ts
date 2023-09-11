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
      await axios.post<{ ok: boolean, data: { isSearcher: boolean } }>(`/api/isWalletSearcher`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({address})
      })
      .then((v) => {
        const isSearcher = v.data.data.isSearcher;
        setIsSearcher(isSearcher);
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

