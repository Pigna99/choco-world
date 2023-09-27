type State = 'sleep'|'walk'|'idle'

interface Stat{
    max:number;
    actual:number;
}

interface Creature {
    name: string;
    id: number;
    state: State;
    last_update: Date;
    statictics: {
        level: number;
        stamina: Stat;
        //happiness: Stat;
        //hunger: Stat;
        experience: Stat;
    }
}

/**
 * Add more info like number of naps, pets, time feed etc
 */


export type {Creature}