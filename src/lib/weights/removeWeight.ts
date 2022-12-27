import { prisma } from "../../server/db/client";

const removeWeight = (date: Date) => {
  return prisma?.weights.delete({
    where: {
      date: date,
    },
  });
};

export default removeWeight;
