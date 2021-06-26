import {Color3, CubeTexture, Mesh, MeshBuilder, Scene, StandardMaterial, Texture} from '@babylonjs/core';

export class SkyBox {
    static Galaxy(scene: Scene): Mesh {
        const skyBox = MeshBuilder.CreateBox(
            'skyBox',
            {size: 10000.0},
            scene
        );
        const skyBoxMat = new StandardMaterial('skyBox', scene);
        skyBoxMat.backFaceCulling = false;
        skyBoxMat.reflectionTexture = new CubeTexture(
            './assets/skyBox/galaxy/',
            scene
        );
        skyBoxMat.reflectionTexture.coordinatesMode =
            Texture.SKYBOX_MODE;
        skyBoxMat.diffuseColor = new Color3(0, 0, 0);
        skyBoxMat.specularColor = new Color3(0, 0, 0);
        skyBox.material = skyBoxMat;

        return skyBox;
    }
}
