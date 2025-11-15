<template>
  <div class="max-w-screen-xl mx-auto p-8">
    <!-- Lander -->
    <div
      ref="landerRef"
      class="h-screen flex items-center justify-center text-center"
      :style="{ transform: `translateY(${landerOffsetY}px)` }"
    >
      <div class="flex items-center flex-col">
        <LazyNuxtImg src="/favicon-new.svg" alt="favicon" class="h-24 mb-8" />
        <div class="text-2xl color-neutral-600 min-h-8">
          {{ currentText }}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-y-16">
      <!-- About Us -->
      <div>
        <div class="title">关于我们</div>
        <div class="color-neutral-800 text-xl leading-loose">
          TATEN 是一个充满活力的计算机科学交流团队，
          汇聚了来自不同背景的技术爱好者，成员年龄从初一到本科。
          我们致力于探索计算机科学的前沿领域，分享知识与经验，共同成长。
          在这里，每个人都能找到属于自己的技术道路，从系统编程到前端开发，从算法竞赛到创新项目，我们用代码连接世界，用技术改变未来。
        </div>
      </div>

      <!-- Members -->
      <div>
        <div class="title">团队成员</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="member in members" :key="member.name">
            <MemberCard :data="member" />
          </div>
        </div>
      </div>

      <!-- Projects -->
      <div>
        <div class="title">团队项目</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in projects"
            :key="project.title"
            class="project-wrapper"
          >
            <ProjectCard :data="project" />
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div>
        <div class="title">联系我们</div>
        <div class="flex flex-wrap gap-8 justify-center">
          <nuxt-link
            class="text-neutral-800 no-underline py-2 px-4 border border-neutral-200 bg-neutral-100 hover:border-neutral-300 hover:bg-neutral-200 transition flex items-center"
            href="https://github.com/TATENcn"
          >
            GitHub：TATEN
          </nuxt-link>
          <nuxt-link
            class="text-neutral-800 no-underline py-2 px-4 border border-neutral-200 bg-neutral-100 hover:border-neutral-300 hover:bg-neutral-200 transition flex items-center"
            href="https://qm.qq.com/q/RSYq4zfLCm"
          >
            QQ：加入交流群
          </nuxt-link>
          <nuxt-link
            class="text-neutral-800 no-underline py-2 px-4 border border-neutral-200 bg-neutral-100 hover:border-neutral-300 hover:bg-neutral-200 transition flex items-center"
            href="https://qm.qq.com/q/rTx4p8vrZC"
          >
            QQ：加入 TATEN
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.title {
  @apply text-4xl text-neutral-800 mb-8 pb-4 border-b border-neutral-200 text-center;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 从服务器获取成员和项目数据
const { data: members } = await useFetch("/api/members");
const { data: projects } = await useFetch("/api/projects");
const { data: typingTexts } = await useFetch("/api/typing-text");

const currentText = ref("");
const textIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);
let typingTimer: ReturnType<typeof setTimeout> | null = null;

const landerRef = ref<HTMLElement | null>(null);
const landerOffsetY = ref(0);

const typeText = () => {
  if (!typingTexts.value?.length) return;

  const current = typingTexts.value[textIndex.value];
  if (!current) return;

  if (!isDeleting.value && charIndex.value < current.length) {
    currentText.value = current.substring(0, ++charIndex.value);
    typingTimer = setTimeout(typeText, 100);
  } else if (!isDeleting.value) {
    typingTimer = setTimeout(() => {
      isDeleting.value = true;
      typeText();
    }, 2000);
  } else if (charIndex.value > 0) {
    currentText.value = current.substring(0, --charIndex.value);
    typingTimer = setTimeout(typeText, 50);
  } else {
    isDeleting.value = false;
    textIndex.value = (textIndex.value + 1) % typingTexts.value.length;
    typeText();
  }
};

const handleScroll = () => {
  if (landerRef.value) {
    landerOffsetY.value = window.scrollY * 0.4;
  }
};

onMounted(() => {
  if (typingTexts.value?.length) {
    typingTimer = setTimeout(typeText, 100);
  }
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
  window.removeEventListener("scroll", handleScroll);
});
</script>
