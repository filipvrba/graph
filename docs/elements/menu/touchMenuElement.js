import { MenuElement } from "./menuElement.js"

/**
 * Open menu one finger which touch move on a screen.
 */
class TouchMenuElement extends MenuElement {

    constructor() {

        super();

        this.start = new Vector2( 0, 0);
        this.distance = new Vector2( 0, 0 );

        this.delay = 100;

        // X is point start from a left screen.
        this.distanceMax = new Vector2( 50, 30 );

    }

    startTouch( event ) {

        this.start.x = event.touches[ 0 ].clientX;
        this.start.y = event.touches[ 0 ].clientY;

    }

    moveTouch( event ) {

        if ( this.start.x > this.distanceMax.x ) return;

        this.distance.x = event.touches[ 0 ].clientX - this.start.x;
        this.distance.y = event.touches[ 0 ].clientY - this.start.y;

        const isDelay = ( this.distance.x ) >= this.delay;  
        const isDistanceTrue =  Math.abs( this.distance.y ) < this.distanceMax.y;
        if ( ( isDelay && isDistanceTrue ) && !this.isVisible ) {
    
            this.clickHome();
    
        }

    }

    connectedCallback() {

        super.connectedCallback();

        this.touchStartHandler = ( event ) => { this.startTouch( event ) }
        document.addEventListener( 'touchstart', this.touchStartHandler );

        this.touchMoveHandler =  ( event ) => { this.moveTouch( event ) }
        document.addEventListener( 'touchmove', this.touchMoveHandler );

    }

    disconnectedCallback() {

        super.disconnectedCallback();

        document.removeEventListener( 'touchstart', this.touchStartHandler );
        document.removeEventListener( 'touchmove', this.touchMoveHandler );

    }

}

export { TouchMenuElement };
