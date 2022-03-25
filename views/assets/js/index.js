function loadCard(){

    const cardField = document.getElementById('card-field');
    const messages = manager.getLoaderData('messages');

    messages.forEach( message => {        
        const card = document.createElement('card');
        card.classList.add('w-1/2');
        card.classList.add('flex');
        card.classList.add('flex-col');
        card.classList.add('mt-5');
        card.classList.add('border-light');

        card.setAttribute('id', message._id);

        let cardContext = `      
            <header class="flex flex-row gap-3 items-center">
                <i class="fa-solid fa-user rounded-full"></i>
                    <div> ${message.user} </div>
            </header>
        
            <content class="grid grid-cols-4 gap-3">
    
                <div class="col-span-3 flex flex-col">
                    <subject class="font-bold text-lg pt-3">
                        ${message.title}
                    </subject>
    
                    <description class="font-light text-sm pt-2">
                        ${message.content}
                    </description>
                </div>
            
            </content>
        
            <footer class="flex flex-row pt-7 gap-3 items-center">
            
                <a href="./message.html?id=${message._id}" class="hover:bg-primary delay-100 duration-100 bg-secondary rounded-full py-1 px-2 text-xs">
                    View Reply
                </a>
            
            </footer>
            
            <hr class="mt-5">
        `

        card.innerHTML = cardContext;
        cardField.appendChild(card);
    });

}