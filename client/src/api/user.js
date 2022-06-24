import { APISettings } from './config.js';

export default {

    find(){
        return fetch( APISettings.baseURL + '/users', {
            method: 'GET',
            headers: APISettings.headers
        } )
        .then( function( response ){
            if( response.status != 200 ){
                throw response.status;
            }else{
                return response.json();
            }
        });
    },

    create(data){
    
        return fetch( APISettings.baseURL + '/users', {
            method: 'POST',
            headers: APISettings.headers,
            body: data
        } )
        .then( function( response ){
            if( response.status != 201 ){
                throw response.status;
            }else{
                return response.json();
            }
        });

    }
}