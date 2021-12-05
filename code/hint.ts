
import { _decorator, Component, Node, find, CCObject,math, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Hint
 * DateTime = Sun Dec 05 2021 21:56:01 GMT+0530 (India Standard Time)
 * Author = aman099
 * FileBasename = hint.ts
 * FileBasenameNoExtension = hint
 * URL = db://assets/scripts/hint.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Hint')
export class Hint extends Component {
    player:Node = null;
    
    onLoad(){
        
            tween(this.node)
            .by(0.5,{eulerAngles: new Vec3(45,0,0)}).repeatForever().start();
        }

    showhint(){
        
    }
    

}


