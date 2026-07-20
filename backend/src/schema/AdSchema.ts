import { z } from "zod";

export const createAdSchema = z.object({

    title: z.string(),

    description: z.string(),

    category: z.string(),

    price: z.number().optional(),

    imageUrl: z.string().optional(),

    isDonation: z.boolean().optional()

});