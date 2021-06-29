import {
    Color3, Color4, Engine, Mesh,
    MeshBuilder, ParticleSystem, Scene, SphereParticleEmitter, StandardMaterial, Texture, Vector3
} from '@babylonjs/core';
import { LavaMaterial } from '@babylonjs/materials';

export class Sun {
    static New(scene: Scene, engine: Engine): Mesh {
        const sun = MeshBuilder.CreateSphere(
            'sun',
            { diameter: 4, segments: 64 },
            scene
        );

        Sun._particleSurface(scene, sun);

        engine.runRenderLoop(() => {
            sun.rotation.y += .005;
        });

        return sun;
    }

    private static _normalMaterial(scene: Scene): StandardMaterial {
        const sunMat = new StandardMaterial('sunMat', scene);
        sunMat.diffuseTexture = new Texture('./assets/textures/solar/sun/sun.jpg', scene);
        return sunMat;
    }

    private static _lavaMaterial(scene: Scene): LavaMaterial {
        const lavaMat = new LavaMaterial('lava', scene);
        lavaMat.noiseTexture = new Texture('./assets/textures/solar/sun/cloud.png', scene);
        lavaMat.diffuseTexture = new Texture('./assets/textures/solar/sun/lavatile.jpg', scene);

        lavaMat.speed = 1;
        lavaMat.fogColor = new Color3(1, 0.93, 0);
        lavaMat.maxSimultaneousLights = 1;
        lavaMat.movingSpeed = 0;

        return lavaMat;
    }

    private static _particleSurface(scene: Scene, coreSphere: Mesh): void {
        const surfaceParticles = new ParticleSystem(
            'surfaceParticles',
            3600,
            scene
        );

        surfaceParticles.particleTexture = new Texture(
            './assets/textures/solar/sun/T_SunSurface.png',
            scene
        );

        const coreMat = new StandardMaterial('coreMat', scene);
        coreMat.emissiveColor = new Color3(.3773, .0930, .0266);

        coreSphere.material = coreMat;

        // Pre-Warm
        surfaceParticles.preWarmStepOffset = 10;
        surfaceParticles.preWarmCycles = 100;

        // Initial rotation
        surfaceParticles.minInitialRotation = -2 * Math.PI;
        surfaceParticles.maxInitialRotation = 2 * Math.PI;

        // Where the sun particles come from
        const sunEmitter = new SphereParticleEmitter();
        sunEmitter.radius = 2.05;
        sunEmitter.radiusRange = 0; // emit only from shape surface

        // Assign particles to emitters
        surfaceParticles.emitter = coreSphere; // the starting object, the emitter
        surfaceParticles.particleEmitterType = sunEmitter;

        // Color gradient over time
        surfaceParticles.addColorGradient(0,
            new Color4(0.8509, 0.4784, 0.1019, 0.0));
        surfaceParticles.addColorGradient(0.4,
            new Color4(0.6259, 0.3056, 0.0619, 0.5));
        surfaceParticles.addColorGradient(0.5,
            new Color4(0.6039, 0.2887, 0.0579, 0.5));
        surfaceParticles.addColorGradient(1.0,
            new Color4(0.3207, 0.0713, 0.0075, 0.0));

        // Size of each particle, random between...
        surfaceParticles.minSize = .4;
        surfaceParticles.maxSize = .7;

        // Life time of each particle, random between...
        surfaceParticles.minLifeTime = 8.0;
        surfaceParticles.maxLifeTime = 8.0;

        // Emission rate
        surfaceParticles.emitRate = 600;

        // Blend mode: BLENDMODE_ONEONE, BLENDMODE_STANDARD, or BLENDMODE_ADD
        surfaceParticles.blendMode = ParticleSystem.BLENDMODE_ADD;

        // Set the gravity of all particles
        surfaceParticles.gravity = new Vector3(0, 0, 0);

        // Angular speed, in radians
        surfaceParticles.minAngularSpeed = -.4;
        surfaceParticles.maxAngularSpeed = .4;

        // Speed
        surfaceParticles.minEmitPower = 0;
        surfaceParticles.maxEmitPower = 0;
        surfaceParticles.updateSpeed = .005;

        // No billboard
        surfaceParticles.isBillboardBased = false;

        // Start the particle system
        surfaceParticles.start();
    }
}
