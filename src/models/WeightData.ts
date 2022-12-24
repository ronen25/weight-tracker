import { z } from "zod";

const Weight = z.object({
  date: z.date(),
  id: z.number().gte(1),
  value: z.number(),
  note: z.string(),
});

type WeightType = z.infer<typeof Weight>;

const WeightsData = z.array(Weight);

export { Weight, type WeightType, WeightsData };
