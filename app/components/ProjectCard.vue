<!-- TODO: 此组件未遵循项目代码规范 -->

<template>
  <div
    class="absolute -right-4 -bottom-4 text-8xl font-black italic opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity"
  >
    {{ project.title.substring(0, 2).toUpperCase() }}
  </div>

  <div class="relative h-full p-10 flex flex-col justify-between z-10">
    <div>
      <div class="text-[10px] text-red-600 font-bold mb-4 flex items-center gap-2">
        <span class="w-2 h-2 bg-red-600 animate-pulse"></span>
        [ PRODUCTION_NODE ]
      </div>

      <h3
        class="text-4xl font-black italic tracking-tighter uppercase mb-4 group-hover:text-red-600 transition-colors leading-none"
      >
        {{ project.title }}
      </h3>

      <div class="relative h-20">
        <div
          class="absolute inset-0 text-sm text-neutral-400 leading-relaxed overflow-y-auto custom-scrollbar pr-2 transition-all duration-700 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-hover:text-white"
        >
          <span class="text-red-600 mr-1 font-bold">>></span>
          {{ project.description }}
        </div>
        <div
          class="absolute top-0 left-0 w-[1px] h-full bg-red-600 opacity-0 group-hover:opacity-100 group-hover:left-full transition-all duration-700 ease-out pointer-events-none"
        ></div>
      </div>
    </div>

    <div
      class="flex justify-between items-end border-t border-white/20 pt-6 group-hover:border-red-600 transition-colors"
    >
      <div class="flex flex-col">
        <span class="text-[10px] uppercase opacity-40 italic">Link_Target:</span>
        <span class="text-[10px] font-bold truncate max-w-[150px]">
          {{ project.targetUrl.replace(/^https?:\/\//, "") }}
        </span>
      </div>
      <div
        class="text-2xl font-black translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
      >
        >>
      </div>
    </div>
  </div>

  <div
    class="absolute inset-0 bg-red-600/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
  />
</template>

<script setup lang="ts">
import type { IProject } from "@@/server/api/projects.get";

const project = defineModel<IProject>("project", { required: true });
</script>
