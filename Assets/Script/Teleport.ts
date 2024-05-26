import { Collider, GameObject, LayerMask, Quaternion, Vector3 } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Teleport extends ZepetoScriptBehaviour {

    public destination: GameObject;

    OnTriggerEnter(collider: Collider) {
        if (collider.gameObject.layer == LayerMask.NameToLayer("Player")) {
            var zepetoCharacter = collider.gameObject.GetComponent<ZepetoCharacter>();
            zepetoCharacter.Teleport(this.destination.transform.position, Quaternion.identity);
            
            //console.log("OnTriggerEnter!!!");

        }
        
     
    }

    Start() {    

    }

}