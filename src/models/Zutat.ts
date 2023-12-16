import {mongoose, prop, Ref} from '@typegoose/typegoose';
import {Lebensmittel} from "./lebensmittel.model";

class Zutat {

    @prop({autopopulate: true, ref: "Lebensmittel", type: mongoose.Schema.Types.ObjectId})
    public lebensmittel?: Ref<Lebensmittel>;

    @prop()
    public freitext?: string;

    @prop()
    public einheit: string= "St";

    @prop()
    public menge: number=1;
}


export {Zutat}
