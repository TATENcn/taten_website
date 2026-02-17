<template>
  <div
    class="bg-[#0a0a0a] text-white font-mono min-h-screen selection:bg-red-600 selection:text-white overflow-x-hidden"
  >
    <header
      class="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1800px] border-b border-white bg-[#0a0a0a] z-50 grid grid-cols-3 px-4 py-1 text-[10px] uppercase tracking-widest"
    >
      <div class="flex gap-4">
        <span class="hidden sm:inline">IP: {{ visitorIp }}</span>
      </div>
      <div class="animate-pulse text-green-500 text-center">● RUNNING</div>
      <div class="text-right">{{ systemTime }}</div>
    </header>

    <div class="max-w-[1800px] mx-auto border-x border-white/20 relative">
      <div
        ref="landerRef"
        class="h-[80vh] flex flex-col items-center justify-center relative will-change-transform"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <div class="z-10 text-center px-4">
          <h1 class="text-[clamp(3.5rem,18vw,14rem)] font-black italic leading-[0.75] uppercase mb-10 tracking-tighter">
            TAT<span class="text-red-600">E</span>N
          </h1>
          <div class="text-sm md:text-base border border-white px-6 py-3 inline-block tracking-widest uppercase">
            PROTOCOL_CMD: {{ currentTypingText }}<span class="animate-ping">|</span>
          </div>
        </div>
      </div>

      <main class="grid grid-cols-1 lg:grid-cols-12 border-b border-white bg-black">
        <!-- Introduction -->
        <section class="lg:col-span-4 border-r border-white">
          <SectionHeader label="01_MISSION" description="EST. 2025.7.30" />
          <Introduction />
        </section>

        <!-- Members -->
        <section class="lg:col-span-8 p-0 border-t border-white lg:border-t-0">
          <SectionHeader label="02_MEMBERS" :description="String(members?.length || 0)" />

          <div class="grid grid-cols-1 md:grid-cols-2">
            <div
              v-for="(member, index) in members"
              :key="member.name"
              class="group relative h-[320px] border-b border-r border-white overflow-hidden bg-[#0a0a0a] cursor-crosshair"
            >
              <MemberCard :id="String(index + 1).padStart(2, '0')" :member="member" :is-founder="index === 0" />
            </div>
          </div>
        </section>

        <!-- Projects -->
        <section class="lg:col-span-12 border-t border-white">
          <SectionHeader label="03_STAGING_PROJECTS" description="ACCESS: EXTERNAL_TARGETS" />

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <NuxtLink
              v-for="project in projects"
              :key="project.title"
              :to="project.targetUrl"
              target="_blank"
              class="group relative h-[320px] border-r border-b border-white overflow-hidden bg-[#0a0a0a]"
            >
              <ProjectCard :project="project" />
            </NuxtLink>
          </div>
        </section>

        <!-- Contact -->
        <section class="lg:col-span-12 border-t border-white">
          <SectionHeader label="04_JOIN_PROTOCOL" description="STATUS: OPEN_ACCESS" />

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div
              class="relative h-[320px] border-r border-b border-white bg-[#0a0a0a] p-10 flex flex-col justify-between group overflow-hidden"
            >
              <div class="absolute -right-4 -bottom-4 text-8xl font-black italic opacity-[0.03] select-none uppercase">
                INFO
              </div>
              <p class="text-sm text-neutral-400 leading-relaxed uppercase italic z-10">
                // 期待每一位对代码充满向往的开发者。
              </p>
              <div class="text-[10px] text-neutral-600 font-bold uppercase z-10">System_Manifesto</div>
            </div>

            <ContactLink
              class="border-r"
              :target="'https://github.com/TATENcn'"
              head="Projects"
              description="访问我们的代码仓库，查看当前活跃项目，别忘了点亮 Star 和 Follow"
              title="GITHUB"
              what="@TATENcn"
              bottom="GH"
            />
            <ContactLink
              class="border-r"
              :target="'https://qm.qq.com/q/RSYq4zfLCm'"
              head="QQ_GROUP_LINK"
              description="加入 QQ 群，展开技术交流"
              title="QQ_GROUP"
              what="TATEN_LEARN"
              bottom="QQ"
            />
            <ContactLink
              class="border-r"
              :target="'https://docs.taten.org/join-us.html'"
              head="JOIN_US"
              description="加入 TATEN 团队"
              title="JOIN_NOW"
              what="@LIN_MOHAN"
              bottom="JN"
            />
          </div>
        </section>
      </main>

      <footer class="p-8 text-center text-[12px] text-neutral-600 uppercase tracking-[0.4em] font-mono">
        Team Runtime · Since Establishment · {{ systemRuntime }}
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

/**
 * CONSTANTS: 业务常量定义
 */
const START_DATE = new Date("2025-07-30T00:00:00");
const SCROLL_FACTOR = 0.5; // 视差系数
const TYPING_CONFIG = {
  SPEED: 80,
  DELETE_SPEED: 40,
  PAUSE: 1800,
};

/**
 * SECTION: 数据获取
 * Nuxt 3 useFetch 组合调用
 */
const [{ data: members }, { data: typingTexts }, { data: statusData }, { data: projects }] = await Promise.all([
  useFetch("/api/members"),
  useFetch("/api/typing-text"),
  useFetch("/api/status"),
  useFetch("/api/projects"), // 对应第四个数据源
]);

/**
 * COMPOSABLE: 滚动视差逻辑
 * 抽离滚动监听，保持 setup 清洁
 */
const landerRef = ref<HTMLElement | null>(null);
const offsetY = ref(0);

const handleScroll = () => {
  offsetY.value = window.scrollY * SCROLL_FACTOR;
};

/**
 * COMPOSABLE: 系统时钟与运行时间逻辑
 */
const systemTime = ref("");
const systemRuntime = ref("");
const visitorIp = computed(() => statusData.value?.ip || "127.0.0.1");

const updateSystemMetrics = () => {
  const now = new Date();

  // 更新时钟
  systemTime.value = now.toLocaleTimeString();

  // 计算运行时长
  let diff = Math.abs(now.getTime() - START_DATE.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);
  const secs = Math.floor(diff / 1000);

  systemRuntime.value = `${days.toString().padStart(3, "0")}D ${hours.toString().padStart(2, "0")}H ${mins.toString().padStart(2, "0")}M ${secs.toString().padStart(2, "0")}S`;
};

/**
 * COMPOSABLE: 打字机交互逻辑
 */
const currentTypingText = ref("");
const typingState = {
  textIndex: 0,
  charIndex: 0,
  isDeleting: false,
};
let typingTimer: ReturnType<typeof setTimeout> | null = null;

const runTypingProtocol = () => {
  const texts = typingTexts.value || [];
  if (texts.length === 0) return;

  const currentFullText = texts[typingState.textIndex]!;
  const { SPEED, DELETE_SPEED, PAUSE } = TYPING_CONFIG;

  if (!typingState.isDeleting && typingState.charIndex < currentFullText.length) {
    // Typing
    typingState.charIndex++;
    currentTypingText.value = currentFullText.substring(0, typingState.charIndex);
    typingTimer = setTimeout(runTypingProtocol, SPEED);
  } else if (!typingState.isDeleting && typingState.charIndex === currentFullText.length) {
    // End of typing, wait to delete
    typingTimer = setTimeout(() => {
      typingState.isDeleting = true;
      runTypingProtocol();
    }, PAUSE);
  } else if (typingState.isDeleting && typingState.charIndex > 0) {
    // Deleting
    typingState.charIndex--;
    currentTypingText.value = currentFullText.substring(0, typingState.charIndex);
    typingTimer = setTimeout(runTypingProtocol, DELETE_SPEED);
  } else {
    // End of deleting, next text
    typingState.isDeleting = false;
    typingState.textIndex = (typingState.textIndex + 1) % texts.length;
    runTypingProtocol();
  }
};

let metricsTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  updateSystemMetrics();
  metricsTimer = setInterval(updateSystemMetrics, 1000);

  if (typingTexts.value?.length) {
    runTypingProtocol();
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
  if (metricsTimer) clearInterval(metricsTimer);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* 终端风滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 2px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #dc2626;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #dc2626 transparent;
}

/* 网页滚动条 */
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 2px;
}

html::-webkit-scrollbar-track,
body::-webkit-scrollbar-track {
  background: transparent;
}

html::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-thumb {
  background: #dc2626;
  border-radius: 0;
}

html,
body {
  scrollbar-width: thin;
  scrollbar-color: #dc2626 transparent;
  background: #0a0a0a;
}
</style>
