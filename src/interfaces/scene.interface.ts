import {
    Camera,
    DirectionalLight,
    HemisphericLight,
    Light,
    LightBlock,
    LightGizmo,
    PointLight,
    Scene, ShadowLight, SpotLight
} from '@babylonjs/core';

type Lights = Light | HemisphericLight | LightBlock
    | LightGizmo | DirectionalLight | PointLight | SpotLight
    | ShadowLight;

export interface IScene {
    scene: Scene;
    camera: Camera;
    light: Lights;
}
