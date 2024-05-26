import { GameObject, Mathf, Time, Transform, Vector3 } from "UnityEngine";
import { Image, Text } from "UnityEngine.UI";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import ToastMessageReference from "./ToastMessageReference";

export default class ToastMessageUI extends ZepetoScriptBehaviour {
    public toastMessagePrefab: GameObject;

    public delay: float;
    private remainedDelay: float;

    public panelImage: Image;
    public text: Text;

    private time: float;

    public static Show(message: string, parentTrsf: Transform) {
        console.log(ToastMessageReference.Instance);
        const toastMessageUI = GameObject.Instantiate(
            ToastMessageReference.Instance.toastMessagePrefab,
            parentTrsf
        ) as GameObject;
        toastMessageUI.GetComponent<ToastMessageUI>().SetText(message);
    }
    private Start() {
        this.remainedDelay = this.delay;
        this.time = 0;
    }
    private Update() {
        if (this.remainedDelay > 0) {
            this.remainedDelay -= Time.deltaTime;
        } else {
            let color = this.panelImage.color;
            color.a = Mathf.Clamp(color.a - Time.deltaTime * 0.5, 0, 1);
            this.panelImage.color = color;
            this.text.color = color;

            if (color.a <= 0) {
                GameObject.Destroy(this.gameObject);
            }
        }

        this.time = Mathf.Clamp(this.time + Time.deltaTime, 0, 1);

        const scale = this.easeOutElastic(this.time);
        this.transform.localScale = new Vector3(scale, scale, 1);
    }

    public SetText(text: string) {
        this.text.text = text;
    }

    private easeOutElastic(x: float): float {
        const c4 = (2 * Math.PI) / 3;

        return x === 0 ? 0 : x === 1 ? 1 : Mathf.Pow(2, -10 * x) * Mathf.Sin((x * 10 - 0.75) * c4) + 1;
    }
}
