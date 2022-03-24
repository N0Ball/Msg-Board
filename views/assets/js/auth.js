class authLoaderManager extends LoaderManager{
    postLoad(){
        validateLogin();
    }
}

const authManager = new authLoaderManager();

function authLogin(){

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    authManager.addLoader('login', {
        method: 'POST',
        body: JSON.stringify({
            name: username,
            password: password
        }),
        headers: {
            'content-type': 'application/json'
        }
    });

    authManager.init();
}

function validateLogin(){
    const flash = document.getElementById('error-flash');
    let res = authManager.getLoaderData('login');

    if (res == 500){
        flash.classList.remove('hidden');
    }
    
    console.log(res);
}


function initHeader(){
    const user = document.getElementById('user');
    
    let login = manager.getLoaderData('check');
    
    if (login != 403){
        user.innerHTML = "LOGOUT";
    }
}