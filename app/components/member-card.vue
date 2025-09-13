<template>
  <div class="member-card">
    <div class="information">
      <nuxt-img
        :src="value.avatarUrl"
        :alt="`${value.name}'s avatar'`"
        class="avatar"
      />
      <div class="info">
        <div class="name">{{ value.name }}</div>
        <nuxt-link
          v-if="value.blogWebsite"
          class="blog"
          :to="value.blogWebsite"
        >
          {{ value.blogWebsite.replace(/^https?:\/\//, "").replace(/\/$/, "") }}
        </nuxt-link>
        <div v-else class="blog">No Blog Website</div>
      </div>
    </div>

    <div class="introduction">{{ value.introduction }}</div>

    <div class="skills">
      <div v-for="skill in value.skills" :key="skill" class="skill">
        {{ skill }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IMember } from "~/assets/data/members";

const value = defineModel<IMember>("value", { required: true });
</script>

<style lang="scss" scoped>
.member-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 20px;
  background-color: #fafafa;
  height: 100%;
  border: 1px solid #e5e5e5;
  font-family: system-ui;
  box-sizing: border-box;

  .information {
    display: flex;
    gap: 20px;
    margin-block-end: 16px;
    flex-shrink: 0;

    .avatar {
      width: 100px;
      aspect-ratio: 1;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #f0f0f0;
      flex-shrink: 0;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;

      .name {
        font-size: 1.5rem;
        font-weight: 500;
        color: #333;
        margin: 0;
      }
    }

    .blog {
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;

      &:hover {
        color: #333;
        text-decoration: underline;
      }
    }
  }

  .introduction {
    margin-block-end: 16px;
    color: #555;
    line-height: 1.6;
    flex-grow: 1;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;

    .skill {
      background-color: #f0f0f0;
      color: #555;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
    }
  }
}
</style>
