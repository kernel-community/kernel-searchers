import { allFellows } from "./allFellows";
import { type User } from "@prisma/client";

const isInFellowList = async (email: string): Promise<{
  isFellow: boolean,
  fellow?: User
}> => {
  let fellows: User[] = [];
  try {
    fellows = await allFellows();
  } catch(error) {
    console.error(error);
    throw error;
  }
  if (email) {
    const found = fellows.find(fellow => fellow?.email?.toLowerCase() === email.toLowerCase() && fellow.block > -1);
    console.log('email', email)
    console.log('found', found)
    return {
      isFellow: !!found,
      fellow: found
    };
  }
  else return {
    isFellow: false,
    fellow: undefined
  };
}
export default isInFellowList;
