import { Dispatcher } from '../dispatcher.js';
import { Vector2 } from '../math/vector2.js';
import { NAME_SCENE } from '../constants.js'

class Object2D extends Dispatcher {

	#globalPosition;

	constructor() {
		super();
		this.position = new Vector2(0, 0);

		this.#globalPosition = new Vector2(0, 0);

		this.id = 0;
		this.parent = null;
		this.children = [];

		this.animations = [];
	}

	add(object) {
		if (object === this) {
			console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
			return this;
		}

		if (object) {
			if (object.parent !== null) {
				object.parent.remove(object);
			}

			object.parent = this;
			this.children.push(object);

			object.updateGlobalPosition();

			object.connect('added', object.ready);
			object.emitSignal({ type: 'added' });

		} else {
			console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
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

	get globalPosition() {

		this.updateGlobalPosition();

		return this.#globalPosition;

	}

	updateGlobalPosition() {

		if (this.parent === null) {

			this.#globalPosition = this.position.clone();
			return;

		}

		this.#globalPosition = this.parent.globalPosition.clone();
		this.#globalPosition.add( this.position );
	}

	getScene() {

		let objectParent = this.parent;

		while (true) {

			if (objectParent == null) return this;
			if (objectParent.constructor.name == NAME_SCENE) return objectParent;

			objectParent = objectParent.parent;

		}

	}

}

export { Object2D };