import { Vector2 } from "../engine.js";
import { EventDispatcher } from "../eventdispatcher.js";
import { Transform2D } from "../math/transform2d.js";

class Object2D extends EventDispatcher {

	#position;

	#transform;
	#transformWorld;

    constructor() {
        super();

        this.#position = Vector2.ZERO;
		this.rotation = 0;
        this.scale = Vector2.ONE;

		this.#transform = new Transform2D( this.#position );

        this.id = 0;
        this.parent = null;
        this.children = [];
    }

	get getPosition() {

		if (this.parent === null) {

			return this.#transformWorld.origin;

		} else {

			return this.#transform.origin;

		}
	}

	setPosition( x, y ) {

		this.#position = new Vector2(x, y);

		this.#transform.setOrigin(this.#position);

		this.autoUpdatePosition();

	}

	autoUpdatePosition() {

		if (this.parent === null) {
			return;
		}

		this.#transformWorld = this.#transform.localToWorld(this.parent.#transform);

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

			object.dispatchEvent( 'added' );

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

			object.dispatchEvent( 'removed' );
		}

		return this;
	}
}

export { Object2D };