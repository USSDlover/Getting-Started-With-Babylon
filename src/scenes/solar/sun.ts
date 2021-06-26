import {
    Color3, Engine, Mesh,
    MeshBuilder, Scene, StandardMaterial, Texture
} from '@babylonjs/core';
import { LavaMaterial } from '@babylonjs/materials';

export class Sun {
    static New(scene: Scene, engine: Engine): Mesh {
        const sun = MeshBuilder.CreateSphere(
            'sun',
            { segments: 50, diameter: 170 },
            scene
        );

        sun.material = Sun._lavaMaterial(scene);

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
}
