import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {
    ArcRotateCamera,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    Vector3
} from "@babylonjs/core";
import {EngineBase} from "../base/engine.base";

export class BoxScene extends EngineBase {
    constructor() {
        super();
        const scene = new Scene(this.engine);

        const camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(this.canvas, true);
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        // const sphere: Mesh = MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
        const rectAngle: Mesh = MeshBuilder.CreateBox("box", {height: .5, width: .5, depth: 1}, scene);

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        this.engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
