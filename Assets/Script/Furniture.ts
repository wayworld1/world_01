import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import CharacterPlayer from './CharacterPlayer';
import UiController from './UiController';
import { Transform } from 'UnityEngine';

export default class Furniture extends ZepetoScriptBehaviour {

    public pivot: Transform;
    public gestureId: string;

    private characterPlayer: CharacterPlayer;

    OnTriggerEnter(collider: Collider) {
        this.characterPlayer = collider.gameObject.GetComponent<CharacterPlayer>();
        UiController.instance.OnEnterFurniture(() => {
            this.PlayInteraction();
        });

    }

    OnTriggerExit(collider: Collider) {
        this.characterPlayer = null;
        UiController.instance.OnExitFurniture();

    }

    private PlayInteraction() {
        //this.characterPlayer.PlayGestureWithId(this.gestureId);
        this.characterPlayer.InteractFurniture(this.pivot, this.gestureId);
    }

    Start() {    

    }

}