<template>
    <main id="site-main" class="h-4/5 flex flex-col justify-center items-center">
        <div id="card-field" class="flex flex-col w-3/5 max-h-full overflow-y-auto m-auto items-center justify-center border-light border-2 p-4">
            <div v-for="(message) in posts" :key="message._id" class="w-1/2 ">
                <div class="flex flex-col mt-5 border-light" v-bind:id="message._id">
                    <header class="flex flex-row gap-3 items-center">
                        <i class="fa-solid fa-user rounded-full"></i>
                        <div> {{message.user}} </div>
                        <a v-bind:href="'update?id=' + message._id">
                            <i v-show="own(message.user)" @click="modifyContent(message._id);" class="ml-3 fa-solid fa-pen"></i>
                        </a>
                        <a href="" @click="deleteMsg(message._id);">
                            <i v-show="own(message.user)" class="fa-solid fa-xmark text-red fa-lg"></i>
                        </a>
                    </header>
        
                    <div class="grid grid-cols-4 gap-3">
            
                        <div class="col-span-3 flex flex-col">
                            <div class="font-bold text-lg pt-3">
                                {{message.title}}
                            </div>
            
                            <div class="font-light text-sm pt-2">
                                {{message.content}}
                            </div>
                        </div>
                    
                    </div>
                
                    <footer class="flex flex-row pt-7 gap-3 items-center">
                    
                        <a v-bind:href="'./message?id=' + message._id" class="hover:bg-primary delay-100 duration-100 bg-secondary rounded-full py-1 px-2 text-xs">
                            View Reply
                        </a>
                    
                    </footer>
                    
                    <hr class="mt-5">
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {ref} from 'vue';
import PostAPI from '../api/posts.js';

export default{
    
    setup(){
        const posts = ref([]);
        const own = (username) => {
            return username == localStorage.getItem('username') ? true : false
        }
        return {
            posts,
            own
        }
    },

    mounted(){
        this.loadPost();
    },

    methods: {

        async loadPost(){
            this.posts = await PostAPI.find();
        },

        async deleteMsg(id){
            
            await PostAPI.delete(id);
            
        }
    }

}
</script>