import axios from 'axios';

export default function( {params, store, route} ) {
    store.dispatch('fetchData')

}

