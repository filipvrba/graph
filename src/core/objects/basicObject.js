import { Dispatcher } from "../dispatcher.js";
import { NAME_SCENE } from '../constants.js'

class BasicObject extends Dispatcher {

    constructor() {

		super();
		
		this.id = undefined;
		this.parent = null;
		this.children = [];

    }

	// Add children
    add(object, id = undefined) {
		if (object === this) { 
			console.error('BasicObject.add: object can\'t be added as a child of itself.', object);
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

			object.connect('added', () => {

                object.ready();

                if ( id ) {

                    this.getScene().emitSignal({ type: 'ready', id });
                }
            });
			object.emitSignal({ type: 'added' });

			object.updateHandler = (signal) => {

				if ( typeof object.update !== 'undefined' ) {
					
					object.update( signal.dt );

				}

			}
			this.getScene().connect( 'update', object.updateHandler );

			object.drawHandler = (signal) => {

				if ( typeof object.draw !== 'undefined' ) {

					object.draw( signal.renderer );

				}

			}
			this.getScene().connect( 'draw', object.drawHandler );

			object.inputHandler = ( signal ) => {

				if ( typeof object.input !== 'undefined' ) {

					object.input( signal.mousePosition );

				}

			}

			this.getScene().input.connect( 'input', object.inputHandler );

		} else {
			console.error('BasicObject.add: object not an instance of BasicObject.', object);
		}

		return this;
	}

	// Remove children
	remove(object) {
		const index = this.children.indexOf(object);
		if (index !== - 1) {
			object.parent = null;
			this.children.splice(index, 1);
		}

		return this;
	}

	free() {

		if ( this.children.length > 0 ) {

			for ( let i = 0; i < this.children.length; i++ ) {

				// Free next children
				this.children[i].free();
				this.children[i].freeSignals();

			}

		} else {

			this.freeSignals();

		}
	}

	freeSignals() {

		if ( this.hasSignal( 'added', this.ready ) ) {

			this.disconect( 'added', this.ready );

		}

		if ( this.getScene().hasSignal( 'update', this.updateHandler ) ) {

			this.getScene().disconect( 'update', this.updateHandler );

		}

		if ( this.getScene().hasSignal( 'draw', this.drawHandler ) ) {

			this.getScene().disconect( 'draw', this.drawHandler );

		}

		if ( this.getScene().input.hasSignal( 'input', this.inputHandler ) ) {

			this.getScene().input.disconect( 'input', this.inputHandler )

		}

	}

    getScene() {

		let objectParent = this.parent;

		while (true) {

			if (objectParent == null) return this;

            const extendClass = Object.getPrototypeOf(
                Object.getPrototypeOf( objectParent )).constructor.name;
			if (objectParent.constructor.name === NAME_SCENE ||
                extendClass === NAME_SCENE) {

                return objectParent;
            }

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
// 1