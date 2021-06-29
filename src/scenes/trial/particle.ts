import {BasicSceneBase} from '../../base/basic-scene.base';
import {MeshBuilder, ParticleHelper, ParticleSystem, Texture, Vector3} from '@babylonjs/core';

export class ParticleTest extends BasicSceneBase {
    constructor() {
        super();
        // this._minimalParticles();
        // this._defaultParticle();
        this._emitFromAMesh();
    }

    private _minimalParticles(): void {
        const myParticleSystem = new ParticleSystem(
            'particles',
            300,
            this.scene);

        myParticleSystem.particleTexture = new Texture('./assets/textures/flare.png', this.scene);

        myParticleSystem.emitter = Vector3.Zero();

        myParticleSystem.start();
    }

    private _defaultParticle(): void {
        ParticleHelper.CreateDefault(Vector3.Zero())
            .start();
    }

    private _emitFromAMesh(): void {
        const sphere = MeshBuilder.CreateSphere(
            'sphere',
            { segments: 12, diameter: 1 },
            this.scene
        );

        sphere.position = new Vector3(1, 2, 0);

        const myParticleSystem = new ParticleSystem(
            'particles',
            300,
            this.scene);

        myParticleSystem.particleTexture = new Texture('./assets/textures/flare.png', this.scene);

        myParticleSystem.emitter = sphere;

        myParticleSystem.start();
    }
}
