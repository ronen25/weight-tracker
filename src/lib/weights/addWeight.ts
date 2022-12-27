import type { WeightType } from "../../models/WeightData";
import { prisma } from "../../server/db/client";

const addWeight = async (value: WeightType) => {
  // TODO: generate id?
  return prisma.weights.create({
    data: {
      ...value,
    },
  });
};

export default addWeight;
