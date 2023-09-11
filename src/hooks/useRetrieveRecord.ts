import { type FieldSet, type Record } from "airtable";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAccount } from "wagmi";
type Application = Record<FieldSet>;
export const useRetrieveRecord = ({id}: {id: string | undefined}) => {
  const [application, setApplication] = useState<Application>();
  const { isDisconnected, address } = useAccount();

  const{ isError, isLoading: loading } = useQuery(
    [`application-${id}`],
    async () => {
      const res = await axios.post<{ ok: boolean, data: {application: Record<FieldSet>} }>(`/api/getRecord`, { id }, {
        headers: { "Content-Type": "application/json" },
      })
      setApplication(res.data.data.application);
      return res;
    },
    {
      enabled: !isDisconnected && !!(address) && !!(id),
      notifyOnChangeProps: ["data"]
    }
  );
  return { application, loading, isError }
}

