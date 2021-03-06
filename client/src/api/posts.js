import { APISettings } from './config.js';

export default {

    find(id = undefined){

        let query = '/messages';

        if (id != undefined) {
            query += '?id=' + id;
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

    },

    reply(id, data){

        APISettings.headers.append("Authorization", localStorage.getItem('token'));

        return fetch( APISettings.baseURL + '/messages/reply/' + id, {
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

    update(id, data){

        APISettings.headers.append("Authorization", localStorage.getItem('token'));

        return fetch( APISettings.baseURL + '/messages/' + id, {
            method: 'PUT',
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

    delete(id){

        APISettings.headers.append("Authorization", localStorage.getItem('token'));

        return fetch( APISettings.baseURL + '/messages/' + id, {
            method: 'DELETE',
            headers: APISettings.headers,
        } )
        .then( function( response ){

            if( response.status == 400){
                return response.json();
            }

            if( response.status == 200 || response.status == 201){
                return response.json();
            }

            throw response.status;
        });

    }
}