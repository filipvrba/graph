import { PROCESS, STOP, SUM } from "../../constants.js";
import { Mathf } from "../../math/mathf.js";
import { BasicObject } from "../basicObject.js";

class AnimationPlayer extends BasicObject {

    constructor() {

        super();

        this.animations = new Map();

        this.defaultValues();

    }

    defaultValues() {

        this.valuesMask = new Array();
        this.animation = new Map();

        this.time = 0;
        this.lastTime = 0;
        this.playbackActive = false;
        this.valueZERO = null;
        this.currentAnimation = null;  // The name of the currently playing animation.
        
    }

    ready() {

        this.getScene().connect('update', (signal) => {
            this.update( signal.dt )
        });

    }

    update( dt ) {

        if ( ! this.playbackActive ) return;

        this.time += dt;

        let attributeID = 0;
        this.animation.forEach( ( attributeValues, attributeName ) => {

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

        const time = ( object.values.value - this.valueZERO ) / ( object.values.time - this.lastTime ) * dt;

        const applyString = `this.parent.${ object.attribute.name } += ${ time };`;
        eval( applyString );

        console.log( eval(`this.parent.${ object.attribute.name }`) );

    }

    defStopAnim( object ) {

        if ( Math.floor( this.time ) >= object.values.time &&
            ( this.valuesMask[ STOP ][ object.attribute.id ] & this.getUniqueID( object ) ) === 0 ) {

            //if ( object.values.id === 0 ) {

                const applyString = `this.parent.${ object.attribute.name } = ${ object.values.value };`;
                eval( applyString );

            //}

            this.valuesMask[ STOP ][ object.attribute.id ] |= this.getUniqueID( object );
            this.valuesMask[ PROCESS ][ object.attribute.id ] |= this.getUniqueID( object, 1 );

            this.valueZERO = object.values.value;
            this.lastTime = object.values.time;

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
        this.animation = this.animations.get(name).tracks;

        // Define BitMask on values for attribute
        // 0 - Process
        // 1 - Stop
        // 2 - Sum
        this.valuesMask = new Array( 3 );

        for ( let i = 0; i < this.valuesMask.length; i++ ) {

            this.valuesMask[ i ] = new Array( this.animation.size );

        }

        this.defStartAnim();

        // Play update function
        this.playbackActive = true;

    }

    defStartAnim() {

        let attributeID = 0;
        this.animation.forEach( ( attributeValues ) => {

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

export { AnimationPlayer };