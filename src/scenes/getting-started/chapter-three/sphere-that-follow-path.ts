import {BasicSceneBase} from "../../../base/basic-scene.base";
import {Axis, MeshBuilder, Space, Vector3} from "@babylonjs/core";

export class SphereThatFollowPath extends BasicSceneBase {
    constructor() {
        super();
        this.action();
    }

    action(): void {
        const sphere = MeshBuilder.CreateSphere('sphere', {diameter: .25}, this.scene);
        sphere.position = new Vector3(2,0,2);

        const points = [];
        points.push(new Vector3(2, 0, 2));
        points.push(new Vector3(2, 0, -2));
        points.push(new Vector3(-2, 0, -2));
        points.push(points[0]);

        MeshBuilder.CreateLines('triangle', {points}, this.scene);

        const slide = function (turn, dist) {
            this.turn = turn;
            this.dist = dist;
        }

        const track = [];

        // First slide length 4
        track.push(new slide(Math.PI / 2, 4));
        // At finish of second side distance covered in 4 + 4
        track.push(new slide(3 * Math.PI / 4, 8));
        // All three sides cover the distance 4 + 4 + 4 * sqrt(2)
        track.push(new slide(3 * Math.PI / 4, 8 + 4 * Math.sqrt(2)));

        let distance = 0;
        let step = .05;
        let p = 0;

        this.scene.onBeforeRenderObservable.add(() => {
            sphere.movePOV(0, 0, step);
            distance += step;

            if (distance > track[p].dist) {
                sphere.rotate(Axis.Y, track[p].turn, Space.LOCAL);
                p += 1;
                p %= track.length;
                if (p === 0) {
                    distance = 0;
                    // Reset to initial conditions
                    sphere.position = new Vector3(2, 0, 2);
                    // Prevents error accumulation
                    sphere.rotation = Vector3.Zero();
                }
            }
        })
    }


}
