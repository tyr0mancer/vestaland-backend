import {z} from "zod";

export const VorratSchema = z.object({});

export type VorratType = z.infer<typeof VorratSchema>;
