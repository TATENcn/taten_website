<script setup lang="ts">
import type { IMember } from "@@/server/api/members.get";

interface MemberCardProps {
  member: IMember;
  isFounder: boolean;
  id: string;
}

const props = defineProps<MemberCardProps>();

const formatWebsite = (url?: string) => {
  return url ? url.replace(/^https?:\/\//, "") : "NO_WEBSITE";
};
</script>

<template>
  <div
    class="absolute -right-4 -bottom-4 text-8xl font-black italic opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity uppercase"
  >
    {{ props.member.name.substring(0, 2) }}
  </div>

  <div class="relative h-full p-10 flex flex-col justify-between z-10">
    <div>
      <div class="text-[10px] text-red-600 font-bold mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-red-600" />
          [ {{ props.isFounder ? "FOUNDER" : "MEMBER" }} ]
        </div>
        <span class="opacity-40 font-mono">ID: {{ props.id }}</span>
      </div>

      <div class="flex gap-4 items-start mb-4">
        <div
          class="size-12 border border-white/20 p-0.5 grayscale group-hover:grayscale-0 group-hover:border-red-600 transition-all shrink-0"
        >
          <img :src="props.member.avatarUrl" class="w-full h-full object-cover" :alt="props.member.name" />
        </div>
        <h3
          class="text-4xl font-black italic tracking-tighter uppercase group-hover:text-red-600 transition-colors leading-none"
        >
          {{ props.member.name }}
        </h3>
      </div>

      <div class="relative mt-2 h-20">
        <div
          class="absolute inset-0 text-sm text-neutral-400 leading-relaxed overflow-y-auto custom-scrollbar pr-2 transition-all duration-700 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-hover:text-white text-justify [text-justify:inter-character]"
        >
          <span class="text-red-600 mr-1 font-bold">>></span>
          {{ props.member.introduction }}
          <div class="h-2" />
        </div>
        <div
          class="absolute top-0 left-0 w-[1px] h-full bg-red-600 opacity-0 group-hover:opacity-100 group-hover:left-full transition-all duration-700 ease-out pointer-events-none shadow-[0_0_8px_rgba(220,38,38,0.8)]"
        />
      </div>

      <div class="flex flex-wrap gap-2 mt-4">
        <span
          v-for="skill in props.member.skills.slice(0, 3)"
          :key="skill"
          class="text-[9px] border border-white/20 px-1.5 py-0.5 opacity-60 group-hover:opacity-100 group-hover:border-red-600 transition-colors uppercase"
        >
          #{{ skill }}
        </span>
      </div>
    </div>

    <div
      class="flex justify-between items-end border-t border-white/20 pt-6 group-hover:border-red-600 transition-colors"
    >
      <div class="flex flex-col">
        <span class="text-[10px] uppercase opacity-40 italic">Node_Endpoint:</span>
        <span class="text-[10px] font-bold truncate max-w-[150px]">
          {{ formatWebsite(props.member.blogWebsite ?? "") }}
        </span>
      </div>
      <NuxtLink
        v-if="props.member.blogWebsite"
        :to="props.member.blogWebsite"
        target="_blank"
        class="text-2xl font-black translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:text-red-600"
      >
        >>
      </NuxtLink>
    </div>
  </div>
  <div
    class="absolute inset-0 bg-red-600/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
  />
</template>
