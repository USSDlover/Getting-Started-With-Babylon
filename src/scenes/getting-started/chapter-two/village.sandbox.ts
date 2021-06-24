import {EngineBase} from '../../../base/engine.base';
import {IScene} from '../../../interfaces/scene.interface';
import {
    ArcRotateCamera,
    Camera,
    Color3,
    HemisphericLight,
    Light, Mesh, MeshBuilder,
    Scene,
    StandardMaterial, Texture,
    Vector3, Vector4
} from '@babylonjs/core';

export class VillageSandbox extends EngineBase implements IScene {
    scene: Scene;
    camera: Camera;
    light: Light;

    constructor() {
        super();
        this.createScene();
    }

    createScene(): void {
        this.scene = new Scene(this.engine);

        /**** Set camera and light *****/
        this.camera = new ArcRotateCamera(
            'camera',
            -Math.PI / 2, Math.PI / 2.5, 15,
            new Vector3(0, 0, 0),
            this.scene
        );
        this.camera.attachControl(this.canvas, true);
        const light = new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        this.buildDwellings();
    }

    /******Build Functions***********/
    buildDwellings(): void {
        this.buildGround();

        const detachedHouse = this.buildHouse(1);
        detachedHouse.rotation.y = -Math.PI / 16;
        detachedHouse.position.x = -6.8;
        detachedHouse.position.z = 2.5;

        const semiHouse = this.buildHouse(2);
        semiHouse.rotation.y = -Math.PI / 16;
        semiHouse.position.x = -4.5;
        semiHouse.position.z = 3;

        const places = []; // each entry is an array [house type, rotation, x, z]
        places.push([1, -Math.PI / 16, -6.8, 2.5]);
        places.push([2, -Math.PI / 16, -4.5, 3]);
        places.push([2, -Math.PI / 16, -1.5, 4]);
        places.push([2, -Math.PI / 3, 1.5, 6]);
        places.push([2, 15 * Math.PI / 16, -6.4, -1.5]);
        places.push([1, 15 * Math.PI / 16, -4.1, -1]);
        places.push([2, 15 * Math.PI / 16, -2.1, -0.5]);
        places.push([1, 5 * Math.PI / 4, 0, -1]);
        places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
        places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
        places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
        places.push([2, Math.PI / 1.9, 4.75, -1]);
        places.push([1, Math.PI / 1.95, 4.5, -3]);
        places.push([2, Math.PI / 1.9, 4.75, -5]);
        places.push([1, Math.PI / 1.9, 4.75, -7]);
        places.push([2, -Math.PI / 3, 5.25, 2]);
        places.push([1, -Math.PI / 3, 6, 4]);

        // Create instances from the first two that were built
        const houses = [];
        for (let i = 0; i < places.length; i++) {
            if (places[i][0] === 1) {
                houses[i] = detachedHouse.createInstance('house' + i);
            } else {
                houses[i] = semiHouse.createInstance('house' + i);
            }
            houses[i].rotation.y = places[i][1];
            houses[i].position.x = places[i][2];
            houses[i].position.z = places[i][3];
        }
    }

    buildGround(): void {
        // color
        const groundMat = new StandardMaterial('groundMat', this.scene);
        groundMat.diffuseColor = new Color3(0, 1, 0);

        const ground = MeshBuilder.CreateGround('ground',
            {width: 15, height: 16}, this.scene);
        ground.material = groundMat;
    }

    buildHouse(width): Mesh {
        const box = this.buildBox(width);
        const roof = this.buildRoof(width);

        return Mesh.MergeMeshes([box, roof], true, false, null, false, true);
    }

    buildBox(width): Mesh {
        // texture
        const boxMat = new StandardMaterial('boxMat', this.scene);
        if (width === 2) {
            boxMat.diffuseTexture = new Texture('./assets/textures/semihouse.png', this.scene);
        } else {
            boxMat.diffuseTexture = new Texture('./assets/textures/cubehouse.png', this.scene);
        }

        // options parameter to set different images on each side
        const faceUV = [];
        if (width === 2) {
            faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0); // rear face
            faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0); // front face
            faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0); // right side
            faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0); // left side
        } else {
            faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); // rear face
            faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); // front face
            faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0); // right side
            faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0); // left side
        }
        // top 4 and bottom 5 not seen so not set

        /**** World Objects *****/
        const box = MeshBuilder.CreateBox('box',
            { width, faceUV, wrap: true });
        box.material = boxMat;
        box.position.y = 0.5;

        return box;
    }

    buildRoof(width): Mesh {
        // texture
        const roofMat = new StandardMaterial('roofMat', this.scene);
        roofMat.diffuseTexture = new Texture('./assets/textures/roof.jpg',
            this.scene);

        const roof = MeshBuilder.CreateCylinder('roof',
            {diameter: 1.3, height: 1.2, tessellation: 3});
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.scaling.y = width;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;

        return roof;
    }
}
