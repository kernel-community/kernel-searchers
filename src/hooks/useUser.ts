import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { type User } from "@prisma/client";
import { useState } from "react";
import { useQuery } from "react-query";


const useUser = () => {
  const { isAuthenticated, handleLogOut, user } = useDynamicContext();
  const [fetchedUser, setFetchedUser] = useState<User & {isSignedIn: boolean}>();
  const email = user?.email;

  useQuery(
    [`user-${email}`],
    async () => {
      try {
        const r = (
          await (
            await fetch("/api/query/user", {
              body: JSON.stringify({ email }),
              method: "POST",
              headers: { "Content-type": "application/json" },
            })
          ).json()
        ).data;
        if (r) {
          setFetchedUser(() => {
            return {
              ...r,
              // the user was successfully found
              // in the database + the user is
              // connected via web3
              isSignedIn: isAuthenticated,
            };
          });
        }
      } catch (err) {
        /**
         * if user not found, disconnect
         */
        await handleLogOut();
      }
    },
    {
      enabled: isAuthenticated
    }
  );
  return {
    handleLogOut, user: fetchedUser
  }
}

export default useUser;
