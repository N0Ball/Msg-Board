<template>

    <main id="site-main" class="h-4/5 flex justify-center items-center">

        <div class="m-auto container">
            <div class="bg-light shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">

                <div class="hidden bg-red-100 border border-red text-red px-4 py-3 mb-3 rounded relative" role="alert" id="error-flash">
                    <strong class="font-bold">ERROR!</strong>
                    <span class="block sm:inline">Wrong username or password.</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3" onclick="hide('error-flash');">
                        <i class="fas fa-times"></i>
                    </span>
                </div>

                <div class="mb-4">
                    <label class="block text-light-lighter text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input v-model="form.username" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username">
                </div>
                <div class="mb-6">
                    <label class="block text-light-lighter text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input v-model="form.password"  class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************">
                </div>
                <div class="flex items-center justify-between">
                    <button @click="loginUser();" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
                        Log In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="./register">
                        Sign Up for new Account
                    </a>
                </div>
            </div>
        </div>

    </main>

</template>

<script>
import UserAPI from '../api/user.js';
export default {

    data(){
        return {
            fetchError: '',
        }
    },

    setup(){

        const form = {
            username: '',
            password: ''
        };

        return {
            form,
        };
    },

    methods: {

        async loginUser() {

            let formData = new URLSearchParams();
            formData.append('name', this.form.username);
            formData.append('password', this.form.password); 
            
            let result = await UserAPI.login(formData.toString());

            if (result.token){
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', this.form.username);
            }

            this.$router.push('/');
        }

    }
}
</script>
