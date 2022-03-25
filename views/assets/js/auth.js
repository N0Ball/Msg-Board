class authLoaderManager extends LoaderManager{
    postLoad(){
        validateLogin();
    }
}

const authManager = new authLoaderManager();

function authLogin(){

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = new URLSearchParams();
    formData.append('name', username);
    formData.append('password', password);

    authManager.addLoader('login', {
        method: 'POST',
        body: formData.toString(),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });

    authManager.init();
}

function signup(){
   
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = new URLSearchParams();
    formData.append('name', username);
    formData.append('password', password); 
    
    authManager.addLoader('users', {
        method: 'POST',
        body: formData.toString(),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });

    authManager.init();
}

function validateLogin(){
    const flash = document.getElementById('error-flash');
    let res = authManager.getLoaderData('login');
    let signupRes = authManager.getLoaderData('users');

    if (res == 500 || res == 400 || res == 404){
        flash.classList.remove('hidden');
        return;
    }

    if(res){
        setCookie('token', res.token, 1000);
        document.location.href = './index.html';
        return;
    }

    if(signupRes){
        document.location.href = './login.html';
        return;
    }
    
}


function initHeader(){
    const user = document.getElementById('user');
    
    let login = manager.getLoaderData('check');
    
    if (login != 403){
        user.innerHTML = '<a onclick="logout();" class="text-3xl font-bold text-light">LOGOUT</a>';
        return;
    }

    user.innerHTML = '<a href="login.html" class="text-3xl font-bold text-light">SIGN UP/LOGIN</a>'
    
    eraseCookie('token');
}