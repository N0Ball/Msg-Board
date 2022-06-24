<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <body id="header" class="h-screen">
    <Header />
    <RouterView class="h-4/5 flex justify-center items-center" />
  </body>
</template>

<style>
</style>
