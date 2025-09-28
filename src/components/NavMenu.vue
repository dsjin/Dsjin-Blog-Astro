<script setup lang="ts">
import { ref } from 'vue';
  const navItems = ref({
    home: {
      title: 'Home',
      link: '/',
    },
    tag: {
      title: 'Tags',
      link: '/tags',
    },
  })
</script>

<template>
  <div class="nav-menu">
    <template :key="key" v-for="(item, key) in navItems">
      <a :href="item.link" class="nav-menu_item">
        {{ item.title }}
      </a>
    </template>
  </div>
</template>

<style>
  .nav-menu {
    display: flex;
    align-items: center;
  }
  .nav-menu_item {
    text-decoration: none;
    color: inherit;
  }
  .nav-menu_item:not(:last-child) {
    margin-right: 20px;
  }
</style>
