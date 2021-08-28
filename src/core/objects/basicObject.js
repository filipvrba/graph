import { Dispatcher } from "../dispatcher.js";
import { NAME_SCENE } from '../constants.js'

class BasicObject extends Dispatcher {

    constructor() {

		super();

        this.id = undefined;
		this.parent = null;
		this.children = [];

    }

    add(object, id = undefined) {
		if (object === this) {
			console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
			return this;
		}

		if (object) {
			if (object.parent !== null) {
				object.parent.remove(object);
			}

			object.parent = this;

			if (object.id === undefined) object.id = id;

			this.children.push(object);

			if ( typeof object.updateGlobalPosition !== 'undefined' ) {

				object.updateGlobalPosition();

			}

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

    getScene() {

		let objectParent = this.parent;

		while (true) {

			if (objectParent == null) return this;
			if (objectParent.constructor.name == NAME_SCENE) return objectParent;

			objectParent = objectParent.parent;

		}

	}

	findChildren( id ) {

		for (let i = 0; i < this.children.length; i++) {

			if ( this.children[i].id === id ) {
				
				return this.children[i];

			}

		}

		return null;

	}

}

export { BasicObject };