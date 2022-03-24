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
                finishLoad = true;
                return;
            }

        });

        if (finishLoad){
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