<script setup lang="ts">
interface ContactLinkProps {
  target: string;
  what: string;
  bottom: string;
  description: string;
  title: string;
  head: string;
}

const props = defineProps<ContactLinkProps>();
</script>

<template>
  <NuxtLink :to="props.target" target="_blank" class="group relative h-[320px] border-b border-white overflow-hidden">
    <div class="relative h-full p-10 flex flex-col justify-between z-10">
      <div>
        <div class="text-[10px] text-red-600 font-bold mb-4 flex items-center gap-2">
          <span class="w-2 h-2 bg-red-600 animate-ping" />
          <span>[ {{ props.head }} ]</span>
        </div>
        <h3
          class="text-4xl font-black italic tracking-tighter uppercase mb-4 group-hover:text-red-600 transition-colors leading-none"
        >
          {{ props.title }}
        </h3>
        <div
          class="relative h-20 text-sm text-neutral-400 leading-relaxed [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-all duration-700 group-hover:text-white"
        >
          <span class="text-red-600 mr-1 font-bold">>></span>
          <span>{{ props.description }}</span>
        </div>
      </div>
      <div
        class="flex justify-between items-end border-t border-white/20 pt-6 group-hover:border-red-600 transition-colors"
      >
        <span class="text-[10px] font-bold uppercase opacity-40 italic">{{ props.what }}</span>
        <div
          class="text-2xl font-black translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
        >
          >>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-0 bg-red-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
    />

    <div
      class="absolute -right-4 -bottom-4 text-8xl font-black italic opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity uppercase"
    >
      {{ props.bottom }}
    </div>
  </NuxtLink>
</template>
