import mongoose from "mongoose"

import { Creature, socialInteraction } from "../interfaces"

const creatureScheme = new mongoose.Schema<Creature>(
    {
        name: String,
        state: String,
        color: String,
        gender: String,
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
            hp: {
                max: Number,
                actual: Number,
            },
        },
        informations: {
            steps: Number,//equal to total experience!
            pets: Number,
            feeds: Number,
            birthday: Date,
            enemies: Number,
        },
        combat: {
            enemyhp:{
                max: Number,
                actual: Number,
            },
            enemy_type:String,
            enemy_color:String,
            damage:Number,
            experience:Number,
        },
        social: {
            friends:Array<socialInteraction>,
        }
    }
)

export default mongoose.models.creatureList || mongoose.model<Creature>("creatureList", creatureScheme);