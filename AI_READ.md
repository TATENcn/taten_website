# AI 项目修改规范

## 组件相关

1. 所有使用的组件必须创建在 `app/components` 目录下
2. 所有组件必须被使用
3. 组件设计时不考虑上层样式（如不考虑父组件可用的 `width`、`height`，父组件是否使用 `flex`/`grid` 布局等）
4. 不可直接使用 absolute 布局，组件内使用 relative 和 absolute 布局
5. 组件 props 必须有明确的类型定义
6. 组件内部状态管理应使用 Composition API

## 项目相关

1. 包管理器及运行时使用 `bun` 的最新版本
2. 代码修改完成后运行 `bun run format` 执行格式化脚本
3. 使用 TypeScript 进行类型检查，启用严格模式
4. 使用 UnoCSS 进行样式开发，遵循原子化 CSS 原则
5. 遵循 Nuxt 3 的目录结构和约定
6. 服务端 API 路由放置在 `server/api` 目录下
7. 静态资源放置在 `public` 目录下

## 代码规范

1. 使用 ESLint 进行代码检查，遵循默认的规则
2. 行长度不超过 120 个字符
3. 使用驼峰命名法命名变量和函数
4. 使用 PascalCase 命名组件和类
5. 使用 kebab-case 命名文件和文件夹
6. 使用 TypeScript 的 interface 或 type 定义数据结构
7. 组件模板中使用 PascalCase 命名组件

## 提交规范

1. 使用 `Angular` 提交规范
2. 提交信息前不添加额外的 UNICODE 字符
3. 提交信息必须语义化
4. 提交时必须完全处理 ESLINT 的所有 ERROR 提示（WARNING 可暂时忽略）
5. 提交类型包括: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
