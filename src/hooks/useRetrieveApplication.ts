import { type FieldSet, type Record } from "airtable";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAccount } from "wagmi";
type Application = Record<FieldSet>;
export const useRetrieveApplication = ({applicationId}: {applicationId: string | undefined}) => {
  const [application, setApplication] = useState<Application>();
  const { isDisconnected, address } = useAccount();

  const{ isError, isLoading: loading } = useQuery(
    [`application-${applicationId}`],
    async () => {
      const res = await axios.post<{ ok: boolean, data: {application: Record<FieldSet>} }>(`/api/getApplicationRecord`, { applicationId }, {
        headers: { "Content-Type": "application/json" },
      })
      setApplication(res.data.data.application);
      return res;
    },
    {
      enabled: !isDisconnected && !!(address) && !!(applicationId),
      notifyOnChangeProps: ["data"]
    }
  );
  return { application, loading, isError }
}

