// fetch all records from https://airtable.com/appYaT73RTzmoKIrq/tblWJoEbUvBNuI7za/viwyOE4wFq6es9a7B?blocks=hide
// check if currently connected acc is inthe list

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { type Searcher } from "src/@types";
import { useAccount } from "wagmi";

export const useIsSearcher = () => {
  const [isSearcher, setIsSearcher] = useState<boolean>(false);
  const [searcher, setSearcher] = useState<Searcher>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { isDisconnected, address } = useAccount();

  useQuery(
    [`user-searcher`],
    async () => {
      await axios.post<{ ok: boolean, data: { isSearcher: boolean, searcher: Searcher } }>(`/api/isWalletSearcher`, {address}, {
        headers: { "Content-Type": "application/json" }
      })
      .then((v) => {
        const isSearcher = v.data.data.isSearcher;
        const searcherFromResponse = v.data.data.searcher;
        setIsSearcher(isSearcher);
        setSearcher(searcherFromResponse)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    },
    {
      enabled: !isDisconnected && !!(address),
    }
  );

  return { isSearcher, loading, error, searcher }
}

