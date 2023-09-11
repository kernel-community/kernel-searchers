import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAccount } from "wagmi";
export type Decision = "YES" | "NO" | "UNDECIDED";

export const useApplicationDecision = ({
  applicationId,
  decision
}: {
  applicationId: string | undefined,
  decision?: Decision
}) => {
  const [applicationDecisionId, setApplicationDecisionId] = useState<string[]>();
  const { isDisconnected, address } = useAccount();

  const{ isError, isLoading: loading } = useQuery(
    [`decision-${address}-${applicationId}`],
    async () => {
      const res = await axios.post<{ ok: boolean, data: {decisionRecord: string[]} }>(`/api/getApplicationDecision`, { address, applicationId }, {
        headers: { "Content-Type": "application/json" },
      })
      setApplicationDecisionId(res.data.data.decisionRecord);
      return res;
    },
    {
      enabled: !isDisconnected && !!(address) && !!(applicationId),
      notifyOnChangeProps: ["data"]
    }
  );

  const{
    isError: isUpdateDecisionError,
    isLoading: isUpdatingDecision,
    refetch: updateDecision
  } = useQuery(
    [`decision-${address}-${applicationId}`],
    async () => {
      const res = await axios.post<{ ok: boolean, data: {response: string[]} }>(`/api/updateApplicationDecision`, { address, applicationId, decision }, {
        headers: { "Content-Type": "application/json" },
      })
      return res;
    },
    {
      enabled: false
    }
  );

  return {
    applicationDecisionId,
    loading,
    isError,
    updateDecision,
    isUpdateDecisionError,
    isUpdatingDecision
  }
}

