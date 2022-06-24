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
    },

    create(data){

        APISettings.headers.append("Authorization", localStorage.getItem('token'));

        return fetch( APISettings.baseURL + '/messages', {
            method: 'POST',
            headers: APISettings.headers,
            body: data
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