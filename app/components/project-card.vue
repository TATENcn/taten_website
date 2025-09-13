<template>
  <div>
    <nuxt-img :src="value.imageUrl" :alt="value.title" class="image" />
    <nuxt-link :href="value.targetUrl" class="title">
      {{ value.title }}
    </nuxt-link>
    <div class="description">{{ value.description }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { IProject } from "~/assets/data/projects";

const value = defineModel<IProject>("value", { required: true });
</script>
