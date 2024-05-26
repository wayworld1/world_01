import { Color, GameObject, Mathf, Time } from "UnityEngine";
import { Image } from "UnityEngine.UI";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";

export default class FlashlightFX extends ZepetoScriptBehaviour {
    public fadeSpeedFactor: float = 1;

    private image: Image;

    private alpha: float;

    private Start() {
        this.image = this.GetComponent<Image>();
        this.alpha = 1;
    }

    private Update() {
        this.image.color = new Color(1, 1, 1, this.alpha);

        this.alpha = Mathf.Clamp(this.alpha - Time.deltaTime * this.fadeSpeedFactor, 0, 1);

        if (this.alpha <= 0) {
            GameObject.Destroy(this.gameObject);
        }
    }
}
