import { z } from "zod";

const Weight = z.object({
  date: z.date(),
  value: z.number(),
  note: z.string(),
});

const WeightMeasurementDate = z.string().datetime();

type WeightType = z.infer<typeof Weight>;

const WeightsData = z.array(Weight);

export { Weight, WeightMeasurementDate, type WeightType, WeightsData };
