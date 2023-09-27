import { Creature , Stat, State, happiness_modifier} from "./interfaces";
import { TICK_DAY, TICK_VALUE } from './settings';

class CreatureClass {
    private info: Creature;
    constructor(creature: Creature){
        this.info = creature;
    }
    static newCreature(name:string): CreatureClass{
        let right_now = new Date;
        let baseCreature:Creature= {
            name:name,
            state:'walking',
            last_update: right_now,
            last_time_pet: right_now,
            last_happiness_update: right_now,
            statictics:{
                level: 1,
                stamina: {
                    actual:10,
                    max:10,
                },
                happiness: {
                    actual:5,
                    max:10,
                },
                hunger: {
                    actual:5,
                    max:10,
                },
                experience: {
                    actual:0,
                    max:20,
                }
            }
        }

        return new CreatureClass(baseCreature);
    }

    simulate(){
        //calculate the number of ticks, 1 tick= 5min! (TICK_VALUE)
        const last_update = new Date(this.getUpdateTime());
        const new_ticks_float= ((new Date()).getTime()-last_update.getTime()) / (60000*TICK_VALUE);
        const new_ticks = Math.floor(new_ticks_float);
        const new_update = new Date(last_update.getTime() + new_ticks*60000*TICK_VALUE);//updated timer
    
        for(let i_ticks = new_ticks; i_ticks>0; --i_ticks){//foreach tick simulate!
            this.nextTick();
        }
        this.setUpdateTime(new_update); //update timer to the next tick
        console.log('new ticks(float): ' + new_ticks_float);
        //console.log(this.info)
    }

    private getTicksFromDate(d:Date){//number of ticks from that Date to now
        const new_ticks_float= ((new Date()).getTime()-d.getTime()) / (60000*TICK_VALUE);
        const new_ticks = Math.floor(new_ticks_float);
        return new_ticks;
    }
    private addTicksToDate(d:Date, t:number):Date{
        return new Date(d.getTime() + t*60000*TICK_VALUE)
    }

    private nextTick(){//what happens after one tick
        //check status first
        if (this.info.state === 'walking'){
            //hunger check
            if(!checkMinStat(this.info.statictics.hunger) && tryRandom(30)){
                this.info.statictics.hunger.actual--;
            }else{
                this.info.statictics.stamina.actual--;
            }
            

            this.info.statictics.experience.actual+= 1 * happiness_modifier[this.info.statictics.happiness.actual];//change exp gain from happiness and hunger, and add stats!
            if(checkMinStat(this.info.statictics.stamina)){
                this.changeState('sleeping');
            }
            if(checkMaxStat(this.info.statictics.experience)){
                this.levelUp();
            }
        }

        if (this.info.state === 'sleeping'){
            if(!checkMinStat(this.info.statictics.hunger) && tryRandom(30)){
                this.info.statictics.hunger.actual--;
                this.info.statictics.stamina.actual+=Math.ceil(this.info.statictics.stamina.max/10);
            }
            this.info.statictics.stamina.actual+=Math.ceil(this.info.statictics.stamina.max/10);

            if(this.info.statictics.stamina.actual>this.info.statictics.stamina.max) this.info.statictics.stamina.actual=this.info.statictics.stamina.max;
            if(checkMaxStat(this.info.statictics.stamina)){
                this.changeState('walking');
            }
        }

        this.checkHappiness();
        
    }
    private levelUp(){
        console.log('level up!');
        this.info.statictics.level++;
        this.info.statictics.experience.actual=0;
        this.info.statictics.experience.max+= Math.floor(this.info.statictics.experience.max/2);//max_exp
        this.info.statictics.stamina.max+= Math.floor(this.info.statictics.stamina.max/10);//stamina
        //update other stats
        this.info.statictics.hunger.max+= Math.floor(this.info.statictics.hunger.max/5);//hunger
    }

    private checkHappiness(){
        /*
            1)check that 24h has passed (288 ticks) from last happiness update
            2)if is passed, update happiness
        */
        let ticks = this.getTicksFromDate(this.info.last_happiness_update)
        if(ticks<TICK_DAY) return;
        if(!checkMinStat(this.info.statictics.happiness)){
            this.info.statictics.happiness.actual--;
        }
        this.info.last_happiness_update = this.addTicksToDate(this.info.last_happiness_update, TICK_DAY);//add 1 day of ticks
    }

    feed(){
        this.info.statictics.hunger.actual = this.info.statictics.hunger.max;
        //if stamina is >30% and was sleeping, start walking
    }

    pet(){
        /*
            1)check that 12h has passed (144 ticks) from last pet
            2)if is passed, update happiness
        */

        //if stamina is >30% and was sleeping, start walking
    }

    getUpdateTime(){
        return this.info.last_update;
    }
    private setUpdateTime(d:Date){
        this.info.last_update=d;
    }
    getName(){
        return this.info.name;
    }

    getInfo(){
        return this.info;
    }

    private changeState(s: State){
        this.info.state = s;
    }
}


function checkMaxStat (s: Stat):boolean{
    return s.actual === s.max
}

function checkMinStat (s: Stat):boolean{
    return s.actual === 0
}

function tryRandom(n:number): boolean{
    return Math.floor(Math.random() * 100)<n;//random number from 1 to 100
}

export {CreatureClass}