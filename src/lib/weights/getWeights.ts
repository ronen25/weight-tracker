import { WeightsData } from "../../models/WeightData";
import { prisma } from "../../server/db/client";

const getWeights = async () => {
  const data = await prisma.weights.findMany();

  return WeightsData.parseAsync(
    data.map((item) => ({ ...item, value: item.value?.toNumber() }))
  );
};

export default getWeights;
