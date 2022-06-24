import { APISettings } from './config.js';

export default {

    login(data){
        return fetch( APISettings.baseURL + '/login', {
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
    },

    create(data){
    
        return fetch( APISettings.baseURL + '/users', {
            method: 'POST',
            headers: APISettings.headers,
            body: data
        } )
        .then( function( response ){

            if( response.status == 400){
                return response.json();
            }

            if( response.status == 201){
                return response.json();
            }

            throw response.status;
        });

    }
}