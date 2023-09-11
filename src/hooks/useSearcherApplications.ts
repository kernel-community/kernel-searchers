// fetch all records from https://airtable.com/appYaT73RTzmoKIrq/tblWJoEbUvBNuI7za/viwyOE4wFq6es9a7B?blocks=hide
// check if currently connected acc is inthe list

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAccount } from "wagmi";

export const useSearcherApplications = () => {
  const [applicants, setApplicants] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { isDisconnected, address } = useAccount();

  useQuery(
    [`user-searcher-applications`],
    async () => {
      await axios.post<{ ok: boolean, data: {applicants: string[]} }>(`/api/searcherApplications`, { address }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((v) => {
        setApplicants(v.data.data.applicants);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    },
    {
      enabled: !isDisconnected && !!(address),
    }
  );

  return { applicants, loading, error }
}

