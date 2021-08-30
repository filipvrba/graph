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

export { Animation };