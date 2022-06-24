<script>
export default {}
</script>

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
                    <a href="./index" class="text-3xl font-bold text-light">Message Board</a>
                </div>
                <div class="text-center flex items-center mr-3" id="user">
                    <a href="login" class="text-3xl font-bold text-light">SIGN UP/LOGIN</a>
                </div>
            </div>
        </nav>
    </header>
</template>