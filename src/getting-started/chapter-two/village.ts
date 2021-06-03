import {IScene} from "../../interfaces/scene.interface";
import {
    ArcRotateCamera, Color3,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    Sound,
    StandardMaterial, Texture,
    Tools,
    Vector3, Vector4
} from "@babylonjs/core";
import {EngineBase} from "../../base/engine.base";

export class Village extends EngineBase implements IScene {
    camera: ArcRotateCamera;
    light: HemisphericLight;
    scene: Scene;

    constructor() {
        super()
        this.scene = new Scene(this.engine)

        this.camera = new ArcRotateCamera(
            'arc-camera',
            -Math.PI / 2, Math.PI / 2.5, 5,
            new Vector3(0, 1, 1),
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

        this.initArtifacts();
    }

    initArtifacts(): void {
        this.addGround();
        this.buildHouse();
        this.addSound();
    }

    addSound(): void {
        const sound = new Sound(
            'house-in-a-forest',
            './assets/sounds/house-in-a-forest-loop.ogg',
            this.scene,
            null,
            {
                autoplay: false,
                loop: true,
                volume: .3
            }
        );
    }

    addGround(): void {
        const ground = MeshBuilder
            .CreateGround(
                'ground',
                { width: 10, height: 10 },
                this.scene
            );
        const groundMat = new StandardMaterial('groundMat', this.scene);
        groundMat.diffuseColor =
            new Color3(.3, 1, .5);
        ground.material = groundMat;
    }

    addBox(): void {
        const box1 = MeshBuilder
            .CreateBox( 'box-one', {}, this.scene);
        box1.scaling = new Vector3(1, 1.5, 1);
        box1.position = new Vector3(-1, 1.5, 0);

        const box2 = MeshBuilder
            .CreateBox('box-two', {}, this.scene);
        box2.scaling = new Vector3(1, 1.5, 1);
        box2.position = new Vector3(0, 1.6, 0.5);
        box2.rotation.y = Math.PI / 4;

        const box3 = MeshBuilder
            .CreateBox('box-three', {}, this.scene);
        box3.scaling = new Vector3(1, 1.5, 1.3);
        box3.position = new Vector3(2, 1.7, .7);
        box3.rotation.y = Tools.ToRadians(45);
    }

    buildHouse(): void {
        const cubeFaceUV = [];
        cubeFaceUV[0] = new Vector4(.5, 0, .75, 1);
        cubeFaceUV[1] = new Vector4(0, 0, .25, 1);
        cubeFaceUV[2] = new Vector4(.25, 0, .5, 1);
        cubeFaceUV[3] = new Vector4(.75, 0, 1, 1);

        const rectAngleFaceUV = [];
        rectAngleFaceUV[0] = new Vector4(.6, 0, 1, 1); // rear face
        rectAngleFaceUV[1] = new Vector4(0, 0, .4, 1); // front face
        rectAngleFaceUV[2] = new Vector4(.4, 0, .6, 1); // right side
        rectAngleFaceUV[3] = new Vector4(.4, 0, .6, 1); // left side

        const body = MeshBuilder
            .CreateBox('house-bod',
                {
                    width: 2,
                    faceUV: rectAngleFaceUV,
                    wrap: true
                },
                this.scene);
        body.position.y = .5;

        const roof = MeshBuilder
            .CreateCylinder(
                'roof',
                {
                    diameter: 1.3,
                    height: 2.2,
                    tessellation: 3
                }
            );
        roof.scaling.x = .75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.2;

        const roofMat = new StandardMaterial('roofMat', this.scene);
        roofMat.diffuseTexture = new Texture('./assets/textures/roof.jpg', this.scene);
        roof.material = roofMat;

        const bodyMat = new StandardMaterial('bodyMat', this.scene);
        bodyMat.diffuseTexture = new Texture('./assets/textures/semihouse.png', this.scene);
        body.material = bodyMat;

        const house = Mesh.MergeMeshes(
            [body, roof],
            true,
            false,
            null,
            false,
            true
        );
    }
}
