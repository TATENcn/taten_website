<template>
  <div class="bg-neutral-50 border border-neutral-200">
    <div class="aspect-ratio-video overflow-hidden">
      <LazyNuxtImg :src="value.imageUrl" class="object-cover" />
    </div>

    <div class="p-4">
      <NuxtLink :href="value.targetUrl" class="text-2xl mb-1 block hover:underline w-fit">
        {{ value.title }}
      </NuxtLink>
      <div class="text-neutral-700">{{ value.description }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IProject } from "~/assets/data/projects";

const value = defineModel<IProject>("data", { required: true });
</script>
