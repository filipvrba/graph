import { Vector2 } from '../math/vector2.js';
import { BasicObject } from './basicObject.js';

class Object2D extends BasicObject {

	#globalPosition;

	constructor() {

		super();

		this.position = new Vector2(0, 0);
		this.#globalPosition = new Vector2(0, 0);

		this.animations = [];
		
	}

	get globalPosition() {

		this.updateGlobalPosition();

		return this.#globalPosition;

	}

	set globalPosition( vector ) {

		this.#globalPosition = vector;

	}

	updateGlobalPosition() {

		if (this.parent === null) return;

		const addX = this.position.x + this.parent.#globalPosition.x;
		const addY = this.position.y + this.parent.#globalPosition.y;

		if ( this.#globalPosition.equals( addX, addY ) ) return;

		this.#globalPosition = this.parent.#globalPosition.clone();
		this.#globalPosition.add( this.position );

	}

	updateWorld() {

		if ( this.children.length > 0 ) {

			for ( let i = 0; i < this.children.length; i++ ) {

				if ( typeof this.children[i].updateGlobalPosition !== 'undefined' ) {

					this.children[i].updateGlobalPosition();
					this.children[i].updateWorld();

				}

			}

		} else {

			if ( typeof this.updateGlobalPosition !== 'undefined' ) {

				this.updateGlobalPosition();

			}

		}
    
    }

}

export { Object2D };
// 2