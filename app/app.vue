<template>
  <nuxt-page />
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "TATEN",
  description: "计算机科学交流团队",
  keywords: "计算机科学,编程社区,技术交流",

  ogTitle: "TATEN",
  ogDescription: "计算机科学交流团队",
  ogImage: "/favicon.png",
  ogUrl: "https://taten.xyz",
  ogType: "website",
  ogLocale: "zh",

  twitterTitle: "TATEN | 计算机科学交流团队",
  twitterDescription: "用代码连接世界，用技术改变未来",
  twitterImage: "/favicon.png",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "zh",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-new.png",
    },
    {
      rel: "canonical",
      href: "https://taten.xyz",
    },
  ],
});
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
