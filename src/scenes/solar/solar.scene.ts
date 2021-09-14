import {BasicSceneBase} from '../../base/basic-scene.base';
import {Color3, FlyCamera, FollowCamera, Mesh, SceneLoader, Sound, Tools, Vector3} from '@babylonjs/core';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';

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
    private _pointerLocked: boolean;
    private _airo: Mesh;
    private _flyCamera: FlyCamera;
    private _followCamera: FollowCamera;

    constructor() {
        super();

        // this.showDebugger();

        // this.removeOldCamera();
        this.setFlyCamera();

        // this.setCameraState();
        this.addSkyBox();
        this.setLightPower();

        this.addSun();
        this.addMercury();
        this.addVenus();
        this.addEarth();
        // this.playSound();

        this.requestPointerLock();
        this.listenToPointerLockChangeOnDocument();

        this.loadAiro();
    }

    showDebugger(): void {
        this.scene.debugLayer.show().then(() => {
        });
    }

    async loadAiro(): Promise<void> {
        const res = await SceneLoader
            .ImportMeshAsync('', './assets/models/', 'Airo.glb', this.scene)
            .catch(reason => {
                console.log('Error on load Airo, this is the reason:', reason);
            });
        this._airo = (res as any).meshes[0];
        this.playWithSpaceShip();
    }

    playWithSpaceShip(): void {
        // let pos = 2;
        // this.engine.runRenderLoop(() => {
        //     this._airo.lookAt(Vector3.Zero());
        //     const scale = .2;
        //     this._airo.scaling = new Vector3(scale, scale, scale);
        //     this._airo.rotation.z = 180;
        //     this._airo.position.x = Math.sin(pos += .008) * 10;
        //     this._airo.position.z = Math.cos(pos += .008) * 10;
        // });
    }

    setLightPower(): void {
        this.light.diffuse = Color3.White();
    }

    setFlyCamera(): void {
        this._flyCamera = new FlyCamera('flyCamera', new Vector3(20, 2, 0), this.scene);
        this._flyCamera.attachControl();
        this._flyCamera.target = Vector3.Zero();
        this._flyCamera.speed = .1;

        this._flyCamera.applyGravity = false;
        // this._flyCamera
        // this._flyCamera.inputs = new FlyCameraInputsManager(this._flyCamera);
        this._flyCamera.inputs.addKeyboard();

        this.scene.activeCamera = this._flyCamera;
    }

    requestPointerLock(): void {
        this.scene.onPointerDown = (event) => {
            if (!this._pointerLocked) {
                this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.msRequestPointerLock
                    || this.canvas.mozRequestPointerLock || this.canvas.webkitRequestPointerLock;
                if (this.canvas.requestPointerLock) {
                    this.canvas.requestPointerLock();
                }
            }
        };
    }

    onPointerLockChange(): void {
        // If the user is already locked
        this._pointerLocked = (document as any).mozPointerLockElement ||
            (document as any).webkitPointerLockElement ||
            (document as any).msPointerLockElement ||
            document.pointerLockElement || null;
    }

    listenToPointerLockChangeOnDocument(): void {
        document.addEventListener('pointerlockchange', this.onPointerLockChange, false);
        document.addEventListener('mspointerlockchange', this.onPointerLockChange, false);
        document.addEventListener('mozpointerlockchange', this.onPointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', this.onPointerLockChange, false);
    }

    removeOldCamera(): void {
        this.scene.removeCamera(this.camera);
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
