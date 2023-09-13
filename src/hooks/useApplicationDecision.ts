import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAccount } from "wagmi";
export type Decision = {
  value: "YES" | "NO" | "UNDECIDED",
  label: string;
};

export const DECISIONS = {
  "yes": {
    value: "YES" as Decision["value"],
    label: "✅"
  },
  "no": {
    value: "NO" as Decision["value"],
    label: "❌"
  },
  "undecided": {
    value: "UNDECIDED" as Decision["value"],
    label: "Remove decision"
  }
}

export const DecisionToString = {
  "YES": "Yes",
  "NO": "No",
  "UNDECIDED": "Undecided"
}

export const useApplicationDecision = ({ applicationId }: { applicationId: string | undefined }) => {
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

  const [isUpdatingDecision, setIsUpdatingDecision] = useState<boolean>(false);
  const [isUpdateDecisionError, setIsUpdateDecisionError] = useState<boolean>(false);

  const updateDecision = async (decision: Decision) => {
    setIsUpdatingDecision(true);
    setIsUpdateDecisionError(false);
    try {
      const res = await axios.post<{ ok: boolean, data: {response: string[]} }>(`/api/updateApplicationDecision`, { address, applicationId, decision: decision?.value }, {
        headers: { "Content-Type": "application/json" },
      })
      setIsUpdatingDecision(false);
      return res;
    } catch (err) {
      setIsUpdatingDecision(false);
      setIsUpdateDecisionError(true);
      console.log(err);
      return;
    }
  }

  return {
    applicationDecisionId,
    loading,
    isError,
    updateDecision,
    isUpdateDecisionError,
    isUpdatingDecision
  }
}

