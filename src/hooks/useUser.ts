import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { type User } from "@prisma/client";
import { useState } from "react";
import { useQuery } from "react-query";

/**
 * either provide a userId to query the database for the a specific user's info
 * or fetch currently logged in user's data through email
 */
const useUser = ({ userId }: { userId?: string } = {}) => {
  const { isAuthenticated, handleLogOut, user } = useDynamicContext();
  const [fetchedUser, setFetchedUser] = useState<User & {isSignedIn: boolean}>();
  const email = user?.email;

  useQuery(
    [`user-${email}-${userId}`],
    async () => {
      try {
        const r = (
          await (
            await fetch("/api/query/user", {
              body: JSON.stringify({ email, userId }),
              method: "POST",
              headers: { "Content-type": "application/json" },
            })
          ).json()
        );
        if (r.ok === true) {
          setFetchedUser(() => {
            return {
              ...r.data,
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
      cacheTime: 0,
    }
  );
  return {
    handleLogOut, user: fetchedUser
  }
}

export default useUser;
