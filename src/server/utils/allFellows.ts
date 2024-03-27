import  {prisma} from "src/server/db";

export const allFellows = async () => prisma.user.findMany({});
