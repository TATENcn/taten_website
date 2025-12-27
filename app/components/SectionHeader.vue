<script setup lang="ts">
const label = defineModel<string>("label", { required: true });
const description = defineModel<string>("description", { required: true });
</script>

<template>
  <div class="p-6 bg-white text-black flex items-center">
    <span class="text-2xl font-black uppercase tracking-tighter">{{ label }}</span>
    <span class="ml-auto text-sm font-bold">{{ description }}</span>
  </div>
</template>
