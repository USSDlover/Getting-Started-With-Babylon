import {Engine, Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Tools} from '@babylonjs/core';

export class Earth {
    static New(scene: Scene, engine: Engine): Mesh {
        const earth = MeshBuilder.CreateSphere(
            'earth',
            { segments: 12, diameter: .7 },
            scene
        );
        const earthMat = new StandardMaterial('earthMat', scene);
        earthMat.diffuseTexture = new Texture('./assets/textures/solar/earth.jpg', scene);
        earth.material = earthMat;
        earth.rotation.z = Tools.ToRadians(180);

        let num = 0;
        engine.runRenderLoop(() => {
            earth.rotation.y -= .01;
            earth.position.z = Math.cos(num += .008) * 4;
            earth.position.x = Math.sin(num += .008) * 4;
        });
        return earth;
    }
}
