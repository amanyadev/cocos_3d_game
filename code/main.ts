import { _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, KeyCode, isPropertyModifier, v3, CCObject, Vec3, tween, math, director, game, Label } from 'cc';
const { ccclass,property } = _decorator;

@ccclass("Main")
export class Main extends Component {

    @property({type:Node}) camera:Node = null;
    @property({type:Label}) scoreLabel = null; 
    moveDirection:Vec3 = new Vec3(0,0,0);
    cameraTargetPos:Vec3 = new Vec3();
    cameraTargetRot:Vec3 = new Vec3();
    smoothing:number = 0.4;
    rotationSmoothing:number = 1;

    gameScore:number = 0;

    @property({type:Node}) Questions: Node[] = [];
    currentQuestion:number = 0;
    
    @property({type:Node})final:Node = null;
    onLoad () {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        systemEvent.on(SystemEvent.EventType.MOUSE_MOVE,this.setCameraAngle,this);
    }
    onEnable(){

    }


    onDestroy () {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (event: EventKeyboard) {
        this.moveDirection.x = this.moveDirection.z = 0;
        // console.log("for+"+Vec3.FORWARD);
        
        switch(event.keyCode) {
            case KeyCode.KEY_W:
                console.log('Press a key');
                this.moveDirection = this.camera.forward;
                break;
            case KeyCode.KEY_S:
                this.moveDirection = this.camera.forward.negative();
                break;
            case KeyCode.KEY_A:
                tween(this.camera)
                .by(0.4,{eulerAngles: new Vec3(0,60,0)}).start();
                break;
            case KeyCode.KEY_D:
                tween(this.camera)
                .by(0.4,{eulerAngles: new Vec3(0,-60,0)}).start();
                break;
            case KeyCode.ESCAPE:
                this.reset();
                break;
            case KeyCode.KEY_R:
                director.loadScene("scene");
                break;
                

        }
        this.moveCamera(this.moveDirection);

    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                console.log('Release a key');
                break;
        }
    }

    //move camera by dir
    moveCamera(direction){
        // console.log(direction);
        this.cameraTargetPos = this.camera.getPosition();
 
        //  Vec3.add(this.cameraTargetPos,Vec3.normalize(this.camera.eulerAngles,direction),direction);
         Vec3.add(this.cameraTargetPos,this.cameraTargetPos,direction);
         
         tween(this.camera).to(0.1,{position:this.cameraTargetPos }).start();
        //  let final ;
        //  Vec3.lerp(final,this.camera.position,this.cameraTargetPos);
    }

    update(deltaTime:number){
        //set mouse
    }
    setCameraAngle(event){
        // console.log(event);
        const {movementX,movementY  } = event;
        // console.log("x mov: "+movementX+" | y mov: "+movementY);
        
        let x = 0,y = 0;
        this.cameraTargetRot = this.camera.eulerAngles;
        
        // y = movementY>0?-1:1;
        x = movementX>0?-1:1;
        Vec3.add(this.cameraTargetRot,this.cameraTargetRot,new Vec3(y*this.rotationSmoothing,x*this.rotationSmoothing,0));
        this.cameraTargetRot.x = math.clamp(this.cameraTargetRot.x,-75,75);
        tween(this.camera)
        .to(0.1,{eulerAngles: this.cameraTargetRot}).start();
        // console.log(this.camera.eulerAngles);
        
    
        
    }
    reset(){
        this.camera.setRotationFromEuler(new Vec3(0,0,0));
    }
    addScore(event){
        event.target.parent.active = false;
        this.gameScore +=20;
        if(this.currentQuestion < this.Questions.length-1){
            this.currentQuestion++;
            this.Questions[this.currentQuestion].active = true;
        }
        else{
            this.final.getComponent(Label).string = "Congrats your Score is:"+ this.gameScore.toString();
            
            this.final.active = true;
            tween(this.final).to(2,{active: false},{easing:"smooth"});
            this.scheduleOnce(()=>{
                this.final.active = false;
            },2);
        }
        
        this.scoreLabel.string = `SCORE: ${this.gameScore.toString()}`;
        // event.node

    }
    subScore(_number){
        if(this.gameScore>20)
            this.gameScore -=20;
        this.scoreLabel.string = `SCORE: ${this.gameScore.toString()}`;

    }
}
