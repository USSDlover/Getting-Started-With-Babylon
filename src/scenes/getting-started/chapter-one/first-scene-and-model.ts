import {
    ArcRotateCamera, Camera,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    Vector3
} from '@babylonjs/core';
import {EngineBase} from '../../../base/engine.base';
import {IScene} from '../../../interfaces/scene.interface';

export class FirstSceneAndModel extends EngineBase implements IScene {
    scene: Scene;
    camera: Camera;
    light: HemisphericLight;

    constructor() {
        super();
        this.scene = new Scene(this.engine);

        this.camera = new ArcRotateCamera(
            'camera',
            -Math.PI / 2, Math.PI / 2.5, 3,
            new Vector3(0, 0, 0),
            this.scene
        );
        this.camera.attachControl(this.canvas, true);

        this.light = new HemisphericLight(
            'light',
            new Vector3(0, 1, 0),
            this.scene
        );

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        this.addBox();
    }

    addBox(): void {
        const box: Mesh = MeshBuilder
            .CreateBox('box', {}, this.scene);
    }
}
