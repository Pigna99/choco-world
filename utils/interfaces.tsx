type State = 'sleeping'|'walking'
type VisualState = 'sleeping'|'walking'|'idle'|'eating'|'happy'
type HappinessStatus = 'depressed'|'sad'|'normal'|'happy'|'delighted' 

const happiness_modifier= [0,1,1,1,2,2,2,3,3,3,4];
/**
 * Happiness values:
 * 
 *   0|depressed (x0)
 *   1--|
 *   2--| sad (x1)
 *   3--|
 *   4----|
 *   5----| normal (x2)
 *   6----|
 *   7------|
 *   8------| happy (x3)
 *   9------|
 *  10--------| delighted (x4)
 * 
 */

interface Stat{
    max:number;
    actual:number;
}

interface Creature {
    name: string;
    state: State;
    last_update: Date;
    last_time_pet: Date;//you can pet every time, but can modify the happiness stat only every 12 hours!
    last_happiness_update: Date;
    statictics: {
        level: number;
        stamina: Stat;
        happiness: Stat;
        hunger: Stat;
        experience: Stat;
    }
}

/**
 * Add more info like number of naps, pets, time feed etc
 */


export type {Creature, Stat, State}
export{happiness_modifier}