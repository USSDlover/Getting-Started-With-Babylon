import {EngineBase} from "../../../base/engine.base";
import {IScene} from "../../../interfaces/scene.interface";
import {ArcRotateCamera, Camera, HemisphericLight, Light, Scene, SceneLoader, Vector3} from "@babylonjs/core";
import '@babylonjs/loaders/glTF';

export class VillageBabylonGlb extends EngineBase implements IScene {
    camera: Camera;
    light: Light;
    scene: Scene;

    constructor() {
        super();
        this.createScene();
    }

    createScene() {
        this.scene = new Scene(this.engine);

        this.camera = new ArcRotateCamera('camera',
            -Math.PI / 2, Math.PI / 2.5, 15,
            new Vector3(0, 0, 0), this.scene);
        this.camera.attachControl(this.engine, true);
        this.light = new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        SceneLoader
            .ImportMeshAsync('', './assets/models/', 'village.glb')
            .then(res => {
                console.log(res);
            })
            .catch(reason => {
                console.log(reason);
            });
    };

}
