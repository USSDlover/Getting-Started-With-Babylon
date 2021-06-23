import {BasicSceneBase} from "../../base/basic-scene.base";
import {
    Color3,
    Mesh,
    MeshBuilder,
    PointLight,
    StandardMaterial,
    Tools,
    Vector3
} from "@babylonjs/core";

export class TownScene extends BasicSceneBase {
    pointLight: PointLight;
    box: Mesh;

    constructor() {
        super();

        this.setWheelSpeed();
        this.addPlane();
        this.addBox();
        this.addPointLight();
        this.turnOffLight();

        let num = 0;
        this.engine.runRenderLoop(() => {
            this.box.rotation.z += .05;
            this.box.rotation.x += .05;
            this.box.position.x = Math.sin(num += .01);
            this.box.position.y = Math.tan(num += .01);
        });
    }

    turnOffLight(): void {
        this.light.diffuse = Color3.Yellow();
    }

    setWheelSpeed(): void {
        this.camera.position = new Vector3(8, 3, 5);
        this.camera.target = Vector3.Zero();
        this.camera.wheelPrecision = 300;
    }

    addBox(): void {
        this.box = MeshBuilder.CreateBox(
            'box',
            {width: .3, height: .3, depth: .3},
            this.scene
        );
        this.box.position.y = 1.5;
    }

    addPlane(): void {
        const plane = MeshBuilder.CreateBox(
            'base',
            {
                size: 6,
                width: .01
            },
            this.scene
        );
        plane.rotation.z = Tools.ToRadians(90);

        const planeMat = new StandardMaterial('planeMat', this.scene);
        planeMat.diffuseColor = new Color3(.01, .2, .1);

        plane.material = planeMat;
    }

    addPointLight(): void {
        this.pointLight = new PointLight(
            'p-light',
            new Vector3(1, 0, 2),
            this.scene
        );
        this.pointLight.direction = Vector3.Zero();
        this.pointLight.diffuse = Color3.Blue();
    }
}
