type State = 'sleeping'|'walking'
type VisualState = State | 'idle'|'eating'|'happy'|'idle-feed'|'idle-pet' |'egg' |'hatching'|'loading'|'eggshake'

type Gender = 'male' |'female'
interface Stat{
    max:number;
    actual:number;
}

interface Creature {
    name: string;
    color: string;
    gender: Gender;
    state: State;
    last_update: Date;
    last_time_pet: Date;//per per tick
    last_time_pet_real: Date;//real pet that can modify happiness
    last_happiness_update: Date;
    last_time_feed: Date;
    statictics: {
        level: number;
        stamina: Stat;
        happiness: Stat;
        hunger: Stat;
        experience: Stat;
    },
    /**
    * Add more info like number of naps, pets, time feed etc
    */
    informations: {
        steps: number;//equal to total experience!
        pets: number;
        feeds: number;
        birthday: Date;
    }
}

type savedChoco = {name:string, color:string, gender:Gender, id:string}

function percentageStat (s: Stat, percentage :number): boolean {//if actual value > percentage of max, true
    let value = s.max * percentage / 100;
    return s.actual > value;
}

function checkMaxStat (s: Stat):boolean{
    return s.actual >= s.max
}

function checkMinStat (s: Stat):boolean{
    return s.actual <= 0
}

function tryRandom(n:number): boolean{
    return Math.floor(Math.random() * 100)<n;//random number from 1 to 100
}




export type {Creature, Stat, State, VisualState, Gender, savedChoco}
export{ checkMaxStat, checkMinStat, tryRandom, percentageStat}