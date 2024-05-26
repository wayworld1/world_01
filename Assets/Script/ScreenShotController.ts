import { Camera, RenderTexture, WaitForEndOfFrame, WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldContent } from 'ZEPETO.World';

enum ScreenShotType {
    Save,
    Share,
    Feed
}

export default class ScreenShotController extends ZepetoScriptBehaviour {

    //public static staticNumber: number;

    public static instance: ScreenShotController;

    public renderTexture: RenderTexture;
    public camera: Camera;
    
    Awake() {
        ScreenShotController.instance = this;

}

    public SaveScreenShot() {
        this.StartCoroutine(this.RenderTargetTexture(ScreenShotType.Save));

    }

    public ShareScreenShot() {
        this.StartCoroutine(this.RenderTargetTexture(ScreenShotType.Share));

    }

    public FeedScreenShot() {
        this.StartCoroutine(this.RenderTargetTexture(ScreenShotType.Feed));

    }

    //public static StaticMethod() {

    //}

    private *RenderTargetTexture(type: ScreenShotType) {
        //console.log("start");
        //yield new WaitForSeconds(1);
        //console.log("after 1 second");
        //yield new WaitForSeconds(2);
        //console.log("after 2 second");

        this.camera.targetTexture = this.renderTexture;
        yield new WaitForEndOfFrame();
        this.camera.Render();
        this.camera.targetTexture = null;

        if (type == ScreenShotType.Save) {
            this.SaveToCameraRoll();
        } else if (type == ScreenShotType.Share) {
            this.ShareScreenShot();
        } else if (type == ScreenShotType.Feed) {
            this.CreateFeed();
        }


    }

    private SaveToCameraRoll() {
        ZepetoWorldContent.SaveToCameraRoll(this.renderTexture, null);

    }

    private Share() {
        ZepetoWorldContent.Share(this.renderTexture, null);

    }

    private CreateFeed() {
        ZepetoWorldContent.CreateFeed(this.renderTexture, "[message]", null);

    }

    Start() {    

    }

}