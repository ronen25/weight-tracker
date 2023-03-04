import type { WeightDataType } from '../../models/WeightData';
import { prisma } from '../../server/db/client';

const addWeight = async (value: WeightDataType, userId: string) => {
  return prisma.weights.create({
    data: {
      ...value,
      user_id: userId,
    },
  });
};

export default addWeight;
