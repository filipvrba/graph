import { Vector2 } from "../engine.js";
import { Rendering } from "../rendering.js";

class Object2D extends Rendering {
    constructor() {
        super();
        this.position = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);

        this.id = 0;
        this.parent = null;
        this.children = [];
    }

    add(object) {
        if ( object === this ) {
			console.error( 'THREE.Object3D.add: object can\'t be added as a child of itself.', object );
			return this;
		}

        if (object) {
			if ( object.parent !== null ) {
				object.parent.remove( object );
			}

			object.parent = this;
			this.children.push( object );

		} else {
			console.error( 'THREE.Object3D.add: object not an instance of THREE.Object3D.', object );
		}

		return this;
    }

    remove(object) {
		const index = this.children.indexOf(object);
		if (index !== - 1) {
			object.parent = null;
			this.children.splice(index, 1);
		}

		return this;
	}
}

export { Object2D };