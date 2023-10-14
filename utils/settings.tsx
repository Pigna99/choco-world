
const TICK_VALUE = 5;
const TICK_DAY = (60/TICK_VALUE)*24;
const BASE_EXPERIENCE = 1; //base experience taken after every step

//add factor to max values when levelup
const EXPERIENCE_SCALING= 0.5;
const STAMINA_SCALING= 0.1;
const HUNGER_SCALING= 0.2;

const LEVEL1_EXPERIENCE=20;
const LEVEL1_STAMINA=10;
const LEVEL1_HUNGER=10;

const HAPPINESS_MODIFIER= [0,1,1,1,2,2,2,3,3,3,4];
const HAPPINESS_NAMES=['depressed','sad','sad','sad','normal','normal','normal','happy','happy','happy','delighted']
const LEVEL1_HAPPINESS= 5; //normal

const DEBUG = true;
/**
 * Happiness values:
 * 
 *   level|scaling
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


export {DEBUG, TICK_VALUE, TICK_DAY, BASE_EXPERIENCE, EXPERIENCE_SCALING, STAMINA_SCALING, HUNGER_SCALING, HAPPINESS_MODIFIER, LEVEL1_EXPERIENCE, LEVEL1_HUNGER, LEVEL1_STAMINA, LEVEL1_HAPPINESS, HAPPINESS_NAMES}
