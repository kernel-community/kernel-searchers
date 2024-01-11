// query airtable to check if an email is a fellow
import { type NextApiRequest, type NextApiResponse } from "next";
import { pick } from "lodash";
import isInFellowList from "src/server/utils/isInFellowList";

const isUserFellow = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("[api/isUserFellow]")
  const { email } = pick(req.body, ["email"]) as { email: string };
  if (email) {
    const found = await isInFellowList(email);
    return res.status(200).json({ ok: true, data: { isFellow: found.isFellow, fellow: found.fellow } });
  }

  return res.status(200).json({
    ok: true, data: { isFellow: false, fellow: undefined }
  })
}

export default isUserFellow;