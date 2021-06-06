import {
    MeshBuilder,
    StandardMaterial,
    Texture,
    Vector3,
    Vector4
} from "@babylonjs/core";
import {IScene} from "../../interfaces/scene.interface";
import {BasicSceneBase} from "../../base/basic-scene.base";

export class TheCar extends BasicSceneBase implements IScene {
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

        // Curve front
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

        const faceUV = [];
        // Bottom
        faceUV[0] = new Vector4(0,.5,.38,1);
        // Top
        faceUV[2] = new Vector4(.38,1,0,.5);
        // Edge
        faceUV[1] = new Vector4(0,0,1,.5);

        const car = MeshBuilder.ExtrudePolygon('car', {
            shape: outline, depth: .2, faceUV, wrap: true
        }, this.scene);

        const carMat = new StandardMaterial('carMat', this.scene);
        carMat.diffuseTexture = new Texture('./assets/textures/car.png', this.scene);
        car.material = carMat;


        const wheelUV = [];
        wheelUV[0] = new Vector4(0,0,1,1);
        wheelUV[1] = new Vector4(0,.5,0,.5);
        wheelUV[2] = new Vector4(0,0,1,1);

        const wheelRB = MeshBuilder.CreateCylinder(
            'wheelRB',
            {diameter: .125, height: .05, faceUV: wheelUV});

        const wheelMat = new StandardMaterial('wheelMat', this.scene);
        wheelMat.diffuseTexture = new Texture('./assets/textures/wheel.png', this.scene);
        wheelRB.material = wheelMat;

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
