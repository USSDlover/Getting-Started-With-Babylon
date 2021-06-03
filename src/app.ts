import {Village} from "./getting-started/chapter-two/village";
import {VillageSandbox} from "./getting-started/chapter-two/village.sandbox";
import {VillageBabylonGlb} from "./getting-started/chapter-two/village.babylon-glb";

class App {
    constructor() {
        const activeScene = new VillageBabylonGlb();
    }
}

new App();
