class PostLoaderManager extends LoaderManager{
    postLoad(){
        const result = postManager.getLoaderData('messages');

        if (result == 400){
            const errorFlash = document.getElementById('error-flash');
            errorFlash.classList.remove('hidden');
            return;
        }
        
        window.location.href = './index.html';
    }
}


const postManager = new PostLoaderManager();

function postMessage(target){
    const form = Object.fromEntries(new FormData(target).entries());
    
    const title = form.title;
    const content = form.content;

    const formData = new URLSearchParams();
    formData.append('title', title);
    formData.append('content', content);

    postManager.addLoader('messages', {
        method: "POST",
        headers: {
            "Authorization": getCookie('token'),
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    })

    postManager.init();
}