import { prisma } from "../server/db/client";

const getWeights = async () => {
  return prisma.weights.findMany();
};

export default getWeights;
