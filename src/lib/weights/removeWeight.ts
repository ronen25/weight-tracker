import { prisma } from '../../server/db/client';

const removeWeight = (id: number) => {
  return prisma?.weights.delete({
    where: {
      id: id,
    },
  });
};

export default removeWeight;
