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
        <section class="lg:col-span-4 border-r border-white">
          <SectionHeader label="01_MISSION" description="EST. 2025.7.30" />
          <Introduction />
        </section>

        <section class="lg:col-span-8 p-0 border-t border-white lg:border-t-0">
          <SectionHeader label="02_MEMBERS" :description="String(members?.length || 0)" />

          <div class="grid grid-cols-1 md:grid-cols-2">
            <div
              v-for="(member, index) in members"
              :key="member.name"
              class="group relative h-[320px] border-b border-r border-white overflow-hidden bg-[#0a0a0a] cursor-crosshair"
            >
              <div
                class="absolute -right-4 -bottom-4 text-8xl font-black italic opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity uppercase"
              >
                {{ member.name.substring(0, 2) }}
              </div>

              <div class="relative h-full p-10 flex flex-col justify-between z-10">
                <div>
                  <div class="text-[10px] text-red-600 font-bold mb-4 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-red-600" :class="{ 'animate-pulse': index === 0 }"></span>
                      [ {{ getMemberRole(member, index) }} ]
                    </div>
                    <span class="opacity-40 font-mono">ID:{{ formatId(index) }}</span>
                  </div>

                  <div class="flex gap-4 items-start mb-4">
                    <div
                      class="size-12 border border-white/20 p-0.5 grayscale group-hover:grayscale-0 group-hover:border-red-600 transition-all shrink-0"
                    >
                      <img :src="member.avatarUrl" class="w-full h-full object-cover" :alt="member.name" />
                    </div>
                    <h3
                      class="text-4xl font-black italic tracking-tighter uppercase group-hover:text-red-600 transition-colors leading-none"
                    >
                      {{ member.name }}
                    </h3>
                  </div>

                  <div class="relative mt-2 h-20">
                    <div
                      class="absolute inset-0 text-sm text-neutral-400 leading-relaxed overflow-y-auto custom-scrollbar pr-2 transition-all duration-700 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-hover:text-white text-justify [text-justify:inter-character]"
                    >
                      <span class="text-red-600 mr-1 font-bold">>></span>
                      {{ member.introduction }}
                      <div class="h-2"></div>
                    </div>
                    <div
                      class="absolute top-0 left-0 w-[1px] h-full bg-red-600 opacity-0 group-hover:opacity-100 group-hover:left-full transition-all duration-700 ease-out pointer-events-none shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                    ></div>
                  </div>

                  <div class="flex flex-wrap gap-2 mt-4">
                    <span
                      v-for="skill in member.skills.slice(0, 3)"
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
                      {{ formatWebsite(member.blogWebsite) }}
                    </span>
                  </div>
                  <NuxtLink
                    v-if="member.blogWebsite"
                    :to="member.blogWebsite"
                    target="_blank"
                    class="text-2xl font-black translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:text-red-600"
                  >
                    >>
                  </NuxtLink>
                </div>
              </div>
              <div
                class="absolute inset-0 bg-red-600/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
              ></div>
            </div>
          </div>
        </section>

        <section class="lg:col-span-12 border-t border-white">
          <SectionHeader label="03_STAGING_PROJECTS" description="ACCESS: EXTERNAL_TARGETS" class="text-red-500" />

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <NuxtLink
              v-for="project in projects"
              :key="project.title"
              :to="project.targetUrl"
              target="_blank"
              class="group relative h-[320px] border-r border-b border-white overflow-hidden bg-[#0a0a0a]"
            >
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
              ></div>
            </NuxtLink>
          </div>
        </section>

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
                // 期待每一位对代码充满向往的开发者。<br /><br />
              </p>
              <div class="text-[10px] text-neutral-600 font-bold uppercase z-10">System_Manifesto</div>
            </div>

            <NuxtLink
              to="https://github.com/TATENcn"
              target="_blank"
              class="group relative h-[320px] border-r border-b border-white overflow-hidden bg-[#0a0a0a]"
            >
              <div
                class="absolute -right-4 -bottom-4 text-8xl font-black italic opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity uppercase"
              >
                GH
              </div>
              <div class="relative h-full p-10 flex flex-col justify-between z-10">
                <div>
                  <div class="text-[10px] text-red-600 font-bold mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 bg-red-600"></span> [ PROJECTS ]
                  </div>
                  <h3
                    class="text-4xl font-black italic tracking-tighter uppercase mb-4 group-hover:text-red-600 transition-colors leading-none"
                  >
                    GITHUB
                  </h3>
                  <div
                    class="relative h-20 text-sm text-neutral-400 leading-relaxed [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-all duration-700 group-hover:text-white"
                  >
                    <span class="text-red-600 mr-1 font-bold">>></span>
                    访问我们的代码仓库，查看当前活跃项目，别忘了点亮 Star 和 Follow。
                  </div>
                </div>
                <div
                  class="flex justify-between items-end border-t border-white/20 pt-6 group-hover:border-red-600 transition-colors"
                >
                  <span class="text-[10px] font-bold uppercase opacity-40 italic">@TATENcn</span>
                  <div
                    class="text-2xl font-black translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  >
                    >>
                  </div>
                </div>
              </div>
              <div
                class="absolute inset-0 bg-red-600/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
              ></div>
            </NuxtLink>

            <NuxtLink
              to="https://qm.qq.com/q/RSYq4zfLCm"
              target="_blank"
              class="group relative h-[320px] border-r border-b border-white overflow-hidden bg-[#0a0a0a]"
            >
              <div
                class="absolute -right-4 -bottom-4 text-8xl font-black italic opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity uppercase"
              >
                QQ
              </div>
              <div class="relative h-full p-10 flex flex-col justify-between z-10">
                <div>
                  <div class="text-[10px] text-red-600 font-bold mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 bg-red-600"></span> [ QQ_GROUP_LINK ]
                  </div>
                  <h3
                    class="text-4xl font-black italic tracking-tighter uppercase mb-4 group-hover:text-red-600 transition-colors leading-none"
                  >
                    QQ_GROUP
                  </h3>
                  <div
                    class="relative h-20 text-sm text-neutral-400 leading-relaxed [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-all duration-700 group-hover:text-white"
                  >
                    <span class="text-red-600 mr-1 font-bold">>></span> 加入 QQ 群，展开技术交流。
                  </div>
                </div>
                <div
                  class="flex justify-between items-end border-t border-white/20 pt-6 group-hover:border-red-600 transition-colors"
                >
                  <span class="text-[10px] font-bold uppercase opacity-40 italic">TATEN_LEARN</span>
                  <div
                    class="text-2xl font-black translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  >
                    >>
                  </div>
                </div>
              </div>
              <div
                class="absolute inset-0 bg-red-600/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
              ></div>
            </NuxtLink>

            <NuxtLink
              to="https://qm.qq.com/q/NeWTRiJRaG"
              target="_blank"
              class="group relative h-[320px] border-b border-white overflow-hidden bg-[#0a0a0a]"
            >
              <div
                class="absolute -right-4 -bottom-4 text-8xl font-black italic opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity uppercase"
              >
                JN
              </div>
              <div class="relative h-full p-10 flex flex-col justify-between z-10">
                <div>
                  <div class="text-[10px] text-red-600 font-bold mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 bg-red-600 animate-ping"></span> [ JOIN_US ]
                  </div>
                  <h3
                    class="text-4xl font-black italic tracking-tighter uppercase mb-4 group-hover:text-red-600 transition-colors leading-none"
                  >
                    JOIN_NOW
                  </h3>
                  <div
                    class="relative h-20 text-sm text-neutral-400 leading-relaxed [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-all duration-700 group-hover:text-white"
                  >
                    <span class="text-red-600 mr-1 font-bold">>></span> 添加 Lin Mohan 的
                    QQ，提交加入申请。通过验证后即可加入团队。
                  </div>
                </div>
                <div
                  class="flex justify-between items-end border-t border-white/20 pt-6 group-hover:border-red-600 transition-colors"
                >
                  <span class="text-[10px] font-bold uppercase opacity-40 italic">@Lin_Mohan</span>
                  <div
                    class="text-2xl font-black translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  >
                    >>
                  </div>
                </div>
              </div>
              <div
                class="absolute inset-0 bg-red-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
              ></div>
            </NuxtLink>
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

  const currentFullText = texts[typingState.textIndex];
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

/**
 * UTILS: 辅助格式化函数
 */
const formatId = (index: number) => (index + 1).toString().padStart(2, "0");

const getMemberRole = (member: any, index: number) => {
  if (index === 0) return "FOUNDER";
  return (member.role || "MEMBER").toUpperCase();
};

const formatWebsite = (url?: string) => {
  return url ? url.replace(/^https?:\/\//, "") : "NO_WEBSITE";
};

/**
 * LIFECYCLE: 生命周期管理
 */
let metricsTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  // 核心初始化
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
/* 性能优化：强制开启 GPU 加速涉及动画的层 */
[clip-path] {
  will-change: clip-path;
}
/* 链接重置 */
a {
  text-decoration: none;
  color: inherit;
}
</style>

<style>
/* ===== 大滚动条：只有红色线，没有背景 ===== */
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 2px;
}

html::-webkit-scrollbar-track,
body::-webkit-scrollbar-track {
  background: transparent; /* 轨道透明 */
}

html::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-thumb {
  background: #dc2626; /* 红色线 */
  border-radius: 0;
}
/* Firefox */
html,
body {
  scrollbar-width: thin;
  scrollbar-color: #dc2626 transparent;
  background: #0a0a0a;
}
</style>
