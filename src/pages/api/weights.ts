import { get } from "lodash";
import { type NextApiRequest, type NextApiResponse } from "next";
import addWeight from "../../lib/weights/addWeight";
import getWeights from "../../lib/weights/getWeights";
import { Weight } from "../../models/WeightData";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const weights = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  if (req.method === "GET") {
    const weights = await getWeights();
    return res.status(200).send(weights);
  } else if (req.method === "POST") {
    try {
      // Convert the date to a string
      if ("date" in req.body) {
        req.body["date"] = new Date(req.body["date"]);
      }

      const weightData = Weight.parse(req.body);
      await addWeight(weightData);

      return res.status(200).send({ data: { ...req.body } });
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }

  // Wrong method? Bad API?
  return res.status(405);
};

export default weights;
