<script setup>
</script>

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

            <form action='#' onsubmit="postMessage(this);return false">
                <div class="form-group mb-6">
                    <input type="text" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none" name="title"
                    placeholder="Title">
                </div>
                <div class="form-group mb-6">
                    <textarea
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    name="content"
                    rows="3"
                    placeholder="Content"
                    ></textarea>
                </div>
                <button type="submit" class="w-full px-6 py-2.5 bg-primary text-light font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-primary hover:shadow-lg focus:bg-dark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark active:shadow-lg transition duration-150 ease-in-out">Post</button>
            </form>
        </div>
    </main>
    
</template>
