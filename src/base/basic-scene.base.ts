import {ArcRotateCamera, HemisphericLight, Scene, Vector3} from "@babylonjs/core";
import {EngineBase} from "./engine.base";
import {IScene} from "../interfaces/scene.interface";

export class BasicSceneBase extends EngineBase implements IScene {
    camera: ArcRotateCamera;
    light: HemisphericLight;
    scene: Scene;

    constructor() {
        super()
        this.scene = new Scene(this.engine)

        this.camera = new ArcRotateCamera(
            'arc-camera',
            -Math.PI / 2, Math.PI / 2, 5,
            new Vector3(0, 0, 0),
            this.scene
        );

        this.camera.attachControl();

        this.light = new HemisphericLight(
            'hemi-light',
            new Vector3(0, 1, 0),
            this.scene
        );

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}
