import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";

@modelOptions({schemaOptions: {collection: "hilfsmittel"}})
class Hilfsmittel {

    @prop({ required: true })
    public name: string = "";

    @prop()
    public beschreibung?: string;

}


const HilfsmittelModel = getModelForClass(Hilfsmittel);

export {Hilfsmittel, HilfsmittelModel}

export const hilfsmittelSchema = z.object({
    name: z.string({required_error: "Das Hilfsmittel muss einen Namen enthalten"}),
});
