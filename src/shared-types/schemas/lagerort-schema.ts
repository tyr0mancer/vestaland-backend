import {z} from "zod";

export const LagerortSchema = z.object({});

export type LagerortType = z.infer<typeof LagerortSchema>;
