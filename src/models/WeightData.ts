import { z } from 'zod';

const Weight = z.object({
  id: z.number(),
  date: z.date(),
  value: z.number(),
  note: z.string(),
});

const WeightId = z.coerce.number();

type WeightType = z.infer<typeof Weight>;

const WeightsData = z.array(Weight);

export { Weight, WeightId, type WeightType, WeightsData };
