import { type NextApiRequest, type NextApiResponse } from "next";
import getWeights from "../../lib/getWeights";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  const weights = await getWeights();
  return res.send(weights);
};

export default restricted;
