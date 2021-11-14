/**
 * Module Description
 *
 * @version 21.a1114
 * @date 2021
 * @author Filip Vrba
 * @remarks This file is autogenerated.
 * @github https://github.com/filipvrba/graph 
 */

class Dispatcher {

    #signals;

    constructor() {

        this.#signals = undefined;

    }

    connect( type, signal ) {

        if ( this.#signals === undefined ) {

            this.#signals = {};

        }

        const signals = this.#signals;

        if ( signals[type] === undefined ) {

            signals[type] = [];

        }

        if ( signals[type].indexOf(signal) === -1 ) {

            signals[type].push(signal);

        }

    }

    disconect( type, signal ) {

        if (this.#signals === undefined) return;

        const signals = this.#signals;
        const signalArray = signals[type];

        if ( signalArray !== undefined ) {

            const index = signalArray.indexOf(signal);

            if ( index !== -1 ) {

                signalArray.splice(index, 1);

            }
            
        }

    }

    hasSignal( type, listener ) {

		if ( this.#signals === undefined ) return false;

		const listeners = this.#signals;

		return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

	}

    emitSignal( signal ) {

        if (this.#signals === undefined) return;

        const signals = this.#signals;
        const signalArray = signals[signal.type];

        if (signalArray !== undefined) {

            signal.target = this;

            if ( signal.type === 'added' && typeof signal.target.ready === 'undefined' ) {

                return;

            }

            const array = signalArray.slice(0);

            for (let i = 0, l = array.length; i < l; i++) {

                array[i].call(this, signal);

            }

            signal.target = null;

        }
    }
    
}

// 0
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

                    this.getScene( true ).emitSignal({ type: 'ready', id });
                }
            });
			object.emitSignal({ type: 'added' });

			object.updateHandler = (signal) => {

				if ( typeof object.update !== 'undefined' ) {
					
					object.update( signal.dt );

				}

			}
			this.getScene( true ).connect( 'update', object.updateHandler );

			object.drawHandler = (signal) => {

				if ( typeof object.draw !== 'undefined' ) {

					object.draw( signal.renderer );

				}

			}
			this.getScene( true ).connect( 'draw', object.drawHandler );

			object.inputHandler = ( signal ) => {

				if ( typeof object.input !== 'undefined' ) {

					object.input( signal.mousePosition );

				}

			}

			this.getScene( true ).connect( 'input', object.inputHandler );

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

		if ( this.getScene( true ).hasSignal( 'update', this.updateHandler ) ) {

			this.getScene( true ).disconect( 'update', this.updateHandler );

		}

		if ( this.getScene( true ).hasSignal( 'draw', this.drawHandler ) ) {

			this.getScene( true ).disconect( 'draw', this.drawHandler );

		}

		if ( this.getScene( true ).hasSignal( 'input', this.inputHandler ) ) {

			this.getScene( true ).disconect( 'input', this.inputHandler )

		}

	}

	getScene( isRoot = false ) {

        let scene = this;
        let parent = scene.parent;

        while( true ) {

            if ( isRoot ) {

                if ( parent === null ) break;
                
            } else {

                const extendClass = Object.getPrototypeOf(
                    Object.getPrototypeOf( parent )).constructor.name;

                if ( parent.constructor.name === NAME_SCENE ||
                    extendClass === NAME_SCENE ) {

                    scene = parent;
                    break;
                }
            }
            
            scene = parent;
            parent = scene.parent;
        }

        return scene;
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

// 1
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

// 2
class Label extends Object2D {

    constructor( text ) {

        super();

        this.text = text;
        this.scene = null;
        this.colorLabel = 'black';

        this.fontSpaceWidth = 20;

    }

    ready() {

        this.scene = this.getScene();

        this.createAnimation();

        // Add the select component to the scene tree
        this.selectComp = new SelectCompoment( this.widthRadius, 5 );
        this.add( this.selectComp, 'selectComponent' );

        this.fontSize = this.widthRadius;
        this.widthRadius = 0;

        this.animFinisHandler = ( ) => {

            this.parent.emitSignal( { type: 'animFinish', id: this.id } );

        }

        this.animationPlayer.connect( 'animFinish', this.animFinisHandler );
    }

    createAnimation() {

        this.animationPlayer = new AnimationPlayer();
        this.add( this.animationPlayer );

        // Start
        let animation = new Animation();
        let trackID = animation.addTrack( 'position.x' );
        animation.addInsertKey(trackID, 0, this.position.x);
        animation.addInsertKey(trackID, 0.2, 0 );

        trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, 0);
        animation.addInsertKey(trackID, 0.2, this.widthRadius );

        this.animationPlayer.addAnimation('start', animation);

        // End
        animation = new Animation();
        trackID = animation.addTrack( 'position.x' );
        animation.addInsertKey(trackID, 0, 0);
        animation.addInsertKey(trackID, 0.2, this.position.x );

        trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, this.widthRadius);
        animation.addInsertKey(trackID, 0.2, 0 );

        this.animationPlayer.addAnimation('end', animation);

    }

    start() {

        this.animationPlayer.play('start');

    }

    end() {

        this.animationPlayer.play( 'end' );

    }

    fontStyle( size ) {

        return `bold ${ Math.abs( size) * 3 }px Arial`;

    }

    draw( renderer = new CanvasRenderingContext2D() ) {

        renderer.arc(this.globalPosition.x, this.globalPosition.y, Math.abs( this.widthRadius ),
            0, Math.PI * 2);
        renderer.fillStyle = this.colorStyle;
        renderer.fill();

        renderer.fillStyle = this.colorLabel;
        renderer.font = this.fontStyle( this.widthRadius >= this.fontSize ? this.fontSize : this.widthRadius );
        renderer.fillText(this.text, this.globalPosition.x + this.fontSpaceWidth, this.globalPosition.y + 7);
    }

    free() {

        super.free();

        this.animationPlayer.disconect( 'animFinish', this.animFinisHandler );

    }

}


class List extends Object2D {

    constructor( length, space ) {

        super();

        this.labelWidthRadius = 10;
        this.length = length;
        this.space = space;

        this.circleWidth = this.labelWidthRadius * 2;
        this.height = ( this.circleWidth * this.length ) / 2;

    }

    ready( ) {

        const degWidth = Mathf.per2deg( this.parent.widthRadius );
        const radWidth = Mathf.radians( degWidth );
        this.labelWidthRadius = radWidth;

        this.visibleHandler = ( signal ) => {

            this.findChildren( signal.id ).start();

            if ( signal.id === 0 ) {

                this.move();

            }

        }
        this.parent.connect( 'visible', this.visibleHandler );

        this.hiddeHandler = ( signal ) => {

            if ( signal.id === this.length - 1 ) {

                this.close();

            }

            this.findChildren( signal.id ).end();

        }
        this.parent.connect( 'hidde', this.hiddeHandler );

        this.createAnimation();

        this.pieces = this.parent.findChildren( 'pieces' );

        this.pieceEnteredHandler = ( signal ) => this.pieceEntered( signal.piece );
        this.pieces.connect( 'pieceEntered', this.pieceEnteredHandler );

        this.pieceExitedHandler = ( signal ) => this.pieceExited( signal.piece );
        this.pieces.connect( 'pieceExited', this.pieceExitedHandler );

    }

    free() {

        super.free();

        this.parent.disconect( 'visible', this.visibleHandler );
        this.pieces.disconect( 'pieceEntered', this.pieceEnteredHandler );
        this.pieces.disconect( 'pieceExited', this.pieceExitedHandler );

    }

    pieceEntered( piece ) {

        const label = this.findChildren( piece.id );
        const selectComp = label.findChildren( 'selectComponent' );

        selectComp.on();

    }

    pieceExited( piece ) {

        const label = this.findChildren( piece.id );
        const selectComp = label.findChildren( 'selectComponent' );

        selectComp.off();

    }

    createAnimation() {

        this.animationPlayer = new AnimationPlayer();
        this.add( this.animationPlayer );

        // Move
        let animation = new Animation();
        let trackID = animation.addTrack( 'position.y' );
        animation.addInsertKey(trackID, 0, this.position.y);
        animation.addInsertKey(trackID, this.length * 0.2, -this.height);

        this.animationPlayer.addAnimation('move', animation);

        // Close
        animation = new Animation();
        trackID = animation.addTrack( 'position.y' );
        animation.addInsertKey(trackID, 0, -this.height);
        animation.addInsertKey(trackID, this.length * 0.2, this.position.y);

        this.animationPlayer.addAnimation('close', animation);

    }

    move() {

        this.animationPlayer.play( 'move' );

    }

    close() {

        this.animationPlayer.play( 'close' );

    }

    update( dt ) {

        if ( !this.animationPlayer.playbackActive ) return;

        this.updateGlobalPosition();

    }

    createLabel( values ) {

        const label = new Label( values.text );
        label.id = values.id;
        label.widthRadius = this.labelWidthRadius;
        label.position = new Vector2( this.parent.widthRadius,
            (this.circleWidth + this.space) * values.id );
        label.colorStyle = values.color;

        if ( values.colorLabel !== '' ) {

            label.colorLabel = values.colorLabel;
        }

        this.add( label );

    }

}


class Piece extends Object2D {

    constructor( startRadian, endRadian ) {

        super();

        this.startRadian = startRadian;
        this.endRadian = endRadian;

        this.values = { };

        this.scene = null;

        this.collision = new Collision();

    }

    ready() {

        this.scene = this.getScene();
        this.colorStyle = this.values.color;

        this.createAnimation();

        this.animFinishHandler = ( signal ) => {

            switch( signal.name ) {

                case 'start':
                    this.parent.emitSignal( { type: 'animFinish', id: this.id } );
                    break;
                case 'end':
                    this.parent.emitSignal( { type: 'animFinishEnd', id: this.id } );
                    break;

            }

        }
        this.animationPlayer.connect( 'animFinish', this.animFinishHandler );

        this.add( this.collision );

        this.selectComp = new SelectCompoment( this.values.widthRadius );
        this.add( this.selectComp );
        
        this.mouseEnteredHandler = () => this.mouseEntered();
        this.collision.connect( 'mouseEntered', this.mouseEnteredHandler );

        this.mouseExitedHandler = () => this.mouseExited();
        this.collision.connect( 'mouseExited', this.mouseExitedHandler );

    }

    free() {

        super.free();
        
        this.animationPlayer.disconect( 'animFinish', this.animFinishHandler );
        this.collision.disconect( 'mouseEntered', this.mouseEnteredHandler );
        this.collision.disconect( 'mouseExited', this.mouseExitedHandler );

    }

    mouseEntered() {

        if ( !this.parent.parent.isScaletable ) return;

        this.selectComp.on()

        this.parent.emitSignal( { type: 'pieceEntered', piece: this } );

    }

    mouseExited() {

        if ( !this.parent.parent.isScaletable ) return;

        this.selectComp.off()

        this.parent.emitSignal( { type: 'pieceExited', piece: this } );

    }

    createAnimation() {

        this.animationPlayer = new AnimationPlayer();
        this.add( this.animationPlayer );

        // Start
        let animation = new Animation();
        let trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, 0);
        animation.addInsertKey(trackID, 0.2, this.values.widthRadius);

        trackID = animation.addTrack( 'endRadian' );
        animation.addInsertKey(trackID, 0, this.startRadian);
        animation.addInsertKey(trackID, 0.1, this.endRadian);
        
        this.animationPlayer.addAnimation('start', animation);

        // End
        animation = new Animation();
        trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, this.values.widthRadius);
        animation.addInsertKey(trackID, 0.2, 0 );

        trackID = animation.addTrack( 'endRadian' );
        animation.addInsertKey(trackID, 0, this.endRadian);
        animation.addInsertKey(trackID, 0.1, this.startRadian);
        
        this.animationPlayer.addAnimation('end', animation);

    }

    start() {

        this.animationPlayer.play('start');

    }

    end() {

        this.animationPlayer.play( 'end' );

    }

    draw( renderer ) {

        renderer.beginPath();
        
        renderer.arc(this.globalPosition.x, this.globalPosition.y,
            Math.abs( this.widthRadius ),
        this.startRadian, this.endRadian, false);
        renderer.lineTo(this.globalPosition.x, this.globalPosition.y);

        renderer.closePath();

        renderer.fillStyle = this.colorStyle;
        renderer.fill();

    }

}


class PieChart extends Object2D {

    constructor(pieArray) {

        super();

        this.pieArray = pieArray;

        this.startRadian = 0;
        this.endDegrees = 0;
        this.widthRadius = 0;
        this.isScaletable = false;
        this.colorLabel = '';

        this.totalValue = this.countTotalValue();

        this.colorStart = new Color( { r: 0, g: 63, b: 92 } );
        this.colorEnd = new Color( { r: 255, g: 166, b: 0 } );

    }

    ready() {

        this.pieces = new Object2D();
        this.list = new List( this.pieArray.length, 13 );
        this.list.position.x = this.widthRadius + 30;

        this.scene = this.getScene();

        this.add(this.pieces, 'pieces');
        this.add(this.list);

        this.animFinishHandler = (signal) => {
            this.animFinish( signal.id );
        }
        this.pieces.connect( 'animFinish', this.animFinishHandler );

        this.animFinishEndHandler = (signal) => {
            this.animFinishEnd( signal.id );
        }
        this.pieces.connect( 'animFinishEnd', this.animFinishEndHandler );

        this.createPie();

    }

    free() {

        super.free();
        
        this.pieces.disconect( 'animFinish', this.animFinishHandler );
        this.pieces.disconect( 'animFinishEnd', this.animFinishEndHandler );

    }

    /**
     * Finished animation from piece animation component.
     * @param {Object id for identification piece} id 
     */
    animFinish( id ) {

        // Go start animation for piece
        if (id + 1 < this.pieArray.length) {

            this.visiblePiece( id + 1 );

        }
        
        if ( id + 1 === this.pieArray.length ) {

            this.isScaletable = true;
            
        }

    }

    animFinishEnd( id ) {

        // Go start animation for piece
        if ( id - 1 === -1 ) {

            this.emitSignal( { type: 'hidden' } );

        } else if (id - 1 >= 0) {

            this.hiddePiece( id - 1 );

        }

    }

    createPie() {

        const piecesLength = this.pieArray.length - 1;

        // Look on the list and write defined values for pieces.
        for (let i = 0; i <= piecesLength; i++) {

            // Calculate angles
            const angleValues = this.pieceAngleValues(i);

            // Gradient color
            let alpha = i / piecesLength;
            if ( !alpha )
                alpha = 0;

            let color = this.colorStart.lerp( this.colorEnd, alpha );
            color = color.toString();

            this.createPiece({
                id: i,
                angles: angleValues,
                pieceValue: this.pieArray[i],
                color: color
            });

            this.list.createLabel( {
                
                id: i,
                text: `${ this.pieArray[ i ].name } (${ this.pieArray[i].value })`,
                color: color,
                colorLabel: this.colorLabel

            });

            // For loop is added values, that true calculate angles.
            this.addRadDeg(angleValues);

        }

        // Let's go play animation
        if (this.pieces.children.length > 0) {

            this.visiblePiece( 0 );

        }

    }

    visiblePiece( id ) {

        this.pieces.children[ id ].start();

        this.emitSignal( { type: 'visible', id: id } );

    }

    hiddePiece( id ) {

        this.isScaletable = false;

        this.pieces.children[ id ].end();
        this.emitSignal( { type: 'hidde', id: id } );

    }

    addRadDeg(values) {

        this.startRadian = values.endRadian;
        this.endDegrees += values.degrees;

    }

    pieceAngleValues( idPiece ) {

        const percentage = Mathf.percentage(parseInt(this.pieArray[idPiece].value), this.totalValue);
        const degrees = Mathf.per2deg(percentage);
        const endRadian = Mathf.radians(degrees + this.endDegrees);

        return {
            percentage: percentage,
            degrees: degrees,
            endRadian: endRadian
        };

    }

    createPiece(values) {

        const piece = new Piece(this.startRadian, values.angles.endRadian);
        piece.id = values.id;

        piece.values = values.pieceValue;
        piece.values['widthRadius'] = this.widthRadius;
        piece.values['angles'] = values.angles;
        piece.values[ 'color' ] = values.color;

        // Add all the objects for the scene identity
        this.pieces.add(piece);
    
    }

    countTotalValue() {

        let value = 0;
        for (let i = 0; i < this.pieArray.length; i++) {

            value += parseInt(this.pieArray[i].value);

        }

        return value;
    }
}


class SelectCompoment extends BasicObject {

    constructor( widthRadius, maxRad = 10 ) {

        super();

        this.maxRad = maxRad;
        this.widthRadius = widthRadius;

    }
    
    ready() {

        this.animationPlayer = this.parent.animationPlayer;

        this.createAnimation();

    }

    createAnimation() {

        const parentRad = this.widthRadius;
        const time = 0.1;

        let animation = new Animation();
        let trackID = animation.addTrack( 'widthRadius' );

        // On select animation
        animation.addInsertKey(trackID, 0, parentRad);
        animation.addInsertKey(trackID, time, parentRad + this.maxRad);

        this.animationPlayer.addAnimation('onSelect', animation);

        // Off select animation
        animation = new Animation();
        trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, parentRad + this.maxRad);
        animation.addInsertKey(trackID, time, parentRad);

        this.animationPlayer.addAnimation('offSelect', animation);
    }

    on() {

        this.animationPlayer.play( 'onSelect' );

    }

    off() {

        this.animationPlayer.play( 'offSelect' );

    }

}

const NAME_SCENE = 'Scene';

const PROCESS = 0;
const STOP = 1;
const SUM = 2;
class TDRenderer {

    constructor( canvas ) {

        this.canvas = canvas;
        this.clock = new Clock();

    }

    setSize( width, height ) {

        this.canvas.width = width
        this.canvas.height = height;

    }

    get renderer() {

        return this.canvas.getContext( '2d' );

    }

    render( scene ) {

        this.renderer.clearRect( 0, 0, this.canvas.width,
            this.canvas.height );

        scene.emitSignal( { type: 'draw', renderer: this.renderer } );
        scene.emitSignal( { type: 'update', dt: this.clock.getDT() } );

    }

}


class Input extends BasicObject {

    constructor() {

        super();

        this.position = new Vector2( 0, 0 );

        this.mouseMoveHandler = ( event ) => this.mouseMove( event );

    }

    ready() {

        document.addEventListener( 'mousemove', this.mouseMoveHandler );

    }

    draw( renderer ) {

        this.canvasRect = renderer.canvas.getBoundingClientRect();

    }

    mouseMove( event ) {

        this.position.x = event.x - this.canvasRect.left;
        this.position.y = event.y - this.canvasRect.top;

        this.parent.emitSignal( { type: 'input', mousePosition: this.position } );

    }

    free() {

        super.free();
        
        document.removeEventListener( 'mousemove', this.mouseMoveHandler );

    }

}


class Collision extends BasicObject {

    constructor() {

        super();

        this.inputPickable = false;

    }

    input( mousePos ) {

        if ( !this.inputPickable && this.isCollide( mousePos ) ) {

            this.mouseEntered();
            this.inputPickable = true;

        } else if ( this.inputPickable && !this.isCollide( mousePos ) ) {

            this.mouseExited();
            this.inputPickable = false;
        
        }

    }

    mouseEntered() {
        
        this.emitSignal( { type: 'mouseEntered' } );

    }

    mouseExited() {

        this.emitSignal( { type: 'mouseExited' } );

    }

    isCollide( mousePos ) {

        const distanceRoot = mousePos.distanceTo( this.parent.globalPosition );

        if ( distanceRoot <= this.parent.values.widthRadius ) {

            const mousePosition = mousePos.clone();
            const direction = mousePosition.sub( this.parent.globalPosition );
            const radian = Math.atan2( -direction.y, -direction.x ) + Math.PI;

            return radian >= this.parent.startRadian && radian <= this.parent.endRadian;

        }

    }

}

class Vector2 {

	constructor( x = 0, y = 0 ) {

		this.x = x;
		this.y = y;

	}

	length() {

		const x = this.x;
		const y = this.y;

		return Math.sqrt(x * x + y * y);

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	}

	normalize() {

		let x = this.x;
		let y = this.y;

		let l = x * x + y * y;

		
		
		if (l !== 0) {

			l = Math.sqrt( l );
			this.x /= l;
			this.y /= l;

		}

		return this;

	}

	normalized() {

		const v = this.clone();
		v.normalize();

		return v;

	}

	multiply( vector ) {

		this.x *= vector.x;
		this.y *= vector.y;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;

		return this;

	}

	clone() {

		return new this.constructor( this.x, this.y );

	}

	add( vector ) {

		this.x += vector.x;
		this.y += vector.y;

		return this;

	}

	equals( x, y ) {

		return ( ( x === this.x ) && ( y === this.y ) );

	}

	distanceTo( vector ) {

		return Math.sqrt( this.distanceToSquared( vector ) );

	}

	distanceToSquared( v ) {

		const dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y;

	}

	sub( v ) {

		this.x -= v.x;
		this.y -= v.y;

		return this;

	}

	subScalar( scalar ) {

		this.x -= scalar;
		this.y -= scalar;

		return this;

	}
}


class Mathf {
    static radians(degrees) {
        return degrees * Math.PI / 180;
    }

    static degrees(radians) {

        return radians * 180 / Math.PI;

    }

    static per2deg(percentage) {
        return (percentage / 100) * 360;
    }

    static percentage(min, max) {
        return (100 * min) / max;
    }

    static lerp(value1, value2, alpha) {

		return( value2 - value1 ) * alpha;
	}

    static lerp2( a, b, t ) {

		return a + ( b - a ) * t;

	}

    static radianToVector( radian ) {

        return new Vector2( Math.cos( radian ), Math.sin( radian ) );

	}
}

class Color {

    constructor( rgb ) {

        if ( !rgb ) {

            /**
             * Colors palette - ZUGHY 32
             * https://lospec.com/palette-list/zughy-32
             */
            this.colors = [
                '#472d3c',
                '#5e3643',
                '#7a444a',
                '#a05b53',
                '#bf7958',
                '#eea160',
                '#f4cca1',
                '#b6d53c',
                '#71aa34',
                '#397b44',
                '#3c5956',
                '#302c2e',
                '#5a5353',
                '#7d7071',
                '#a0938e',
                '#cfc6b8',
                '#dff6f5',
                '#8aebf1',
                '#28ccdf',
                '#3978a8',
                '#394778',
                '#39314b',
                '#564064',
                '#8e478c',
                '#cd6093',
                '#ffaeb6',
                '#f4b41b',
                '#f47e1b',
                '#e6482e',
                '#a93b3b',
                '#827094',
                '#4f546b'
            ];

            this.bitMask = 0;

        } else {

            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;

        }

    }

    lerp( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	}

    getRandomPalettte() {

        const idRandom = Math.floor( Math.random() * this.colors.length );
        const idMask = 2 ** idRandom;

        if ( ( this.bitMask & idMask ) !== 0 ) {

            return this.getRandomPalettte();

        } 

        this.bitMask |= idMask;

        return this.colors[ idRandom ];

    }

    toString() {

        return `rgb(${ this.r }, ${ this.g }, ${ this.b })`;

    }

    static ranColorStyle() {

        return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    }

}

class Clock {
    #time;

    constructor() {
        this.#time = Date.now();
    }

    getDT() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.#time) / 1000;
        this.#time = currentTime;
        return deltaTime;
    }
}


class Scene extends Object2D {

    constructor() {
        
        super();
    }

    ready() {

        if ( !this.parent ) {

            this.globalPosition = this.position;
            
            const input = new Input();
            this.add( input );
        }
    }
}


class AnimationPlayer extends BasicObject {

    constructor() {

        super();

        this.animations = new Map();

        this.defaultValues();

    }

    defaultValues() {

        this.valuesMask = new Array();
        this.animation = new Map();
        this.historyAnim = { };  // no called

        this.time = 0;
        this.lastTime = 0;  // no called
        this.playbackActive = false;
        this.valueZERO = null;  // no called
        this.currentAnimation = null;  // The name of the currently playing animation.
        
    }

    update( dt ) {

        if ( ! this.playbackActive ) return;

        this.time += dt;

        let attributeID = 0;
        this.animation.tracks.forEach( ( attributeValues, attributeName ) => {

            this.updateAnimation( dt, { values: attributeValues,
                name: attributeName, id: attributeID } );

            attributeID++;

        });

        if ( this.isAnimFinish( ) ) {

            this.animationFinished();

        }

    }

    animationFinished() {

        this.emitSignal( { type: "animFinish", name: this.currentAnimation } );

        this.defaultValues();

    }

    isAnimFinish( ) {

        let sum = 0;
        let stop = 0;
        for ( let i = 0; i < this.valuesMask[ SUM ].length; i++ ) {

            sum += this.valuesMask[ SUM ][ i ];
            stop += this.valuesMask[ STOP ][ i ];

        }

        return sum === stop;

    }

    updateAnimation( dt, object ) {

        let valueID = 0;
        object.values.forEach( ( value, time ) => {

            this.updateAnimValue( dt, { attribute: object, values: { 
                value: value,
                time: time,
                id: valueID
            } } );
            
            valueID++;

        });

    }

    updateAnimValue( dt, object ) {

        if ( ( this.valuesMask[ PROCESS ][ object.attribute.id ] & this.getUniqueID( object ) ) !== 0 && 
            ( this.valuesMask[ STOP ][ object.attribute.id ] & this.getUniqueID( object ) ) === 0 ) {

            this.processAnim( dt, object );

        }

        this.defStopAnim( object );

    }

    processAnim( dt, object ) {

        const arrayAttributeValues = Array.from( this.animation.tracks.get( object.attribute.name ) );
        const lastValues = arrayAttributeValues[ object.values.id - 1 ];

        const time = ( object.values.value - lastValues[ 1 ] ) / ( object.values.time - lastValues[ 0 ] ) * dt;

        const applyString = `this.parent.${ object.attribute.name } += ${ time };`;
        eval( applyString );

    }

    defStopAnim( object ) {

        if ( this.time >= object.values.time &&
            ( this.valuesMask[ STOP ][ object.attribute.id ] & this.getUniqueID( object ) ) === 0 ) {

            const applyString = `this.parent.${ object.attribute.name } = ${ object.values.value };`;
            eval( applyString );

            this.valuesMask[ STOP ][ object.attribute.id ] |= this.getUniqueID( object );
            this.valuesMask[ PROCESS ][ object.attribute.id ] |= this.getUniqueID( object, 1 );

        }

    }

    getUniqueID( object, add = 0 ) {

        return 2 ** ( object.attribute.id + object.values.id + add );

    }

    addAnimation( name, animation ) {

        this.animations.set( name, animation );

    }

    play( name ) {

        if ( ! this.animations.has(name) ) return;

        this.currentAnimation = name;
        this.animation = this.animations.get(name);

        // Define BitMask on values for attribute
        // 0 - Process
        // 1 - Stop
        // 2 - Sum
        this.valuesMask = new Array( 3 );

        for ( let i = 0; i < this.valuesMask.length; i++ ) {

            this.valuesMask[ i ] = new Array( this.animation.tracks.size );

        }

        this.defStartAnim();

        // Play update function
        this.playbackActive = true;

    }

    defStartAnim() {

        let attributeID = 0;
        this.animation.tracks.forEach( ( attributeValues ) => {

            let valuesID = 0;
            attributeValues.forEach( ( values ) => {

                const object = { attribute: { id: attributeID }, values: { id: valuesID } };
                this.valuesMask[ SUM ][ attributeID ] |= this.getUniqueID( object );

                valuesID++;

            });
           

            attributeID++;

        });

    }

    stop( reset = true ) {

        this.defaultValues();

    }

}

class Animation {

    constructor() {

        this.tracks = new Map();

    }

    addTrack( objectAttribute ) {

        this.tracks.set( objectAttribute, new Map() );

        return objectAttribute;

    }

    addInsertKey( id, time, key ) {

        this.tracks.get(id).set( time, key );

    }

}


class PieChartElement extends HTMLElement {

    constructor() {

        super();

        this.removeHandler = () => { this.remove() };
        this.hiddeHandler = () => { this.hidden() };
        this.isReadyHandler = () => { this.isReady() };
        this.resizeHandler = () => this.resize();

        this.initRoot();
        this.initRenderer();
        
        this.scene = new Scene();
        this.scene.ready();

    }

    get data() {

        let data = this.getAttribute( 'data' );

        if ( data === null ) {

            throw 'Please implement to component a atribute data="".\nFormatted attribute must be string and representing json.';

        }

        // Convert string (json) to object
        data = JSON.parse( data )

        return data;

    }

    get widthRadius() {

        return parseInt( this.getAttribute( 'widthRadius' ) );

    }

    get colorLabel() {

        let color = this.getAttribute( 'colorLabel' );
        
        if ( color === null ) {

            color = '';
        }

        return color;
    }

    get globalPosition() {

        return new Vector2( (this.renderer.canvas.width / 2 ) - this.widthRadius / 2,
        this.renderer.canvas.height / 2 );
    
    }

    resize() {

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.pieChart.position = this.globalPosition;
        this.scene.updateWorld();

    }

    initRoot() {

        const template = document.createElement( 'template' );
        template.innerHTML = `
            <style type="text/css">
                canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    outline: none;
                    z-index: -1;
                }
            </style>

            <canvas></canvas>
        `;
        
        this.attachShadow( { mode: 'open' } );
        this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    }

    initRenderer() {

        const canvas = this.shadowRoot.querySelector( 'canvas' );

        this.renderer = new TDRenderer( canvas );
        this.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    initPieChart() {

        this.pieChart = new PieChart( this.data );  // There implement object values
        this.pieChart.position = this.globalPosition;
        this.pieChart.widthRadius = this.widthRadius;
        this.pieChart.colorLabel = this.colorLabel;

        this.scene.add( this.pieChart );

    }

    tick() {

        this.renderer.render( this.scene );

        requestAnimationFrame( () => this.tick() );

    }

    remove() {

        const index = this.pieChart.pieces.children.length - 1;
        this.pieChart.hiddePiece( index )

    }

    hidden() {

        const removeInnerEvent = new CustomEvent( 'removeInner');
        document.dispatchEvent( removeInnerEvent );

    }

    isReady() {

        const isReadyEvent = new CustomEvent( 'isReadyBack', {

            detail: this.pieChart.isScaletable

        });
        document.dispatchEvent( isReadyEvent );

    }

    connectedCallback() {

        this.initPieChart();
        this.tick();

        window.addEventListener( 'resize', this.resizeHandler );
        document.addEventListener( 'remove', this.removeHandler );
        document.addEventListener( 'isReadyC', this.isReadyHandler );

        this.pieChart.connect( 'hidden', this.hiddeHandler );

    }

    disconnectedCallback() {

        this.scene.free();
        
        window.removeEventListener( 'resize', this.resizeHandler );
        document.removeEventListener( 'remove', this.removeHandler );
        document.removeEventListener( 'isReadyC', this.isReadyHandler );

    }

}

window.customElements.define( 'pie-chart', PieChartElement );