import { Creature } from "./interfaces";

class CreatureClass {
    private info: Creature;
    constructor(creature: Creature){
        this.info = creature;
    }
    static newCreature(name:string): CreatureClass{
        let baseCreature:Creature= {
            id:1,
            name:name,
            state:'idle',
            last_update: new Date(),
            statictics:{
                level: 1,
                stamina: {
                    actual:5,
                    max:5,
                },
                //happiness: undefined,
                //hunger: undefined,
                experience: {
                    actual:0,
                    max:10,
                }
            }
        }

        return new CreatureClass(baseCreature);
    }

    levelUp(){
        console.log('level up!')
    }

    feed(){

    }

    pet(){

    }

    getUpdateTime(){
        return this.info.last_update;
    }
    setUpdateTime(d:Date){
        this.info.last_update=d;
    }

    getInfo(){
        return this.info;
    }
}

export {CreatureClass}