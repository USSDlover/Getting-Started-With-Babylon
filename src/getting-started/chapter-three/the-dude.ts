import {BasicSceneBase} from "../../base/basic-scene.base";
import '@babylonjs/loaders';
import {SceneLoader, Vector3} from "@babylonjs/core";

export class TheDude extends BasicSceneBase {
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
                const dude = result.meshes[0];
                dude.scaling = new Vector3(.02, .02, .02);
                dude.position.y = 1;

                this.scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
            });
    }
}
