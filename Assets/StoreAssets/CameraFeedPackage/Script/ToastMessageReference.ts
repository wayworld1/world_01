import { GameObject } from "UnityEngine";

export default class ToastMessageReference {
    public static Instance: ToastMessageReference;

    public toastMessagePrefab: GameObject;

    private Awake() {
        ToastMessageReference.Instance = this;
    }
}
