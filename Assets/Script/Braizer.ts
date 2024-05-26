import { Collider, GameObject, Light } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Braizer extends ZepetoScriptBehaviour {
    
    public fire: GameObject
    

   

    Start() {   
        this.FireOff();

    }
        
        OnTriggerEnter(collider: Collider) {
            console.log("OnTriggerEnter!!!");
            this.FireOn();
        
        }
    
        OnTriggerExit(collider: Collider) {
            console.log("OnTriggerExit!!!");
            this.FireOff();
    
        }

        FireOn() {
            this.fire.SetActive(true);

        }

        FireOff() {
            this.fire.SetActive(false);

        }

    

}