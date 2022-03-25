function loadMessage(){
    const messageField = document.getElementById('article');
    const message = manager.getLoaderData(`messages?id=${ID}`);
    const replies = message.replies;

    const msg = document.createElement('div');
    msg.classList.add('flex');
    msg.classList.add('pb-6');
    msg.classList.add('items-center');
    msg.classList.add('justify-between');

    const msgContentFirst = `
        <div class="flex">
            <a class="inline-block mr-4" href="#">
                <i class="fa-solid fa-user rounded-full fa-2xl mt-4"></i>
            </a>
            <div class="flex flex-col">
                <div>
                    <a class="inline-block text-lg font-bold" href="#">${message.user}</a>
                </div>
            </div>
        </div>
    `
    
    const msgContentSecond = `
    <h2 class="text-3xl font-extrabold mb-2">${message.title}</h2>
    <p class=" text-dark">
    ${message.content}
    </p>

    <hr class="mt-5">

    <div class="relative">
        <input
            id="reply-field" 
            class="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 rounded-lg placeholder:text-primary font-medium pr-20"
            type="text" placeholder="Write a reply" />
        <span class="flex absolute right-3 top-1/4 items-center">
            <button onclick="replyMsg()">
                <i class="text-primary fa-solid fa-paper-plane fa-lg"></i>
            </button>
        </span>
    </div>
    `

    msg.innerHTML = msgContentFirst;
    messageField.appendChild(msg);
    messageField.innerHTML += msgContentSecond;

    replies.forEach( reply => {

        const replyField = document.createElement('div');
        replyField.classList.add('pt-6');

        const replyContent = `
            <div class="media flex pb-4">
                <a class="mr-4" href="#">
                    <i class="fa-solid fa-user rounded-full fa-2xl mt-6"></i>
                </a>
                <div class="media-body">
                    <div>
                        <a class="inline-block text-base font-bold mr-2" href="#">${reply.user}</a>
                    </div>
                    <p class=" text-dark">${reply.content}</p>
                    <!-- <div class="mt-2 flex items-center">
                        <button class="py-2 px-4 font-medium hover:bg-slate-50 rounded-lg">
                            Reply
                        </button>
                    </div> -->
                </div>
            </div>
        `

        replyField.innerHTML = replyContent;
        messageField.appendChild(replyField);
    });

}

class ReplyLoaderManager extends LoaderManager{
    postLoad(){
        const res = replyManager.getLoaderData(`messages/reply/${ID}`);
        const errorFlash = document.getElementById('error-flash')
        
        if (res == 403){
            errorFlash.classList.remove('hidden');
            return;
        }

        document.location.href = document.location.href;
    }
}

const replyManager = new ReplyLoaderManager();

function replyMsg(){
    const replyField = document.getElementById('reply-field');

    const formData = new URLSearchParams();
    formData.append('content', replyField.value);

    replyManager.addLoader(`messages/reply/${ID}`, {
        method: "POST",
        headers: {
            "Authorization": getCookie('token'),
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    });

    replyManager.init();
}