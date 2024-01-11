import { type User } from "@prisma/client";
import { useState } from "react";
import { useQuery } from "react-query";

/**
 * either provide a userId to query the database for the a specific user's info
 * or fetch currently logged in user's data through email
 */
const useUserFromUserId = ({ userId }: { userId?: string }) => {
  const [fetchedUser, setFetchedUser] = useState<User & {isSignedIn: boolean}>();
  useQuery(
    [`user-${userId}`],
    async () => {
      try {
        const r = (
          await (
            await fetch("/api/query/user", {
              body: JSON.stringify({ userId }),
              method: "POST",
              headers: { "Content-type": "application/json" },
            })
          ).json()
        );
        if (r.ok === true) {
          setFetchedUser(() => {
            return {
              ...r.data
            };
          });
        }
      } catch (err) {
        /**
         * if user not found, disconnect
         */
        console.log(err)
        throw err;
      }
    },
    {
      cacheTime: 0,
      enabled: !!(userId)
    }
  );
  return { user: fetchedUser }
}

export default useUserFromUserId;
