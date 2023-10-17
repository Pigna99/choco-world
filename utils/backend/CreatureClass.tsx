import { Creature , Gender, Stat, State, checkMaxStat, checkMinStat, combatEntity, percentageStat, savedChoco, tryRandom} from "../interfaces";
import { BASE_EXPERIENCE, EXPERIENCE_SCALING, HUNGER_SCALING, STAMINA_SCALING, TICK_DAY, TICK_VALUE, HAPPINESS_MODIFIER, LEVEL1_STAMINA, LEVEL1_HUNGER, LEVEL1_EXPERIENCE, LEVEL1_HAPPINESS, LEVEL1_HP, HP_SCALING, ENCOUNTER_RATE } from '../settings';
import EnemyClass from "./EnemyClass";

class CreatureClass {
    private info: Creature;
    constructor(creature: Creature){
        this.info = creature;
    }
    static newCreature(name:string, color:string, gender:Gender): CreatureClass{//new creature generator
        let right_now = new Date;
        let baseCreature:Creature= {
            name: name,
            state: 'walking',
            color: color,
            gender: gender,
            last_update: right_now,
            last_time_pet: right_now,
            last_time_pet_real: right_now,
            last_happiness_update: right_now,
            last_time_feed: right_now,
            statictics: {
                level: 1,
                hp: {
                    actual: LEVEL1_HP,
                    max: LEVEL1_HP,
                },
                stamina: {
                    actual: LEVEL1_STAMINA,
                    max: LEVEL1_STAMINA,
                },
                happiness: {
                    actual: LEVEL1_HAPPINESS,
                    max: 10,
                },
                hunger: {
                    actual: Math.floor(LEVEL1_HUNGER / 2),
                    max: LEVEL1_HUNGER,
                },
                experience: {
                    actual: 0,
                    max: LEVEL1_EXPERIENCE,
                }
            },
            informations: {
                steps: 0,
                pets: 0,
                feeds: 0,
                enemies: 0,
                birthday: right_now
            },
            combat: {
                enemyhp: {
                    actual: 0,
                    max: 0,
                },
                enemy_type: "none",
                enemy_color: "#000000",
                damage:0,
                experience:0,
            },
            social: {
                friends: []
            }
        }

        return new CreatureClass(baseCreature);
    }
    getSavedCreature(id:string):savedChoco{
        return {
            name: this.info.name,
            color: this.info.color,
            gender: this.info.gender,
            id: id
          }
    }
    update(){//insert missing proprieties, if the choco is at a previus version!
        if(!this.info.statictics.hp.actual){
            console.log('updating hp')
            this.info.statictics.hp={
                actual: LEVEL1_HP+HP_SCALING*(this.info.statictics.level-1),
                max: LEVEL1_HP+HP_SCALING*(this.info.statictics.level-1),
            }
            this.info.informations.enemies=0;
            this.info.combat= {
                enemyhp: {
                    actual: 0,
                    max: 0,
                },
                enemy_type: "none",
                enemy_color: "#000000",
                damage:0,
                experience:0,
            }
        }
    }

    simulate(){
        //calculate the number of ticks, 1 tick= 5min! (TICK_VALUE)
        const last_update = new Date(this.getUpdateTime());
        const new_ticks_float= ((new Date()).getTime()-last_update.getTime()) / (60000*TICK_VALUE);
        const new_ticks = Math.floor(new_ticks_float);
        //console.log('new ticks(float): ' + new_ticks_float);
        if(new_ticks<1)return;
        const new_update = new Date(last_update.getTime() + new_ticks*60000*TICK_VALUE);//updated timer
        console.log(`[${this.info.name}]: simulating ${new_ticks} tick(s)`);
        for(let i_ticks = new_ticks; i_ticks>0; --i_ticks){//foreach tick simulate!
            this.nextTick();
        }
        this.setUpdateTime(new_update); //update timer to the next tick
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
            //experience based on happiness
            const exp = BASE_EXPERIENCE * HAPPINESS_MODIFIER[this.info.statictics.happiness.actual];
            this.info.statictics.experience.actual+= exp;
            this.info.informations.steps+= exp;
            //set next state
            //happiness check
            this.checkHappiness();
            if(checkMaxStat(this.info.statictics.experience)){
                this.levelUp();
            }
            if(checkMinStat(this.info.statictics.stamina) || checkMinStat(this.info.statictics.hp)){
                this.changeState('sleeping');
                return;
            }
            //start fight prompt
            if(this.info.statictics.level>=10 && tryRandom(ENCOUNTER_RATE)){
                this.changeState('fighting')
            }
            //start fight prompt
            return;
        }

        if (this.info.state === 'sleeping'){
            //hunger check
            if(!checkMinStat(this.info.statictics.hunger) && tryRandom(30)){
                this.info.statictics.hunger.actual--;
                this.info.statictics.stamina.actual+=Math.ceil(this.info.statictics.stamina.max/10);
            }
            if(!checkMinStat(this.info.statictics.hunger) && tryRandom(30)){
                this.info.statictics.hunger.actual--;
                this.info.statictics.hp.actual+=Math.ceil(this.info.statictics.hp.max/8);
            }
            this.info.statictics.stamina.actual+=Math.ceil(this.info.statictics.stamina.max/10);
            this.info.statictics.hp.actual+=Math.ceil(this.info.statictics.hp.max/16);

            if(this.info.statictics.stamina.actual>this.info.statictics.stamina.max) this.info.statictics.stamina.actual=this.info.statictics.stamina.max;
            if(this.info.statictics.hp.actual>this.info.statictics.hp.max) this.info.statictics.hp.actual=this.info.statictics.hp.max;
            //set next state
            if(checkMaxStat(this.info.statictics.stamina) && checkMaxStat(this.info.statictics.hp)){
                this.changeState('walking');
            }
            //happiness check
            this.checkHappiness();
            return;
        }

        if(this.info.state === 'fighting'){
            this.info.statictics.stamina.actual--;//lose 1 stamina to fight, check before starting
            //check if you need to start the fight
            let enemy:combatEntity = this.info.combat.enemyhp.actual<=0 ? EnemyClass.generateEnemy(this.info.statictics.level) : this.info.combat
            //actual combat logic
            const damage = EnemyClass.getDamage(enemy.damage);
            this.info.statictics.hp.actual = ((this.info.statictics.hp.actual - damage) <= 0) ? 0 : (this.info.statictics.hp.actual - damage)//choco receive damage
            enemy.enemyhp.actual -= this.dealDamage()//enemy receive damage

            if(enemy.enemyhp.actual<=0){//win
                this.info.statictics.experience.actual+= enemy.experience;
                this.info.informations.enemies++;
                if(checkMaxStat(this.info.statictics.experience)){
                    this.levelUp();
                }
            }
            this.info.combat = enemy;
            //change status
            if(checkMinStat(this.info.statictics.hp) || checkMinStat(this.info.statictics.stamina)){
                this.changeState('sleeping');
                enemy.enemyhp.actual=0;//reset enemy hp
                return;
            }
            if(checkMinStat(enemy.enemyhp)){
                this.changeState('walking');
            }
        }
    }
    private levelUp(){
        this.info.statictics.level++;
        this.info.statictics.experience.actual-= this.info.statictics.experience.max;//remove exp for the level
        this.info.statictics.experience.max= Math.round((Math.pow(this.info.statictics.level+6, EXPERIENCE_SCALING)/2)+LEVEL1_EXPERIENCE);//max_exp
        this.info.statictics.stamina.max=Math.round((Math.pow(this.info.statictics.level+1, STAMINA_SCALING)/2)+LEVEL1_STAMINA);
        this.info.statictics.hunger.max=Math.round((Math.pow(this.info.statictics.level+1, HUNGER_SCALING)/2)+LEVEL1_HUNGER);
        this.info.statictics.hp.max+=HP_SCALING//hp
        console.log(`[${this.info.name}]: Level up! ${this.info.name} reached level ${this.info.statictics.level}!`);
    }

    private dealDamage(){
        let hunger_bonus = Math.round(this.info.statictics.hunger.max/4)
        if(hunger_bonus>this.info.statictics.hunger.actual)hunger_bonus = this.info.statictics.hunger.actual
        this.info.statictics.hunger.actual-= hunger_bonus;
        const damage_linear= (this.info.statictics.stamina.max * HAPPINESS_MODIFIER[this.info.statictics.happiness.actual]) + hunger_bonus
        return(Math.round(damage_linear+ ((damage_linear*(Math.random()*0.5))-(damage_linear*0.25))))
    }

    private checkHappiness(){
        /*
            1)check that 24h has passed (288 ticks) from last happiness update
            2)if is passed, happiness--
            3)add 24h to last_happiness_update (for simulation)
        */
        const last_happiness_update = new Date(this.info.last_happiness_update)

        const ticks = this.getTicksFromDate(last_happiness_update)
        if(ticks<TICK_DAY) return;
        if(!checkMinStat(this.info.statictics.happiness)){
            this.info.statictics.happiness.actual--;
        }
        this.info.last_happiness_update = this.addTicksToDate(last_happiness_update, TICK_DAY);//add 1 day of ticks
    }

    feed():boolean{
        if(this.info.state==='fighting')return false
        this.tryWakeUp()
        if(this.info.statictics.hunger.actual===this.info.statictics.hunger.max) return false;//check if hunger bar is not full
        console.log(`[${this.info.name}]: eating!`);
        this.info.statictics.hunger.actual = this.info.statictics.hunger.max;
        this.info.last_time_feed = new Date();
        this.info.informations.feeds++;
        return true;
    }

    pet():boolean{
        if(this.info.state==='fighting')return false
        /*
            1)check that 12h has passed (144 ticks) from last pet
            2)if is passed, happiness++
            3)update last time pet and last happiness update time to now
        */
        this.tryWakeUp()

        //can pet only if 1 tick passed
        const last_time_pet = new Date(this.info.last_time_pet)
        const ticks = this.getTicksFromDate(last_time_pet)
        if(ticks<1) return false;//at least 1 tick for petting again
        console.log(`[${this.info.name}]: petted!`);
        this.info.last_time_pet = new Date();
        this.info.informations.pets++;
        this.info.statictics.hp.actual= (this.info.statictics.hp.actual+10<=this.info.statictics.hp.max)? (this.info.statictics.hp.actual+10):this.info.statictics.hp.max;//restore 10 hp when petted
        
        //if 1 tick passed, check if the pet is done after 12h after the last effettive pet, and can update happiness
        const last_time_pet_real = new Date(this.info.last_time_pet_real)
        const ticks_real = this.getTicksFromDate(last_time_pet_real)
        if(ticks_real<(TICK_DAY/2)) return true;//if not, return true (pet with no effect)
        if(!checkMaxStat(this.info.statictics.happiness)){
            this.info.statictics.happiness.actual++;
        }
        this.info.last_time_pet_real = new Date();
        this.info.last_happiness_update = new Date();
        return true;
    }

    private tryWakeUp(){
        if(this.info.state!='sleeping')return;
        if(!percentageStat(this.info.statictics.stamina, 30))return;
        if(!percentageStat(this.info.statictics.hp, 50))return;
        this.changeState('walking');
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

export {CreatureClass}