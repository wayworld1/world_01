
import { LocalPlayer, SpawnInfo, ZepetoCharacter, ZepetoPlayers, } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { OfficialContentType, WorldService, ZepetoWorldContent } from "ZEPETO.World";
import ScreenShotController from './ScreenShotController';
import UiController from './UiController';
import CharacterPlayer from './CharacterPlayer';

export default class CharacterController extends ZepetoScriptBehaviour {

    Start() {
        ZepetoPlayers.instance.CreatePlayerWithZepetoId("way808", new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            const player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
            ScreenShotController.instance.camera = player.zepetoCamera.camera;

            //캐릭터에 내가 제어할 수 있는 스크립트 추가.
            var ZepetoCharacter: ZepetoCharacter = player.zepetoPlayer.character;
            var characterPlayer = ZepetoCharacter.gameObject.AddComponent<CharacterPlayer>();

            UiController.instance.characterPlayer = characterPlayer;
            this.ContentRequest(characterPlayer);

        });
    }

    private ContentRequest(characterPlayer: CharacterPlayer) {
        ZepetoWorldContent.RequestOfficialContentList(OfficialContentType.All, contents => {
            contents.forEach(content => console.log(`${content.Id} : ${content.Title}`));
            characterPlayer.SetContents(contents);

        });
    }
}