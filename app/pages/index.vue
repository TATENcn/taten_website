<template>
  <div class="container">
    <div ref="landerRef" class="lander">
      <div
        class="lander-content"
        :style="{ transform: `translateY(${landerOffsetY}px)` }"
      >
        <h1 class="main-title">TATEN</h1>
        <div class="typing-container">
          <span class="typed-text">{{ currentText }}</span>
          <span class="cursor" :class="{ typing: isTyping }">|</span>
        </div>
      </div>
    </div>

    <div class="about">
      <div class="title">关于我们</div>
      <div class="introduction">
        TATEN 是一个充满活力的计算机科学交流团队，
        汇聚了来自不同背景的技术爱好者，成员年龄从小学六年级到高中三年级。
        我们致力于探索计算机科学的前沿领域，分享知识与经验，共同成长。
        在这里，每个人都能找到属于自己的技术道路，从系统编程到前端开发，从算法竞赛到创新项目，我们用代码连接世界，用技术改变未来。
      </div>
    </div>

    <div class="members">
      <div class="title">团队成员</div>
      <div class="member-items">
        <div
          v-for="member in members"
          :key="member.name"
          class="member-wrapper"
        >
          <MemberCard :value="member" />
        </div>
      </div>
    </div>

    <div class="projects">
      <div class="title">团队项目</div>
      <div class="projects-items">
        <div
          v-for="project in projects"
          :key="project.title"
          class="project-wrapper"
        >
          <ProjectCard :value="project" />
        </div>
      </div>
    </div>

    <div class="contact">
      <div class="title">联系我们</div>
      <div class="contact-items">
        <nuxt-link class="contact-item" href="https://github.com/TATENcn">
          GitHub：TATEN
        </nuxt-link>
        <nuxt-link class="contact-item" href="https://qm.qq.com/q/NeWTRiJRaG">
          QQ：2113836986
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useMembers } from "~/assets/data/members";
import { useProject } from "~/assets/data/projects";
import { useTypingText } from "~/assets/data/typing-text";

const members = useMembers();
const projects = useProject();
const typingTexts = useTypingText();

const currentText = ref("");
const textIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);
const isTyping = ref(false);
const typingSpeed = ref(100);
const deletingSpeed = ref(50);
const delayBetweenTexts = ref(2000);
let typingTimer: ReturnType<typeof setTimeout> | null = null;

const landerRef = ref<HTMLElement | null>(null);
const landerOffsetY = ref(0);
let scrollHandler: (() => void) | null = null;

const typeText = () => {
  if (typingTexts.length === 0) return;

  const currentTextItem = typingTexts[textIndex.value];

  if (!currentTextItem) return;

  if (!isDeleting.value) {
    if (charIndex.value < currentTextItem.length) {
      currentText.value = currentTextItem.substring(0, charIndex.value + 1);
      charIndex.value++;
      isTyping.value = true;
      typingTimer = setTimeout(typeText, typingSpeed.value);
    } else {
      isTyping.value = false;
      typingTimer = setTimeout(() => {
        isDeleting.value = true;
        typeText();
      }, delayBetweenTexts.value);
    }
  } else {
    if (charIndex.value > 0) {
      currentText.value = currentTextItem.substring(0, charIndex.value - 1);
      charIndex.value--;
      isTyping.value = true;
      typingTimer = setTimeout(typeText, deletingSpeed.value);
    } else {
      isDeleting.value = false;
      isTyping.value = false;
      textIndex.value = (textIndex.value + 1) % typingTexts.length;
      typingTimer = setTimeout(typeText, typingSpeed.value);
    }
  }
};

const handleScroll = () => {
  if (!landerRef.value) return;

  const scrollY = window.scrollY;
  landerOffsetY.value = scrollY * 0.4;
};

onMounted(() => {
  if (typingTexts.length > 0) {
    typeText();
  }

  scrollHandler = () => handleScroll();
  window.addEventListener("scroll", scrollHandler);
});

onUnmounted(() => {
  if (typingTimer) {
    clearTimeout(typingTimer);
  }

  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
  }
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.lander {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: -20px -20px 40px -20px;

  .lander-content {
    transition: transform 0.1s ease-out;

    .main-title {
      font-size: 5rem;
      font-weight: 700;
      margin-bottom: 30px;
      color: #333;
      text-shadow:
        0 0 3px #bbb,
        0 0 6px #bbb,
        0 0 9px #bbb;
      animation: glow 1.5s ease-in-out infinite alternate;

      @keyframes glow {
        from {
          text-shadow:
            0 0 3px #bbb,
            0 0 6px #bbb,
            0 0 9px #bbb;
        }
        to {
          text-shadow:
            0 0 5px #bbb,
            0 0 10px #bbb,
            0 0 15px #bbb;
        }
      }
    }

    .typing-container {
      font-size: 1.5rem;
      color: #666;
      min-height: 2rem;
      text-shadow:
        0 0 1px #ccc,
        0 0 3px #ccc;

      .typed-text {
        display: inline-block;
      }

      .cursor {
        display: inline-block;
        margin-left: 3px;
        opacity: 1;
        animation: blink 1s infinite;
        text-shadow:
          0 0 1px #ccc,
          0 0 3px #ccc;

        &.typing {
          animation: none;
          opacity: 1;
        }
      }

      @keyframes blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
      }
    }
  }
}

.about,
.members,
.projects,
.contact {
  margin-block-start: 2rem;
  margin-block-end: 40px;

  .title {
    font-size: 2rem;
    font-weight: 500;
    color: #333;
    margin-block-end: 20px;
    padding-block-end: 10px;
    border-block-end: 1px solid #e5e5e5;
    text-align: center;
  }

  .introduction {
    color: #555;
    line-height: 1.8;
    font-size: 1.1rem;
  }
}

.member-items,
.projects-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.contact-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  .contact-item {
    color: #666;
    text-decoration: none;
    padding: 12px 24px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    background-color: #fafafa;

    &:hover {
      color: #333;
      border-color: #ccc;
      background-color: #f0f0f0;
    }
  }
}
</style>
