import {Camera, HemisphericLight, MeshBuilder, Scene, Vector3} from "@babylonjs/core";
import {IScene} from "../../interfaces/scene.interface";
import {BasicSceneBase} from "../../base/basic-scene.base";

export class TheCar extends BasicSceneBase implements IScene {
    camera: Camera;
    light: HemisphericLight;
    scene: Scene;

    constructor() {
        super()
        this.buildTheCar();
    }

    private buildTheCar(): void {
        // Base
        const outline = [
            new Vector3(-.3, 0, -.1),
            new Vector3(.2, 0, -.1)
        ];

        // Curver front
        for (let i = 0; i < 20; i++) {
            outline.push(new Vector3(
                .2 * Math.cos(i * Math.PI / 40),
                0,
                .2 * Math.sin(i * Math.PI / 40) - .1
            ));
        }

        // Top
        outline.push(new Vector3(0,0,.1));
        outline.push(new Vector3(-.3,0,.1));

        const car = MeshBuilder.ExtrudePolygon('car', {
            shape: outline, depth: .2
        }, this.scene);

        const wheelRB = MeshBuilder.CreateCylinder(
            'wheelRB',
            {diameter: .125, height: .05});

        wheelRB.parent = car;
        wheelRB.position.z = -.1;
        wheelRB.position.x = -.2;
        wheelRB.position.y = .035;

        const wheelRF = wheelRB.clone('wheelRF');
        wheelRF.position.x = .1;

        const wheelLB = wheelRB.clone('wheelLB');
        wheelLB.position.y = -.2 - .035;

        const wheelLF = wheelRF.clone('wheelLF');
        wheelLF.position.y = -.2 - .035;
    }
}
