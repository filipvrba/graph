import { Color, Mathf, Object2D } from "../core/index.js";
import { List, Piece } from './index.js'

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

export { PieChart };