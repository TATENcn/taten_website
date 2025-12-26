import { defineEventHandler } from "h3";

export default defineEventHandler((): IProject[] => {
  return [
    {
      imageUrl:
        "https://s1.imagehub.cc/images/2025/12/26/33c3e7db0474656b1efaec68880a230a.jpg",
      title: "TATEN OJ",
      description: "新一代高性能 OJ，加急开发中。",
      targetUrl: "",
    },
    {
      imageUrl:
        "https://s1.imagehub.cc/images/2025/12/26/e1ef5ce5cdc8cbff0ee38d4007d7ff21.png",
      title: "Aniday",
      description: "二次元角色生日与节日查询网站，正在写重置版。",
      targetUrl: "https://aniday.xyz/",
    },
    {
      imageUrl:
        "https://s1.imagehub.cc/images/2025/12/26/0c6c8a4c607438f7f5e04cbeb740ce34.png",
      title: "LinMH 的 B 站账号",
      description: "Lin Mohan 的 B 站账号，现在是新人 up 主，想要大家的关注！",
      targetUrl: "https://space.bilibili.com/2126856300",
    },
  ];
});

export interface IProject {
  imageUrl: string;
  title: string;
  description: string;
  targetUrl: string;
}
