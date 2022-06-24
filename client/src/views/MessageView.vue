<template>
    <main id="site-main" class="h-4/5 flex flex-col justify-center items-center">

        <div class="hidden w-3/5 bg-red-100 border border-red text-red px-4 py-3 mb-3 rounded relative" role="alert" id="error-flash">
            <strong class="font-bold">ERROR!</strong>
            <span class="block sm:inline">You have to login before replying message.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3" onclick="hide('error-flash');">
                <i class="fas fa-times"></i>
            </span>
        </div>

        <article id="article" class="w-full max-w-7xl mx-auto break-inside p-6 rounded-xl bg-white flex flex-col bg-clip-border">
            <div class="flex pb-6 items-center justify-between">

                <div class="flex">
                    <a class="inline-block mr-4" href="#">
                        <i class="fa-solid fa-user rounded-full fa-2xl mt-4"></i>
                    </a>
                    <div class="flex flex-col justify-center">
                        <div>
                            <a class="inline-block text-lg font-bold" href="#">{{message.user}}</a>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="text-3xl font-extrabold mb-2">{{message.title}}</h2>
            <p class=" text-dark">
            {{message.content}}
            </p>

            <hr class="mt-5">

            <div class="relative">
                <input
                    id="reply-field" 
                    v-model="reply.content"
                    class="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 rounded-lg placeholder:text-primary font-medium pr-20"
                    type="text" placeholder="Write a reply" />
                <span class="flex absolute right-3 top-1/4 items-center">
                    <button @click="replyMsg()">
                        <i class="text-primary fa-solid fa-paper-plane fa-lg"></i>
                    </button>
                </span>
            </div>

            <div class="pt-6" v-for="reply in message.replies" :key="reply._id">
                <div class="media flex pb-4">
                    <a class="mr-4" href="#">
                        <i class="fa-solid fa-user rounded-full fa-2xl mt-6"></i>
                    </a>
                    <div class="media-body">
                        <div>
                            <a class="inline-block text-base font-bold mr-2" href="#">{{reply.user}}</a>
                        </div>
                        <p class=" text-dark">{{reply.content}}</p>
                        <!-- <div class="mt-2 flex items-center">
                            <button class="py-2 px-4 font-medium hover:bg-slate-50 rounded-lg">
                                Reply
                            </button>
                        </div> -->
                    </div>
                </div>
            </div>
        </article>
    </main>
</template>

<script>
import {ref} from 'vue';
import PostAPI from '../api/posts.js';

export default {

    setup(){
        const message = ref({});
        const reply = {
            content: ''
        }
        const id = ref('');

        return {
            message,
            reply,
            id
        };
    },

    mounted(){
        this.id = this.getParameterByName('id');
        this.loadMessage();
    },

    methods: {

        async loadMessage(){
            this.message = await PostAPI.find(this.id);
        },

        getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        },

        async replyMsg(){

            let formData = new URLSearchParams();
            formData.append('content', this.reply.content);

            await PostAPI.reply(this.id, formData.toString());

            this.loadMessage();
        }
    }
}
</script>
