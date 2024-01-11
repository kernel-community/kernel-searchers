// fetch all records from https://airtable.com/apptqJRyRxZ0QDi3h/tblsenvtTxjEWipMW/viwF9F1IepOVgwEA1?blocks=hide
// check if currently connected email is in the list

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { type User } from "@prisma/client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const useIsFellow = () => {
  const [isFellow, setIsFellow] = useState<boolean>(false);
  const [fellow, setFellow] = useState<User>();
  const [error, setError] = useState<boolean>(false);
  const { user } = useDynamicContext();

  useQuery(
    [`user-${user?.email}`],
    async () => {
      await axios.post<{ ok: boolean, data: { isFellow: boolean, fellow: User } }>(`/api/isUserFellow`, {email: user?.email}, {
        headers: { "Content-Type": "application/json" }
      })
      .then((v) => {
        setIsFellow(v.data.data.isFellow);
        setFellow(v.data.data.fellow);
      })
      .catch(() => setError(true))
    },
    {
      enabled: !!(user),
      refetchInterval: 100
    }
  );

  return { isFellow, error, fellow }
}

