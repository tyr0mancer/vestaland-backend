import {z} from "zod";

export const UtensilSchema = z.object({
  utensilName: z.string({required_error: "Das Utensil muss einen Namen enthalten"}),
  beschreibung: z.string().optional().describe('Optionaler Beschreibungstext'),
  volumen: z.number().optional().describe('Das Fassungsvermögen in ml'),
})
export type UtensilType = z.infer<typeof UtensilSchema>;

export const UtensilSucheSchema = z.object({
  utensilName: z.union([z.string().min(2), z.instanceof(RegExp)]).optional()
});
