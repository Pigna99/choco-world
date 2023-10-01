import mongoose from "mongoose"

import { Creature } from "./interfaces"

const creatureScheme = new mongoose.Schema<Creature>(
    {
        name: String,
        state: String,
        last_update: Date,
        last_time_pet: Date,
        last_time_pet_real: Date,
        last_happiness_update: Date,
        last_time_feed: Date,
        statictics: {
            level: Number,
            stamina: {
                max: Number,
                actual: Number,
            },
            happiness: {
                max: Number,
                actual: Number,
            },
            hunger: {
                max: Number,
                actual: Number,
            },
            experience: {
                max: Number,
                actual: Number,
            },
        },
        /**
        * Add more info like number of naps, pets, time feed etc
        */
        informations: {
            steps: Number,//equal to total experience!
            pets: Number,
            feeds: Number,
            birthday: Date,
        }
    }
)

export default mongoose.models.creatureList || mongoose.model<Creature>("creatureList", creatureScheme);