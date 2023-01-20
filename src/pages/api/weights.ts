import { Prisma } from '@prisma/client';
import { type NextApiRequest, type NextApiResponse } from 'next';
import addWeight from '../../lib/weights/addWeight';
import getWeights from '../../lib/weights/getWeights';
import removeWeight from '../../lib/weights/removeWeight';
import { DeleteRequestData } from '../../models/RequestData';
import { Weight } from '../../models/WeightData';

import { getServerAuthSession } from '../../server/common/get-server-auth-session';

const weights = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).send({
      error: 'You must be signed in to use this API',
    });
  }

  try {
    if (req.method === 'GET') {
      const weights = await getWeights(session.user?.id ?? '');
      return res.status(200).send(weights);
    } else if (req.method === 'POST') {
      if ('date' in req.body) {
        req.body['date'] = new Date(req.body['date']);
      }

      const weightData = Weight.parse(req.body);
      await addWeight(weightData, session.user?.id ?? '');

      return res.status(200).send({ data: { ...req.body } });
    } else if (req.method === 'DELETE') {
      console.log('--> ', req.body);
      const { id } = DeleteRequestData.parse(req.body);
      const measurementDateRemoved = await removeWeight(id);

      return res.status(200).send({ data: measurementDateRemoved });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).send({ error: error });
    }

    return res.status(400).send({ error: error });
  }

  return res.status(405);
};

export default weights;
