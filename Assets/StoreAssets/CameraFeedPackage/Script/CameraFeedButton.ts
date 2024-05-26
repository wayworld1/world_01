import { GameObject } from "UnityEngine";
import { Button } from "UnityEngine.UI";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";

export default class CameraFeedButton extends ZepetoScriptBehaviour {
    public cameraFeedUIPrefab: GameObject;

    private Start() {
        this.GetComponent<Button>().onClick.AddListener(() => {
            const currentIndex = this.transform.GetSiblingIndex();
            const UIInstance = GameObject.Instantiate(this.cameraFeedUIPrefab, this.transform.parent) as GameObject;
            UIInstance.transform.SetSiblingIndex(currentIndex + 1);
        });
    }
}
