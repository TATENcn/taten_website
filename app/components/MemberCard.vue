<template>
  <div class="border-neutral-200 border bg-neutral-50 size-full flex flex-col">
    <div class="flex items-center gap-x-4 p-6">
      <LazyNuxtImg :src="value.avatarUrl" class="size-24 rounded-full" />

      <div>
        <div class="text-2xl">{{ value.name }}</div>
        <NuxtLink
          v-if="value.blogWebsite"
          :to="value.blogWebsite"
          class="text-neutral-500 hover:text-neutral-800 transition"
        >
          {{ value.blogWebsite.replace(/^https?:\/\//, "").replace(/\/$/, "") }}
        </NuxtLink>
        <div v-else class="text-neutral-500">No Website</div>
      </div>
    </div>

    <div class="px-4 text-neutral-800">{{ value.introduction }}</div>

    <div class="flex gap-x-4 gap-y-2 flex-wrap p-4 mt-auto">
      <div
        v-for="skill in value.skills"
        :key="skill"
        class="flex-shrink-0 bg-neutral-200/50 rounded-full px-3 py-1 text-sm text-neutral-800"
      >
        {{ skill }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IMember } from "~/assets/data/members";

const value = defineModel<IMember>("data", { required: true });
</script>
