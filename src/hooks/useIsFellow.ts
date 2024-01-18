// fetch all records from https://airtable.com/apptqJRyRxZ0QDi3h/tblsenvtTxjEWipMW/viwF9F1IepOVgwEA1?blocks=hide
// check if currently connected email is in the list

import { useState } from "react";
import { useQuery } from "react-query";
import { type User } from "@prisma/client";
import { prisma } from "src/server/db";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import isInFellowList from "src/server/utils/isInFellowList";
import { boolean } from "zod";

let findUser: User | null
let isUserFellow: boolean
let userFellow: User | undefined

export const useIsFellow = () => {
  return { isUserFellow, userFellow }
}

export async function getServerSideProps() {
  const { user } = useDynamicContext();
  findUser = await prisma.user.findUnique({
    where: { email: user?.email },
    include: {
      profile: true
    }
  });

  isUserFellow = (await isInFellowList(findUser?.email as string)).isFellow
  userFellow = (await isInFellowList(findUser?.email as string)).fellow
}
