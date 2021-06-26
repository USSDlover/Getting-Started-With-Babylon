import {Engine, Mesh, MeshBuilder, Scene, StandardMaterial, Texture} from '@babylonjs/core';

export class Venus {
    static New(scene: Scene, engine: Engine): Mesh {
        const venus = MeshBuilder.CreateSphere(
            'venus',
            { segments: 12, diameter: .6 },
            scene
        );
        const venusMat = new StandardMaterial('venusMat', scene);
        venusMat.diffuseTexture = new Texture('./assets/textures/solar/venus.jpg', scene);
        venus.material = venusMat;
        let num = 0;
        engine.runRenderLoop(() => {
            venus.rotation.y -= .01;
            venus.position.x = Math.sin(num += .007) * 3;
            venus.position.z = Math.cos(num += .007) * 3;
        });

        return venus;
    }
}
