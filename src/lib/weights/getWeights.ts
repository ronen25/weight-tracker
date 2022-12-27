import { WeightsData } from "../../models/WeightData";
import { prisma } from "../../server/db/client";

const getWeights = async (userId: string) => {
  const data = await prisma.weights.findMany({
    where: {
      user_id: userId,
    },
  });

  return WeightsData.parseAsync(
    data.map((item) => ({ ...item, value: item.value?.toNumber() }))
  );
};

export default getWeights;
