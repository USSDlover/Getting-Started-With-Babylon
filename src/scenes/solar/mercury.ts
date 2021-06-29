import {Engine, Mesh, MeshBuilder, Scene, StandardMaterial, Texture} from '@babylonjs/core';

export class Mercury {
    static New(scene: Scene, engine: Engine, distanceFromCore: number): Mesh {
        const mercury = MeshBuilder.CreateSphere(
            'mercury',
            { segments: 12, diameter: .5 },
            scene
        );
        const mercuryMat = new StandardMaterial('mercuryMat', scene);
        mercuryMat.diffuseTexture = new Texture('./assets/textures/solar/mercury.jpg', scene);
        mercury.material = mercuryMat;
        let num = 0;
        engine.runRenderLoop(() => {
            mercury.rotation.y -= .01;
            mercury.position.x = Math.sin(num += .005) * distanceFromCore;
            mercury.position.z = Math.cos(num += .005) * distanceFromCore;
        });

        return mercury;
    }
}
