import { z } from 'zod';

const DeleteRequestData = z.object({
  id: z.coerce.number(),
});

export { DeleteRequestData };
