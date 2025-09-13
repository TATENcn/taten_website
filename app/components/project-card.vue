<template>
  <div class="project-card">
    <nuxt-img :src="value.imageUrl" :alt="value.title" class="image" />
    <div class="content">
      <nuxt-link :href="value.targetUrl" class="title">
        {{ value.title }}
      </nuxt-link>
      <div class="description">{{ value.description }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IProject } from "~/assets/data/projects";

const value = defineModel<IProject>("value", { required: true });
</script>

<style lang="scss" scoped>
.project-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: #fafafa;
  height: 100%;
  border: 1px solid #e5e5e5;
  font-family: system-ui;
  box-sizing: border-box;

  .image {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    flex-shrink: 0;
  }

  .content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
    text-decoration: none;
    margin-bottom: 8px;

    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }

  .description {
    color: #555;
    line-height: 1.6;
    flex-grow: 1;
  }
}
</style>
