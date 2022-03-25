const API_URI = 'http://localhost:8000/api'

class LoaderManager{

    constructor(){
        this.loaders = Array();
        this.loaderData = {};
    };

    addLoader(loaderName, requests={}, uri = API_URI){
        this.loaders.push(new Loader(loaderName, requests, uri));
        this.loaderData[loaderName] = undefined;
    }

    async init(){

        this.loaders.forEach(loader => {
            loader.fetchUri()
            .then( res => {
                loader.status = true;
                this.loaderData[loader.NAME] = res;
                this.update();
            });
        });

    }

    update(){
        
        let finishLoad = true;

        this.loaders.forEach(loader => {

            if(!loader.status){
                finishLoad = false;
                return;
            }

        });

        if (finishLoad){
            this.loaders = Array();
            this.postLoad();
        }

    }

    postLoad(){
        console.log("All Requested url are loaded!");
    }

    getLoaderData(name){
        return this.loaderData[name];
    }
}

class Loader{
    
    constructor(name, requests, uri){
        this.NAME = name;
        this.REQ = requests;
        this.URI = uri;
        this.status = false;
        this.data = undefined;
    }

    async fetchUri(){
        this.data = await fetch(`${this.URI}/${this.NAME}`, this.REQ);

        if(!this.data.ok){
            return await this.data.status;
        }

        this.data = await this.data.json();
        return this.data;
    }

}

function hide(id){

    const target = document.getElementById(id);
    target.classList.add('hidden');
    
}

function setCookie(name,value,seconds) {
    var expires = "";
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie=name + '=' +"; Max-Age=0; path=/";
}

function logout(){
    eraseCookie('token');
    window.location.href = window.location.href;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}