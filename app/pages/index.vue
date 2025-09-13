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
        <MemberCard
          v-for="member in members"
          :key="member.name"
          :value="member"
          class="member-item"
        />
      </div>
    </div>

    <div class="projects">
      <div class="title">团队项目</div>
      <div class="projects-items">
        <ProjectCard
          v-for="project in projects"
          :key="project.title"
          :value="project"
          class="project"
        />
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
