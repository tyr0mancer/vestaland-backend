import {prop, mongoose, Ref} from '@typegoose/typegoose';
import {Zutat} from "./Zutat";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Aktion} from "./Aktion";

class Arbeitsschritt {

    @prop({ required: true })
    public reihenfolge!: number;

    @prop({type: Aktion, _id: false})
    public aktion?: Aktion;

    @prop({type: Zutat, _id: false})
    public zutaten: Zutat[] = [];

    @prop({ref: "Hilfsmittel", type: mongoose.Schema.Types.ObjectId})
    public hilfsmittel: Ref<Hilfsmittel>[]= [];

    @prop()
    public dauer?: number;

}

export {Arbeitsschritt}

