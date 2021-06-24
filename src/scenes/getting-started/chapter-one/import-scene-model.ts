import {
    FollowCamera,
    HemisphericLight,
    Scene, SceneLoader,
    Vector3
} from '@babylonjs/core';
import {EngineBase} from '../../../base/engine.base';
import {IScene} from '../../../interfaces/scene.interface';

export class ImportSceneModel extends EngineBase implements IScene {
    scene: Scene;
    camera: FollowCamera;
    light: HemisphericLight;

    constructor() {
        super();
        this.scene = new Scene(this.engine);

        this.camera = new FollowCamera(
            'follow-camera',
            new Vector3(30, 30, 30),
            this.scene
        );


        this.light = new HemisphericLight(
            'light',
            new Vector3(0, 1, 0),
            this.scene
        );

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        this.importMesh();
    }

    importMesh(): void {
        SceneLoader
            .ImportMesh(
                '',
                './assets/models/sea-shack/',
                'Sea-Shack.babylon',
                this.scene,
                (abstractMeshes) => {
                    this.camera.target = abstractMeshes[0].ellipsoid;
                }
            );
    }
}
