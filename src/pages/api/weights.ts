import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import addWeight from "../../lib/weights/addWeight";
import getWeights from "../../lib/weights/getWeights";
import removeWeight from "../../lib/weights/removeWeight";
import { Weight, WeightMeasurementDate } from "../../models/WeightData";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const weights = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  try {
    if (req.method === "GET") {
      const weights = await getWeights(session.user?.id ?? "");
      return res.status(200).send(weights);
    } else if (req.method === "POST") {
      // Convert the date to a string
      if ("date" in req.body) {
        req.body["date"] = new Date(req.body["date"]);
      }

      const weightData = Weight.parse(req.body);
      await addWeight(weightData, session.user?.id ?? "");

      return res.status(200).send({ data: { ...req.body } });
    } else if (req.method === "DELETE") {
      const measurementDate = WeightMeasurementDate.parse(req.body);
      const dateValue = new Date(measurementDate);
      await removeWeight(dateValue);

      return res.status(200).send({ data: measurementDate });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).send({ error: error });
    }

    console.log(error);
    return res.status(400).send({ error: error });
  }

  // Wrong method? Bad API?
  return res.status(405);
};

export default weights;
