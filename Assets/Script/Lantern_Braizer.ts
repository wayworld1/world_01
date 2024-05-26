import { Collider, GameObject, Light } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Lantern_Braizer extends ZepetoScriptBehaviour {

    public light: Light;
    public fire: GameObject;
    

    OnTriggerEnter(collider: Collider) {
        this.FireOn();
        //console.log("OnTriggerEnter!!!");
    }

    OnTriggerExit(collider: Collider) {
        this.FireOff();
        //console.log("OnTriggerExit!!!");    
    }
    Start() {  
        this.FireOff();    

    }

    FireOn() {
        if (this.fire !== null) this.fire.SetActive(true);
        if (this.light !== null) this.light.range = 3;
        if (this.light !== null) this.light.intensity = 2;

    }

    FireOff() {
        if (this.fire !== null) this.fire.SetActive(false);
        if (this.light !== null) this.light.range = 0;
        if (this.light !== null) this.light.intensity = 0;

    }

}