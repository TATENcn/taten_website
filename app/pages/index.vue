<template>
  <div class="container">
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
import { useMembers } from "~/assets/data/members";
import { useProject } from "~/assets/data/projects";

const members = useMembers();
const projects = useProject();
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .about,
  .members,
  .projects,
  .contact {
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
}
</style>
