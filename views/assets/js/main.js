const API_URI = 'http://localhost:8000/api'

class LoaderManager{

    constructor(){
        this.loaders = Array();
    };

    addLoader(loaderName, requests={}, uri = API_URI){
        this.loaders.push(new Loader(this, loaderName, requests, uri));
    }

    async init(){

        this.loaders.forEach(async loader => {
            await loader.fetchUri();
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
            postLoad();
        }

    }

    postLoad(){
        console.log("All Requested url are loaded!");
    }
}

class Loader{
    
    constructor(manager, name, requests, uri){
        this.MANAGER = manager;
        this.NAME = name;
        this.REQ = requests;
        this.URI = uri;
        this.status = false;
        this.data = undefined;

        this.fetchUri();
    }

    async fetchUri(){
        this.data = await fetch(`${this.URI}/${this.NAME}`, this.REQ);
        this.status = true;
        this.MANAGER.update();
    }

}