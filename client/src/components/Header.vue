<template>
    <header id="header">
        <nav>
            <div class="min-w-full h-20 flex flex-row justify-between bg-dark">
                <div class="text-center flex items-center ml-3">
                    <a href="./post" class="flex justify-center align-center">
                        <i class="mr-3 fa-solid fa-plus fa-xl text-light mt-4"></i>
                        <p class="text-2xl font-bold text-light">Post New Message</p>
                    </a>
                </div>
                <div class="text-center flex items-center">
                    <a href="./" class="text-3xl font-bold text-light">Message Board</a>
                </div>
                <div class="text-center flex items-center mr-3" id="user">
                    <a v-if="notLogin" href="login" class="text-3xl font-bold text-light">SIGN UP/LOGIN</a>
                    <h1 v-if="!notLogin" class="text-3xl font-bold text-light mr-3"> {{ userName }} </h1>
                    <a v-if="!notLogin" @click="logout()" href="" class="text-3xl font-bold text-light">LOGOUT</a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>  
import {ref} from 'vue';

export default {

    setup(){
        const notLogin = ref(Boolean);
        const userName = ref(String);

        return {
            notLogin,
            userName
        }
    },

    mounted(){
        var userName = localStorage.getItem('username');
        this.userName = userName;
        this.notLogin = userName ? false : true;
    },

    methods: {
        logout() {
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        }
    }
}

</script>
