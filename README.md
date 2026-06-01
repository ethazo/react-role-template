# react-role-template

可复用的**多角色前端模板**。核心卖点：**角色 = 配置/数据，加角色不动核心代码**；鉴权、路由、权限、请求等骨架与 UI 组件库解耦，组件库可随时替换。

## 技术栈

| 层         | 选型                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| 构建       | Vite + React 19 + TypeScript                                                  |
| 路由       | TanStack Router（代码式，类型安全守卫）                                       |
| 服务端状态 | TanStack Query                                                                |
| 本地状态   | Zustand                                                                       |
| 请求       | Axios（`withCredentials` + 统一拦截/解包/401 跳登录）                         |
| 表单       | react-hook-form + zod                                                         |
| 样式       | Tailwind CSS v4 + shadcn（分层令牌主题，详见「主题系统」）                    |
| 后端       | 真实接口（Vite 代理到 `http://duomokuai.ulps.local.lzlzlzlz.xyz`，规避 CORS） |
| 规范       | ESLint + Prettier + husky + lint-staged + commitlint                          |

## 快速开始

```bash
pnpm install
pnpm dev        # 开发服务器，/ulps 自动代理到真实后端
pnpm build      # 类型检查 + 生产构建
pnpm lint       # ESLint
pnpm format     # Prettier 格式化
```

打开 http://localhost:5173 ，用真实账号登录（如 `ycht1` 教师 / `xs1` 学生）。

后端地址在 `vite.config.ts` 的 `server.proxy` 中配置；生产部署时让网关把 `/ulps` 转发到后端即可。

## 鉴权约定

- 无 token，账号密码登录后后端 set-cookie（`USESSIONID`）；请求自动带 cookie（`withCredentials`）。
- 登录接口 `POST /ulps/login`（form-urlencoded），响应 `data` 仅为角色串（如 `TEACHER`）；
  前端据此映射为本地 `Role`（小写）并请求 `GET /ulps/{role}/self` 拿用户详情。
- 登录态靠各角色 `self` 接口判断；前端用 localStorage 缓存「角色提示」以决定刷新后调哪个 self。
- 401 由 axios 拦截器统一跳登录（登录态探测请求标记 `silent`，401 不触发跳转）。
- 后端响应 envelope：`{ code, msg, data }`，`code === '00000'` 为成功（见 `src/shared/api`）。

## 目录结构

```
src/
  app/          应用装配：providers、router 聚合、rootRoute、queryClient
  shared/       与角色无关的基础设施
    api/          axios 实例 + 拦截器 + 401 注册点
    auth/         /me 查询、useAuth、guard（protect/withNav）、useNavigation
    components/   通用无业务 UI
    types/        CurrentUser / RouteMeta（含 staticData 类型增强）
  config/
    roles.ts      ★ 角色单一数据源（Role 类型的根来源）
    theme.ts      ★ 主题单一数据源（默认皮肤 / 字体 / 是否允许切换）
  shared/theme/
    tokens/       分层 CSS 令牌：primitives(图表色板) → brands/*(品牌主色) → semantic(完整主题，移植自 HeroUI)
    brand.ts      品牌皮肤运行时应用（data-brand）
    fonts.ts      字体预设运行时应用（按需加载本地 woff2）
  modules/      按角色分区，各自自包含
    student/      自定义顶部导航布局（演示非侧边菜单形态）
    teacher/      共享 SidebarLayout
    admin/        共享 SidebarLayout（页面为占位，业务内容按项目填充）
  layouts/      可选布局：SidebarLayout / BlankLayout
  pages/        公共页：login / 403 / 404 / error / showcase（设计系统展示）
```

## 如何新增一个角色

以「科室主任 director」为例，**不改任何核心代码**：

1. `src/config/roles.ts` 加一行：`director: { label: '科室主任', home: '/director' }`
2. 新建 `src/modules/director/`，写 `routes.tsx`（选一个布局，用 `protect(['director'])` 守卫，子页面用 `withNav` 声明导航）
3. `src/app/router.tsx` 把 `directorRouteTree` 加进聚合数组

完成 —— 守卫、导航、按角色重定向全部自动生效。

## 权限机制

- 路由声明所需角色：`protect(['teacher'])` / `withNav(['teacher'], nav)`，元信息写在路由 `staticData`。
- 守卫（`beforeLoad`）比对「路由声明的角色」与「当前用户角色」，决定放行 / 403 / 跳登录——**没有任何 `if (role === 'xxx')` 硬编码**。
- 导航由 `useNavigation()` 从「路由表 + 当前角色」自动派生，是「数据」而非固定的左侧菜单；各布局自行决定渲染形态。
- 当前为**角色级**粒度；未来要按钮级可平滑升级为权限码体系（角色 = 权限码集合）。

## 主题系统

面向**教育 / 教学**场景（学生·教师内部系统、比赛/演示系统）的可复用主题底座：明亮专业的科技蓝、活力橙点缀、完整状态色、中文字体，**换项目不改组件代码**。配色移植自 [HeroUI](https://heroui.com) 默认主题。访问 `/showcase` 可实时预览并切换皮肤 / 字体 / 明暗。

### 分层令牌（职责清晰，换主色只动品牌层）

```
① 图表色板 primitives.css   仅 5 个图表分类色 --viz-*，与主题解耦，几乎永不改
② 品牌主色 brands/*.css     只定义 --brand-* 色阶 + 暖色点缀 --brand-accent；换主色色相 = 换这一组值
        ↓ 被引用
③ 语义令牌 semantic.css     完整主题（移植自 HeroUI）：--primary 引用品牌层，
                            中性面 / 状态色 / 明暗两套都在此；变量名沿用 shadcn 约定
```

- **变量名完全沿用 shadcn 约定**（`--primary`/`--background`...），所以 `components/ui/*` 一行都不用改，组件库可随时替换。
- 状态语义色：`bg-success` / `text-warning` / `border-info` / `bg-destructive` 直接可用；success / warning 用**深色前景**（亮色底上才清晰）。
- 暖色点缀：`bg-brand-accent` / `text-brand-accent`（徽章 / CTA / 图表高亮）。
- 全程 **oklch** 色彩空间，明暗模式对比度一致。

### 切换 / 新增皮肤

内置两套：`heroui`（科技蓝，默认）/ `violet`（创想紫），暖橙点缀共用。

- 皮肤由**代码决定**（产品级模板默认不向终端用户暴露皮肤切换控件）：改 `src/config/theme.ts` 的 `DEFAULT_BRAND`，或在代码里调用 `setBrand('violet')`（写 `<html data-brand>` + 持久化）。
- **新增一套皮肤**（如 `green` 生机绿）：① `config/theme.ts` 的 `BRANDS` 加一行 → ② `tokens/brands/green.css` 定义 `[data-brand='green']` 的 `--brand-*` 色阶（含 `--brand-accent`） → ③ `index.css` 加一行 `@import`。完成，全站自动支持。
- 推荐用 [tweakcn.com](https://tweakcn.com) 可视化调色并导出，或 [oklch.com](https://oklch.com) 取色；主色注意避开「正常 = 绿」语义。

### 字体（内网 / 信创友好）

`src/config/theme.ts` 的 `FONT_PRESET` 控制：

- `system`（默认）：系统中文字体栈（苹方/鸿蒙/雅黑/思源），**零加载、天然离线**。
- `noto-sans-sc`：思源黑体，随 `@fontsource/noto-sans-sc` **本地自托管**，运行时**按需加载**简体常用字子集（各字重约 1.1MB woff2，`font-display: swap`，生僻字回落系统字体）。**全程同源、不依赖任何外网 CDN**，适合内网部署。仅打包 woff2（不含 woff）。
- `alibaba-puhuiti`：阿里巴巴普惠体（免费商用）。官网只提供 TTF/OTF，需自行下载并转换为 woff2 子集后投放到 `src/assets/fonts/alibaba-puhuiti/`，**该目录为空时自动回落系统字体**。详细下载/转换步骤见该目录下的 `README.md`。
- 英文 / 数字始终优先 Geist，中文落到对应中文字体；表格数字默认等宽对齐（`tabular-nums`）。
- 新增字体：把本地 woff2 装进来，在 `shared/theme/fonts.ts` 的 `FONT_PRESETS` 登记字体栈与加载器即可。

> 皮肤与字体均**由代码决定、不暴露给终端用户**（产品级默认）。唯一面向用户的外观开关是右上角的**明暗切换** `ModeToggle`。
> `config/app.ts` 收敛应用名/副标题/Logo 文案，新项目改这一处即可。
