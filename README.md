# react-role-template

可复用的**多角色前端模板**。核心卖点：**角色 = 配置/数据，加角色不动核心代码**；鉴权、路由、权限、请求等骨架与 UI 组件库解耦，组件库可随时替换。

> 当前主题/字体处于「最小中性骨架」状态（单一亮色、系统字体），品牌色与暗色等设计层已剥离、按项目需要重建。详见「样式」。

## 技术栈

| 层         | 选型                                                  |
| ---------- | ----------------------------------------------------- |
| 构建       | Vite + React 19 + TypeScript                          |
| 路由       | TanStack Router（代码式，类型安全守卫）               |
| 服务端状态 | TanStack Query                                        |
| 本地状态   | Zustand                                               |
| 请求       | Axios（`withCredentials` + 统一拦截/解包/401 跳登录） |
| 表单       | react-hook-form + zod                                 |
| 样式       | Tailwind CSS v4 + shadcn（最小中性令牌，单一亮色）    |
| 规范       | ESLint + Prettier + husky + lint-staged + commitlint  |

## 快速开始

```bash
cp .env.example .env   # 按环境填写（见下方「环境变量」）
pnpm install
pnpm dev        # 开发服务器，VITE_API_BASE_URL 前缀自动代理到后端
pnpm build      # 类型检查 + 生产构建
pnpm lint       # ESLint
pnpm format     # Prettier 格式化
```

打开 http://localhost:5173 ，用真实账号登录（如 `ycht1` 教师 / `xs1` 学生）。

### 环境变量（`.env`）

| 变量                    | 必填       | 说明                                                           |
| ----------------------- | ---------- | -------------------------------------------------------------- |
| `VITE_APP_TITLE`        | 选填       | 站点标题：注入 `index.html` 的 `<title>`（暂不在页面内展示）   |
| `VITE_API_BASE_URL`     | 必填       | axios baseURL。开发期填相对前缀（如 `/ulps`）以走代理规避 CORS |
| `VITE_API_PROXY_TARGET` | 开发期必填 | dev server 代理目标（后端真实地址），仅开发期使用              |

环境变量在启动时由 `config/env.ts`（zod）校验，缺漏/非法即中止启动。生产部署时由网关把 `VITE_API_BASE_URL` 前缀转发到后端，或将其填为完整后端 URL 直连。

## 鉴权约定

- 无 token，账号密码登录后后端 set-cookie（`USESSIONID`）；请求自动带 cookie（`withCredentials`）。
- 登录接口 `POST {baseURL}/login`（form-urlencoded），响应 `data` 仅为角色串（如 `TEACHER`）；
  前端据此映射为本地 `Role`（小写）并请求 `GET {baseURL}/{role}/self` 拿用户详情。
- `self` 接口按角色分路径，故登录时把角色缓存到 localStorage（仅作「提示」，非鉴权凭据），刷新后据此精确命中 `/{role}/self`。
- 401 由 axios 拦截器统一跳登录；登录态探测请求标记 `silent`，其 401 不触发跳转。
- 后端响应 envelope：`{ code, msg, data }`，`code === '00000'` 为成功（拦截器自动解包，见 `lib/api-client.ts`）。

## 目录结构

```
src/
  app/            应用装配
    providers.tsx   Provider 树（ErrorBoundary/Query/Tooltip/Toaster）+ RouterProvider + 401 处理器注入
    router.tsx      路由聚合（公共路由 + 各 feature 子树）+ Router 实例
  lib/            与角色无关的「内核库」
    api-client.ts   axios 实例 + 拦截器 + 401 注册点 + 类型化 http
    react-query.ts  QueryClient + 全局错误 toast + meta 类型增强
    root-route.tsx  根路由（各 feature 路由子树的 parent）
    auth/           鉴权能力：api / queries / useAuth / guard，对外只暴露 index.ts
    utils.ts        cn() 等工具
  components/
    ui/             shadcn 原子组件（可整体替换）
    errors/         兜底页：ErrorPage / NotFoundPage / ForbiddenPage / BlankLayout / AppErrorFallback
  config/
    env.ts          ★ 启动期环境变量校验（zod）；应用名等部署期配置的类型安全入口
    roles.ts        ★ 角色单一数据源（Role 类型的根来源）
  features/         按角色/领域分区，各自自包含（业务在此填充）
    auth/           登录页 + /login 路由
    student/        各角色统一形态：layout/ + pages/ + routes.tsx + index.ts（导出路由子树）
    teacher/
    admin/
  types/            CurrentUser 等领域类型
  hooks/            通用 hooks（use-mobile…）
  main.tsx          入口（先校验 env，再挂载 App）
  index.css         Tailwind + 最小中性令牌（单一亮色）
```

> 组织规则一句话：**`features/<角色>/` 装会随项目变的角色业务；`lib/`（内核）+ `config/` + `components/` + `types/` 装与角色无关的不变骨架**。没有 `shared/` 中间层；每个 feature 通过 `index.ts` 只导出自己的路由子树，由 `app/router.tsx` 聚合。

## 如何新增一个角色

以「科室主任 director」为例，**不改任何核心代码**：

1. `src/config/roles.ts` 加一行：`director: { label: '科室主任', home: '/director' }`
2. 新建 `src/features/director/`（可整体复制现有角色目录起步）：
   - `layout/DirectorLayout.tsx`：本角色布局外壳
   - `pages/*`：页面组件
   - `routes.tsx`：布局路由用 `protect(['director'])` 守卫整片子树，挂上各页面，导出 `directorRouteTree`
   - `index.ts`：`export { directorRouteTree } from './routes'`
3. `src/app/router.tsx` 把 `directorRouteTree` 加进聚合数组

完成 —— 守卫与按角色重定向（`config/roles.ts` 的 `getRoleHome`）自动生效。

## 权限机制

- 路由声明所需角色：`protect(['teacher'])`，挂在角色布局路由上，守卫整片子路由。
- 守卫（`beforeLoad`）比对「路由声明的角色」与「当前用户角色」，决定放行 / 403 / 跳登录——**没有任何 `if (role === 'xxx')` 硬编码**。
- 组件内判角色用 `useAuth().hasRole(...)` / `hasAnyRole(...)`，不要直接写 `user.roles.includes(...)`：将来升级到「权限码」体系（角色 = 权限码集合）只改 `useAuth` 一处。
- 当前为**角色级**粒度；导航菜单暂未内置（布局为最小骨架），由各项目自行在布局内渲染。

## 样式

当前为**最小中性主题**，目的是让 shadcn 原语不失色、又不绑定任何品牌设计：

- 仅一套中性灰阶亮色令牌，变量名完全沿用 shadcn 约定（`--primary`/`--background`...），写在 `src/index.css`；`components/ui/*` 一行不用改，组件库可随时替换。
- **暂无暗色模式**：保留了 `dark` 变体声明但永不挂 `.dark` 类，全站稳定渲染为亮色（无需逐个改 shadcn 组件）。
- 字体为系统字体栈（`--font-sans`），无自托管字体依赖。
- 品牌色、状态色、阴影、字阶、动效、暗色、字体等设计层已剥离；落地项目按需在 `index.css` 重建令牌即可。
