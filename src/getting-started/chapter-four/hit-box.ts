import {BasicSceneBase} from "../../base/basic-scene.base";
import {
    AbstractMesh,
    Animation, ArcRotateCamera,
    Axis,
    Mesh,
    MeshBuilder,
    Nullable,
    SceneLoader,
    Space,
    StandardMaterial,
    Tools,
    Vector3
} from "@babylonjs/core";
import '@babylonjs/loaders';

export class HitBox extends BasicSceneBase {
    private _hitBox: Mesh;
    private _wireMat: StandardMaterial;

    private _car: Nullable<AbstractMesh>;
    private _animCar: Animation;
    private _carKeys = [];
    private _carReady: boolean;

    private _dude: any;

    private _track = [];

    constructor() {
        super();
        this.initTheScene();
        this.camera = new ArcRotateCamera(
            'camera',
            -Math.PI / 2.2, Math.PI / 2.2, 15,
            new Vector3(0, 0, 0), this.scene);
    }

    initTheScene(): void {
        this.createMaterial();
        this.buildHitBox();
        this.importCarMesh();
        this.importVillage();
        this.initTrack();
        this.importDude();
    }

    createMaterial(): void {
        this._wireMat = new StandardMaterial('wireMat', this.scene);
        this._wireMat.wireframe = true;
    }

    buildHitBox(): void {
        this._hitBox = MeshBuilder.CreateBox('zone-box', {
            width: .5,
            height: 4.5
        }, this.scene);

        this._hitBox.material = this._wireMat;
        this._hitBox.position.x = 3.1;
        this._hitBox.position.y = .3;
        this._hitBox.position.z = -5;

        this._carReady = false;
    }

    importCarMesh(): void {
        SceneLoader.ImportMeshAsync('',
            './assets/models/', 'car.glb', this.scene)
            .then(() => {
                this._car = this.scene.getMeshByName('car');
                this._carReady = true;

                this._car.rotation = new Vector3(Math.PI / 2, 0, -Math.PI / 2);
                this._car.position.y = .16;
                this._car.position.x = -3;
                this._car.position.z = 8;

                this.animateTheCar();
            });
    }

    animateTheCar(): void {
        this._animCar = new Animation('carAnimation', "position.z", 30,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

        this._carKeys = [];

        this._carKeys.push({
            frame: 0,
            value: 8
        });

        this._carKeys.push({
            frame: 150,
            value: -7
        });

        this._carKeys.push({
            frame: 200,
            value: -7
        });

        this._animCar.setKeys(this._carKeys);

        this._car.animations = [];
        this._car.animations.push(this._animCar);

        this.scene.beginAnimation(this._car, 0, 200, true);

        this.animateWheels();
    }

    animateWheels(): void {
        const wheelRB = this.scene.getMeshByName("wheelRB");
        const wheelRF = this.scene.getMeshByName("wheelRF");
        const wheelLB = this.scene.getMeshByName("wheelLB");
        const wheelLF = this.scene.getMeshByName("wheelLF");

        this.scene.beginAnimation(wheelRB, 0, 30, true);
        this.scene.beginAnimation(wheelRF, 0, 30, true);
        this.scene.beginAnimation(wheelLB, 0, 30, true);
        this.scene.beginAnimation(wheelLF, 0, 30, true);
    }

    importVillage(): void {
        SceneLoader.ImportMeshAsync('', './assets/models/', 'village.glb');
    }

    initTrack(): void {
        this._track.push(new walk(180, 2.5));
        this._track.push(new walk(0, 5));
    }

    importDude(): void {
        SceneLoader.ImportMeshAsync('dude',
            './assets/scenes/', 'Dude.babylon', this.scene)
            .then((result) => {
                this._dude = result.meshes[0];
                if (this._dude) {
                    this._dude.scaling = new Vector3(.008, .008, .008);

                    this._dude.position = new Vector3(1.5, 0, -6.9);
                    this._dude.rotate(Axis.Y, Tools.ToRadians(-90), Space.LOCAL);

                    const startRotation = this._dude.rotationQuaternion.clone();

                    this.scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

                    let distance = 0;
                    let step = .015;
                    let p = 0;

                    this.scene.onBeforeRenderObservable.add(() => {
                        if (this._carReady) {
                            if (!this._dude
                                    .getChildren()[1].intersectsMesh(this._hitBox) &&
                                this.scene.getMeshByName("car").intersectsMesh(this._hitBox)) {
                                return;
                            }

                        }
                        this._dude.movePOV(0, 0, step);
                        distance += step;

                        if (distance > this._track[p].dist) {

                            this._dude.rotate(Axis.Y, Tools.ToRadians(this._track[p].turn), Space.LOCAL);
                            p +=1;
                            p %= this._track.length;
                            if (p === 0) {
                                distance = 0;
                                this._dude.position = new Vector3(1.5, 0, -6.9);
                                this._dude.rotationQuaternion = startRotation.clone();
                            }
                        }

                    })
                } else {
                    console.log('Dude is missing', result);
                }
            });
    }
}

function walk(turn: number, dist: number): void {
    this.turn = turn;
    this.dist = dist;
}
