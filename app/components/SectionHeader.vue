<script setup lang="ts">
interface SectionHeaderProps {
  label: string;
  description: string;
}

const props = defineProps<SectionHeaderProps>();
</script>

<template>
  <div class="p-6 bg-white text-black flex items-center">
    <span class="text-2xl font-black uppercase tracking-tighter">{{ props.label }}</span>
    <span class="ml-auto text-sm font-bold">{{ props.description }}</span>
  </div>
</template>
