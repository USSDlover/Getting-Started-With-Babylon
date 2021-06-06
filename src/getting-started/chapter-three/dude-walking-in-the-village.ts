import {BasicSceneBase} from "../../base/basic-scene.base";
import {Axis, SceneLoader, Space, Tools, Vector3} from "@babylonjs/core";
import '@babylonjs/loaders';

export class DudeWalkingInTheVillage extends BasicSceneBase {
    constructor() {
        super();
        this.action();
    }

    action(): void {

        SceneLoader.ImportMeshAsync("", "./assets/models/", "village.glb");

        const walk = function (turn, dist) {
            this.turn = turn;
            this.dist = dist;
        }

        const track = [];
        track.push(new walk(86, 7));
        track.push(new walk(-85, 14.8));
        track.push(new walk(-93, 16.5));
        track.push(new walk(48, 25.5));
        track.push(new walk(-112, 30.5));
        track.push(new walk(-72, 33.2));
        track.push(new walk(42, 37.5));
        track.push(new walk(-98, 45.2));
        track.push(new walk(0, 47))

        // Dude
        SceneLoader.ImportMeshAsync("him", "./assets/scenes/", "Dude.babylon", this.scene)
            .then((result) => {
            const dude = result.meshes[0];
            dude.scaling = new Vector3(0.008, 0.008, 0.008);

            dude.position = new Vector3(-6, 0, 0);
            dude.rotate(Axis.Y, Tools.ToRadians(-95), Space.LOCAL);
            const startRotation = dude.rotationQuaternion.clone();

            this.scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

            let distance = 0;
            let step = 0.015;
            let p = 0;

            this.scene.onBeforeRenderObservable.add(() => {
                dude.movePOV(0, 0, step);
                distance += step;

                if (distance > track[p].dist) {

                    dude.rotate(Axis.Y, Tools.ToRadians(track[p].turn), Space.LOCAL);
                    p +=1;
                    p %= track.length;
                    if (p === 0) {
                        distance = 0;
                        dude.position = new Vector3(-6, 0, 0);
                        dude.rotationQuaternion = startRotation.clone();
                    }
                }

            })
        });
    }
}
