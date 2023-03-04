import { z } from 'zod';

const WeightData = z.object({
  date: z.date(),
  value: z.number(),
  note: z.string(),
});

const Weight = WeightData.extend({
  id: z.number(),
});

type WeightDataType = z.infer<typeof WeightData>;
type WeightType = z.infer<typeof Weight>;

const WeightsData = z.array(Weight);

export {
  WeightData,
  Weight,
  type WeightDataType,
  type WeightType,
  WeightsData,
};
