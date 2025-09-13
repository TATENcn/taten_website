<template>
  <div>
    <div class="information">
      <nuxt-img
        :src="value.avatarUrl"
        :alt="`${value.name}'s avatar'`"
        class="avatar"
      />
      <div class="name">{{ value.name }}</div>

      <nuxt-link v-if="value.blogWebsite" class="blog" :to="value.blogWebsite">
        {{ value.blogWebsite }}
      </nuxt-link>
      <div v-else class="blog">No Blog Website</div>
    </div>

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
