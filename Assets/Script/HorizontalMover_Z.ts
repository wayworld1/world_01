import { Time, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

enum MoveDirection {
    Right,
    Left,
    Up,
    Down,
    front,
    back
}



export default class HorizontalMover_Z extends ZepetoScriptBehaviour {

    public minZ: number;
    public maxZ: number;
    public speed: number;

    private direction: MoveDirection;

    Start() {    
        this.direction = MoveDirection.front;

    }

    FixedUpdate() {
        if (this.direction == MoveDirection.front) {
            this.transform.Translate(new Vector3(0, 0, Time.fixedDeltaTime * this.speed));
        } else if (this.direction == MoveDirection.back) {
            this.transform.Translate(new Vector3(0, 0, -Time.fixedDeltaTime * this.speed));
        }

        if (this.transform.position.z > this.maxZ) {
            this.direction = MoveDirection.back;
        } else if (this.transform.position.z < this.minZ) {
            this.direction = MoveDirection.front;
        }
    }

}