// import npc from './npc';
import { _decorator, Component, Node, CCObject, find,systemEvent,SystemEvent, VerticalTextAlignment, Vec3, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;


 
@ccclass('Player')
export class Player extends Component {
    @property({type:Node}) nonPlayerCharacters:Node[] =[];
    @property({type:Node}) hints:Node[] =[];

    @property({type:Node}) NPCNode:Node = null;
    @property({type:Node}) hintNode:Node = null;
    @property({type: Number}) minDistance = 10;
    @property({type:Node}) interactionUI: Node = null;
    @property({type:Node}) interactPrompt: Node = null;


    start () {
     this.NPCNode.children.forEach(element => {
         this.nonPlayerCharacters.push(element);
     });
 

    }

    onLoad(){
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event:EventKeyboard){
        let _distance = Vec3.distance(this.node.parent.position,this.nonPlayerCharacters[0].position);
        
        // console.log("dist: "+_distance);
        
        switch(event.keyCode){

        case KeyCode.KEY_E:
            if(_distance<this.minDistance){
                this.interact();
                this.interactPrompt.active = true;
            }
            else{
                this.interactPrompt.active = false;
            }
            break;
    }
    }
    interact(){
        this.interactionUI.active = true;
    }
}


