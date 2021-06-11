import {BasicSceneBase} from "../../../base/basic-scene.base";
import '@babylonjs/loaders';
import {AbstractMesh, Animation, SceneLoader, Vector3} from "@babylonjs/core";

export class TheDude extends BasicSceneBase {
    dude: AbstractMesh;

    constructor() {
        super();
        this.loadTheDude();
    }

    loadTheDude(): void {
        SceneLoader
            .ImportMeshAsync('him',
                './assets/scenes/',
                'Dude.babylon',
                this.scene)
            .then((result) => {
                this.dude = result.meshes[0];
                this.dude.scaling = new Vector3(.02, .02, .02);
                this.dude.position.y = 1;

                this.scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
                this.animateDude();
            });
    }

    animateDude(): void {
        this.engine.runRenderLoop(() => {
            this.dude.movePOV(0, 0, 0.01);
        })
    }
}
