import {BasicSceneBase} from '../../base/basic-scene.base';
import {Color3, CubeTexture, MeshBuilder, StandardMaterial, Texture, Tools, Vector3} from '@babylonjs/core';

export class SolarScene extends BasicSceneBase {
    constructor() {
        super();

        this.setCameraState();
        this.addSkyBox();

        this.addSun();
        this.addMercury();
        this.addVenus();
        this.addEarth();
    }

    setCameraState(): void {
        this.camera.position = new Vector3(8, 2, 0);
        this.camera.target = Vector3.Zero();
        this.camera.wheelPrecision = 300;
    }

    addSkyBox(): void {
        const skyBox = MeshBuilder.CreateBox(
            'skyBox',
            {size: 1000.0},
            this.scene
        );
        const skyBoxMat = new StandardMaterial('skyBox', this.scene);
        skyBoxMat.backFaceCulling = false;
        skyBoxMat.reflectionTexture = new CubeTexture(
            './assets/skyBox/galaxy/galaxy',
            this.scene
        );
        skyBoxMat.reflectionTexture.coordinatesMode =
            Texture.SKYBOX_MODE;
        skyBoxMat.diffuseColor = new Color3(0, 0, 0);
        skyBoxMat.specularColor = new Color3(0, 0, 0);
        skyBox.material = skyBoxMat;
    }

    addSun(): void {
        const sun = MeshBuilder.CreateSphere(
            'sun',
            { segments: 12, diameter: 1.7 },
            this.scene
        );
        const sunMat = new StandardMaterial('sunMat', this.scene);
        sunMat.diffuseTexture = new Texture('./assets/textures/sun.jpg', this.scene);
        sun.material = sunMat;
        this.engine.runRenderLoop(() => {
            sun.rotation.y += .005;
        });
    }

    addMercury(): void {
        const mercury = MeshBuilder.CreateSphere(
            'mercury',
            { segments: 12, diameter: .5 },
            this.scene
        );
        const mercuryMat = new StandardMaterial('mercuryMat', this.scene);
        mercuryMat.diffuseTexture = new Texture('./assets/textures/mercury.jpg', this.scene);
        mercury.material = mercuryMat;
        let num = 0;
        this.engine.runRenderLoop(() => {
            mercury.rotation.y -= .01;
            mercury.position.x = Math.sin(num += .005) * 2;
            mercury.position.z = Math.cos(num += .005) * 2;
        });
    }

    addVenus(): void {
        const venus = MeshBuilder.CreateSphere(
            'venus',
            { segments: 12, diameter: .6 },
            this.scene
        );
        const venusMat = new StandardMaterial('venusMat', this.scene);
        venusMat.diffuseTexture = new Texture('./assets/textures/venus.jpg', this.scene);
        venus.material = venusMat;
        let num = 0;
        this.engine.runRenderLoop(() => {
            venus.rotation.y -= .01;
            venus.position.x = Math.sin(num += .007) * 3;
            venus.position.z = Math.cos(num += .007) * 3;
        });
    }

    addEarth(): void {
        const earth = MeshBuilder.CreateSphere(
            'earth',
            { segments: 12, diameter: .7 },
            this.scene
        );
        const earthMat = new StandardMaterial('earthMat', this.scene);
        earthMat.diffuseTexture = new Texture('./assets/textures/earth.jpg', this.scene);
        earth.material = earthMat;
        earth.rotation.z = Tools.ToRadians(180);

        let num = 0;
        this.engine.runRenderLoop(() => {
            earth.rotation.y -= .01;
            earth.position.z = Math.cos(num += .008) * 4;
            earth.position.x = Math.sin(num += .008) * 4;
        });
    }
}
