import { GameObject, RenderTexture } from "UnityEngine";
import { Button } from "UnityEngine.UI";
import { ZepetoPlayers } from "ZEPETO.Character.Controller";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import { ZepetoWorldContent } from "ZEPETO.World";
import ToastMessageUI from "./ToastMessageUI";

export default class CameraFeedUI extends ZepetoScriptBehaviour {
    public cameraFeedUI: GameObject;
    public closeButtons: Button[];

    // Camera context
    public cameraContext: GameObject;
    public shutterButton: Button;

    public renderTexture: RenderTexture;

    // Share context
    public shareContext: GameObject;
    public saveButton: Button;
    public shareButton: Button;
    public postToFeedButton: Button;

    public flashlightFXPrefab: GameObject;

    @HideInInspector()
    public isShowing: bool = false;

    private Start() {
        this.Reset();

        for (const closeButton of this.closeButtons) {
            closeButton.onClick.AddListener(() => {
                GameObject.Destroy(this.gameObject);
            });
        }

        // Register event of buttons
        this.shutterButton.onClick.AddListener(() => {
            this.TakeScreenshotToRT();

            this.shareContext.SetActive(true);
        });

        this.saveButton.onClick.AddListener(() => {
            ZepetoWorldContent.SaveToCameraRoll(this.renderTexture, (result: boolean) => {});

            ToastMessageUI.Show("Save completed.", this.cameraFeedUI.transform);
        });
        this.shareButton.onClick.AddListener(() => {
            ZepetoWorldContent.Share(this.renderTexture, (result: boolean) => {});

            ToastMessageUI.Show("Share completed.", this.cameraFeedUI.transform);
        });
        this.postToFeedButton.onClick.AddListener(() => {
            ZepetoWorldContent.CreateFeed(
                this.renderTexture,
                "Let's play with me!!\n #popitadventure #zepetoworld #metaspace",
                (result: boolean) => {}
            );

            ToastMessageUI.Show("Post completed.", this.cameraFeedUI.transform);
        });
    }

    public Reset() {
        this.cameraContext.SetActive(true);
        this.shareContext.SetActive(false);
    }

    private TakeScreenshotToRT() {
        const camera = ZepetoPlayers.instance.ZepetoCamera.camera;
        camera.targetTexture = this.renderTexture;

        camera.Render();

        camera.targetTexture = null;

        const fx = GameObject.Instantiate(this.flashlightFXPrefab, this.shareContext.transform) as GameObject;
    }
}
