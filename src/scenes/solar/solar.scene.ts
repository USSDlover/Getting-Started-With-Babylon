import {BasicSceneBase} from '../../base/basic-scene.base';
import {Color3, Mesh, Sound, Vector3} from '@babylonjs/core';
import '@babylonjs/inspector';

import {Sun} from './sun';
import {SkyBox} from './sky-box';
import {Mercury} from './mercury';
import {Venus} from './venus';
import {Earth} from './earth';

export class SolarScene extends BasicSceneBase {
    private _sun: Mesh;
    private _skyBox: Mesh;
    private _mercury: Mesh;
    private _venus: Mesh;
    private _earth: Mesh;

    constructor() {
        super();

        this.showDebugger();

        this.setCameraState();
        this.addSkyBox();
        this.setLightPower();

        this.addSun();
        this.addMercury();
        this.addVenus();
        this.addEarth();
        // this.playSound();

    }

    showDebugger(): void {
        this.scene.debugLayer.show().then(() => {});
    }

    setLightPower(): void {
        this.light.diffuse = Color3.White();
    }

    setCameraState(): void {
        this.camera.position = new Vector3(20, 2, 0);
        this.camera.target = Vector3.Zero();
        this.camera.wheelPrecision = 300;

        this.camera.useAutoRotationBehavior = true;
    }

    playSound(): void {
        const music = new Sound(
            'glaxySound',
            './assets/sounds/galaxy.mp3',
            this.scene,
            null,
            {
                loop: true,
                autoplay: true
            }
        );
    }

    addSkyBox(): void {
        this._skyBox = SkyBox.Galaxy(this.scene);
    }

    addSun(): void {
        this._sun = Sun.New(this.scene, this.engine);
    }

    addMercury(): void {
        this._mercury = Mercury.New(this.scene, this.engine, 4);
    }

    addVenus(): void {
        this._venus = Venus.New(this.scene, this.engine, 8);
    }

    addEarth(): void {
        this._earth = Earth.New(this.scene, this.engine, 6);
    }
}
