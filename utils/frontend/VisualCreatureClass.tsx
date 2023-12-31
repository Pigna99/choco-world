import { Creature } from "../interfaces";

export class VisualCreatureClass{

    static generatePlaceholder():Creature{
        const right_now = new Date;
        const baseCreature:Creature= {
            name: 'placeholder',
            state: 'walking',
            color: "#ffffff",
            gender: "male",
            last_update: right_now,
            last_time_pet: right_now,
            last_time_pet_real: right_now,
            last_happiness_update: right_now,
            last_time_feed: right_now,
            statictics: {
                level: 1,
                stamina: {
                    actual: 0,
                    max: 0,
                },
                happiness: {
                    actual: 0,
                    max: 0,
                },
                hunger: {
                    actual: 0,
                    max: 0,
                },
                experience: {
                    actual: 0,
                    max: 0,
                },
                hp: {
                    actual: 0,
                    max: 0,
                }
            },
            informations: {
                steps: 0,
                pets: 0,
                feeds: 0,
                birthday: right_now,
                enemies: 0
            },
            combat: {
                enemyhp: {
                    actual: 0,
                    max: 0,
                },
                enemy_type: "none",
                enemy_color: "",
                experience: 0,
                damage: 0
            },
            social: {
                friends: []
            }
        }
        return baseCreature;
    }
}