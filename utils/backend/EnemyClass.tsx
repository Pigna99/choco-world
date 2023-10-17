import { combatEntity, enemies } from "../interfaces";

class EnemyClass {
    static getDamage(d:number):number{//calculate actual damage received from choco
        return Math.round(d+ ((d*(Math.random()*0.5))-(d*0.25)))
    };

    static generateEnemy(level:number):combatEntity{
        const enemy_type:enemies= this.getEnemyType(level);
        let enemy:combatEntity;
        switch (enemy_type) {
            case 'normal':
                enemy={
                    enemyhp:{
                        max: 100,
                        actual: 100
                    },
                    enemy_type:enemy_type,
                    enemy_color:'#ffffff',
                    damage:100,
                    experience:100,
                }
                break;
            case 'rare':
                enemy={
                    enemyhp:{
                        max: 300,
                        actual: 300
                    },
                    enemy_type:enemy_type,
                    enemy_color:'#0400f5',
                    damage:150,
                    experience:500,
                }
                break;
            case 'epic':
                enemy={
                    enemyhp:{
                        max: 600,
                        actual: 600
                    },
                    enemy_type:enemy_type,
                    enemy_color:'#f500ed',
                    damage:250,
                    experience:1500,
                }
                break;
            case 'legendary':
                enemy={
                    enemyhp:{
                        max: 1500,
                        actual: 1500
                    },
                    enemy_type:enemy_type,
                    enemy_color:'#f5c800',
                    damage:400,
                    experience:5000,
                }
                break;
            default:
                enemy={//error enemy
                    enemyhp:{
                        max: 999999,
                        actual: 1
                    },
                    enemy_type:enemy_type,
                    enemy_color:'#c70000',
                    damage:0,
                    experience:1,
                }
                break;
        }
        return enemy;
    }

    private static getEnemyType(level:number):enemies{
        if(level<10)return 'normal'
        if(10<=level && level<20) return this.enemyPercentage(65,25,9,1);
        if(20<=level && level<30) return this.enemyPercentage(40,30,20,10);
        if(30<=level && level<40) return this.enemyPercentage(20,30,30,20);
        if(40<=level && level<50) return this.enemyPercentage(5,20,50,25);
        if(level>=50)return this.enemyPercentage(0,0,10,90);
        return 'legendary'
    }

    private static enemyPercentage(normal:number, rare:number, epic:number, legendary:number):enemies{
        if (normal+rare+epic+legendary!== 100){
            console.log('ERROR! not 100%')
            return 'legendary'
        }
        let number = Math.round(Math.random()*100);
        if(0<=number && number<normal)return 'normal'
        if(normal<=number && number<rare)return 'rare'
        if(rare<=number && number<epic)return 'epic'
        if(epic<=number && number<legendary)return 'legendary'
        return 'legendary'
    }
}

export default EnemyClass