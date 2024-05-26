import { Collider, GameObject, Light } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Lantern extends ZepetoScriptBehaviour {

    public light: Light;
    public fire: GameObject;

    Start() {    
        this.LightOff();

    }

    OnTriggerEnter(collider: Collider) {
        this.LightOn();
    }

    OnTriggerExit(collider: Collider) {
        this.LightOff();
    }

    LightOn() {
        this.fire.SetActive(true);
        this.light.range = 15;
        this.light.intensity = 10;

    }

    LightOff() {
        this.fire.SetActive(false);
        this.light.range = 1.5;
        this.light.intensity = 1;


    }

}