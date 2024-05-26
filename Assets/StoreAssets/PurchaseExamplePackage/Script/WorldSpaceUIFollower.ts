import { Canvas, Mathf, RectTransform, Screen, Transform, Vector2, Vector3 } from "UnityEngine";
import { CanvasScaler } from "UnityEngine.UI";
import { ZepetoPlayers } from "ZEPETO.Character.Controller";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";

export default class WorldSpaceUIFollower extends ZepetoScriptBehaviour {
    public targetTrsf: Transform;
    public worldOffset: Vector3 = new Vector3(0, 0, 0);
    public maxDistance: float = 20;

    private rectTrsf: RectTransform;

    private Start() {
        this.rectTrsf = this.GetComponent<RectTransform>();
        this.rectTrsf.anchorMin = new Vector2(0, 0);
        this.rectTrsf.anchorMax = new Vector2(0, 0);
    }

    private Update() {
        this.UpdatePosition();
    }

    private UpdatePosition() {
        const camera = ZepetoPlayers.instance.ZepetoCamera.camera;
        if (!camera || !this.targetTrsf) return;

        const distanceFromTarget = Vector3.op_Subtraction(camera.transform.position, this.targetTrsf.position).magnitude;
        let position;

        if (distanceFromTarget > this.maxDistance) {
            position = new Vector2(-10000, -100000);
        } else {
            const parentCanvas = this.GetComponentInParent<Canvas>();
            if (!parentCanvas) return;
            const parentCanvasRect = parentCanvas.GetComponent<RectTransform>();

            const viewportPosition = camera.WorldToViewportPoint(Vector3.op_Addition(this.targetTrsf.position, this.worldOffset));

            position = new Vector2(
                viewportPosition.x * parentCanvasRect.sizeDelta.x,
                viewportPosition.y * parentCanvasRect.sizeDelta.y
            );
        }
        this.rectTrsf.anchoredPosition = position;
    }
}
