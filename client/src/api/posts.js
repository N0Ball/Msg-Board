import { APISettings } from './config.js';

export default {

    find(id = undefined){

        let query = '/messages';

        if (id != undefined) {
            query += id;
        }

        return fetch( APISettings.baseURL + query, {
            method: 'GET',
            headers: APISettings.headers
        } )
        .then( function( response ){

            if( response.status == 400){
                return response.json();
            }

            if( response.status == 200){
                return response.json();
            }

            throw response.status;
        });
    }
}