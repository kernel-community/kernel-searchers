import { prisma } from "src/server/db";
import isInFellowList from "src/server/utils/isInFellowList";

const fetchData = async (email: string | undefined) => {
  const findUser = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
    },
  });

  const { isFellow, fellow } = await isInFellowList(findUser?.email as string);

  return {
    isUserFellow: isFellow,
    userFellow: fellow,
  };
};

export const isUserFellow = async (email: string | undefined) => {
  email = email
  const { isUserFellow, userFellow } = await fetchData(email);
  return {
    isUserFellow: isUserFellow,
    userFellow: userFellow,
  };
}

export default isUserFellow
