import { LayerMask, Physics, Ray, RaycastHit, Transform, Vector3, WaitForSeconds } from 'UnityEngine'
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Content } from 'ZEPETO.World';

export default class CharacterPlayer extends ZepetoScriptBehaviour {

    private zepetoCharacter: ZepetoCharacter;
    private contents: Content[];

    Start() {
        //console.log(`[CharacterPlayer] ${this.gameObject.name}`);
        this.zepetoCharacter = this.gameObject.GetComponent<ZepetoCharacter>();
        this.gameObject.layer = LayerMask.NameToLayer("Player");

    }

    FixedUpdate() {
        var ray = new Ray(this.transform.position, Vector3.down);
        var ref = $ref<RaycastHit>();
        if (Physics.Raycast(ray, ref, 1)) {
            var hitInfo = $unref(ref);
            var hitObj = hitInfo.collider.gameObject;
            //console.log("on the Platform!!!");
            if (hitObj.layer == LayerMask.NameToLayer("Platform")) {
                if (this.transform.parent != hitObj.transform) {
                    this.transform.SetParent(hitObj.transform);
                }
                return;
            }
        }

        if (this.transform.parent != null) {
            this.transform.parent = null;
        }

    }

    public PlayRandomGesture() {
        var randomIndex = Math.floor(Math.random() * this.contents.length);
        var randomContent = this.contents[randomIndex];
        console.log(`radom: ${randomContent.Id} : ${randomContent.Title}`);

        this.PlayGesture(randomContent);

        //if (!randomContent.IsDownloadedAnimation) {
            //randomContent.DownloadAnimation(() => {
                //this.zepetoCharacter.SetGesture(randomContent.AnimationClip);
            //});
        //} else {
            //this.zepetoCharacter.SetGesture(randomContent.AnimationClip);
        //}

    }

    public PlayGestureWithId(id: string) {
        var filteredContents = this.contents.filter(content => content.Id == id);
        if (filteredContents.length > 0) {
            //if (!filteredContents[0].IsDownloadedAnimation) {
                //filteredContents[0].DownloadAnimation(() => {
                    //this.zepetoCharacter.SetGesture(filteredContents[0].AnimationClip);
                //});
            //} else {
                //this.zepetoCharacter.SetGesture(filteredContents[0].AnimationClip);
            //}
            this.PlayGesture(filteredContents[0]);
        } else {
            this.PlayRandomGesture();
        }
    }

    private PlayGesture(content: Content) {
        if (!content.IsDownloadedAnimation) {
            content.DownloadAnimation(() => {
                this.zepetoCharacter.SetGesture(content.AnimationClip);
            });
        } else {
            this.zepetoCharacter.SetGesture(content.AnimationClip);
        }
    }

    public StopGesture() {
        this.zepetoCharacter.CancelGesture();

    }

    public SetContents(contents: Content[]) {
        this.contents = contents;
    }

    public InteractFurniture(pivot: Transform, gestureId:string) {
        //this.zepetoCharacter.Teleport(pivot.position, pivot.rotation);
        //this.PlayGestureWithId(gestureId);
        this.StartCoroutine(this.Interaction(pivot, gestureId));

    }

    private *Interaction(pivot: Transform, gestureId: string) {
        this.zepetoCharacter.Teleport(pivot.position, pivot.rotation);
        yield new WaitForSeconds(0.3);
        this.PlayGestureWithId(gestureId);
    }


}