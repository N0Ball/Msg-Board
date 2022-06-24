<template>
    <main id="site-main" class="h-4/5 flex flex-col justify-center items-center">
        <div class="block p-6 rounded-lg shadow-lg bg-white border-light border-2 w-4/5">

            <div class="hidden bg-red-100 border border-red text-red px-4 py-3 mb-3 rounded relative" role="alert" id="error-flash">
                <strong class="font-bold">ERROR!</strong>
                <span class="block sm:inline">Posts must have title and content</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3" onclick="hide('error-flash');">
                    <i class="fas fa-times"></i>
                </span>
            </div>

            <div class="form-group mb-6">
                <input id="formTitle" v-model="form.title" type="text" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none" name="title"
                placeholder="Title">
            </div>
            <div class="form-group mb-6">
                <textarea
                id="formContent"
                v-model="form.content"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                name="content"
                rows="3"
                placeholder="Content"
                ></textarea>
            </div>
            <button @click="updateMessage()" type="submit" class="w-full px-6 py-2.5 bg-primary text-light font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-primary hover:shadow-lg focus:bg-dark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark active:shadow-lg transition duration-150 ease-in-out">Post</button>
        </div>
    </main>
    
</template>
<script>
import {ref} from 'vue';
import PostAPI from '../api/posts.js';

export default {

    setup(){

        const form = {
            title: "",
            content: ""
        };
        const id = ref('');

        return {
            form,
            id
        }
    },

    async mounted(){
        this.id = this.getParameterByName('id');

        let post = await PostAPI.find(this.id);

        let titleField = document.getElementById('formTitle');
        titleField.value = post.title;
        this.form.title = post.title;

        let contentField = document.getElementById('formContent');
        contentField.value = post.content;
        this.form.content = post.content;
    },

    methods: {

        async updateMessage() {

            let formData = new URLSearchParams();
            formData.append('title', this.form.title);
            formData.append('content', this.form.content); 
            
            let result = await PostAPI.update(this.id, formData.toString());
            console.log(result);

            this.$router.push(`message?id=${this.id}`);
        },

        getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        },

    }
}

</script>