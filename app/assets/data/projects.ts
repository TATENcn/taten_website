export const useProject = (): IProject[] => [
  {
    imageUrl:
      "https://s1.imagehub.cc/images/2025/07/30/e3d56fc6d07d66d1700d1a3ede2c1ad1.png",
    title: "susan的视频",
    description: "探索数学与编程的奇妙世界，用视频记录学习的点滴收获。",
    targetUrl: "https://www.bilibili.com/video/BV19QY5egEp3",
  },
  {
    imageUrl:
      "https://s1.imagehub.cc/images/2025/07/30/99ab3b8a703d186b643809d7e88e8bd0.png",
    title: "林墨瀚的书库",
    description: "汇集计算机科学经典书籍，构建知识分享的数字图书馆。",
    targetUrl: "http://book.linmohan.fun",
  },
  {
    imageUrl:
      "https://s1.imagehub.cc/images/2025/07/31/6a1f3c07b063e2da6b31a55944b37c1e.png",
    title: "Rhythm Riddle",
    description: "HungryHenry 使用 Flutter 开发的猜歌游戏，多平台支持",
    targetUrl: "https://github.com/hungryhenry101/Rhythm-Riddle",
  },
];

export interface IProject {
  imageUrl: string;
  title: string;
  description: string;
  targetUrl: string;
}
