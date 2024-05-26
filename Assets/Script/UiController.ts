import { Animator, GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ScreenShotController from './ScreenShotController';
import CharacterPlayer from './CharacterPlayer';

export default class UiController extends ZepetoScriptBehaviour {

    public static instance: UiController;
    //public screenShotController: GameObject;

    public saveScreenShotBtn: Button;
    public shareScreenShotBtn: Button;
    public feedScreenShotBtn: Button;
    public playGestrueBtn: Button;
    public stopGestureBtn: Button;
    public interactionBtn: Button;
    public inventorytBtn: Button;
    public foldScreenShot: Button;
    public foldScreenShotAnim: Animator;

    private characterPlayer: CharacterPlayer;
    private furnitureAction: () => void
    private show: boolean;
    

    public OnEnterFurniture(furnitureAction: () => void) {
        this.interactionBtn.interactable = true;
        this.furnitureAction = furnitureAction;
    }

    public OnExitFurniture() {
        this.interactionBtn.interactable = false;
        this.furnitureAction = null;
    }

    Awake() {
        UiController.instance = this;
        this.show = false;
        
    }


    Start() {    
        //var screenShotController = this.screenShotController.GetComponent<ScreenShotController>();

        this.interactionBtn.interactable = false;

        this.saveScreenShotBtn.onClick.AddListener(() => {
            //screenShotCont.SaveScreenShot();
            ScreenShotController.instance.SaveScreenShot();

        });
        this.shareScreenShotBtn.onClick.AddListener(() => {
            //screenShotCont.ShareScreenShot();
            ScreenShotController.instance.ShareScreenShot();

        });
        this.feedScreenShotBtn.onClick.AddListener(() => {
            //screenShotCont.FeedScreenShot();
            ScreenShotController.instance.FeedScreenShot();

        });
        this.playGestrueBtn.onClick.AddListener(() => {
            //play gesture
            //this.characterPlayer.PlayRandomGesture();
            this.characterPlayer.PlayGestureWithId("ZW_POSE_064");

        });
        this.stopGestureBtn.onClick.AddListener(() => {
            this.characterPlayer.StopGesture() ;

        });
        this.interactionBtn.onClick.AddListener(() => {
            this.furnitureAction();

        });
        this.inventorytBtn.onClick.AddListener(() => {

        });
        this.foldScreenShot.onClick.AddListener(() => {
            if (this.show == false) {
                this.show = true;
                this.foldScreenShotAnim.Play("ScreenShot_show");

            }
            else if (this.show == true) {
                this.show = false;
                this.foldScreenShotAnim.Play("ScreenShot_hide");
            }
        });
    

    }

}