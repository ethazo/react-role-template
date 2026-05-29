# 阿里巴巴普惠体（自行下载转换后投放到本目录）

> 当前已放置：`alibaba-400/500/700.woff2`（普惠体 3.0 Regular/Medium/Bold 的**完整 woff2**，
> 各约 5MB，未做子集裁剪）。仅在切到「阿里巴巴普惠体」时按需懒加载。
> 若日后想缩小体积，可按下文「方式 A / B」裁剪成子集再替换同名文件。


普惠体官网只提供 TTF/OTF（且文件较大），无法用 npm 直接安装，需手动下载并转换为
**woff2 子集**后放到本目录。`FONT_PRESET = 'alibaba-puhuiti'`（或界面切换到「阿里巴巴普惠体」）
即生效；**本目录为空时不报错，自动回落系统字体**。

转换/投放成功后，到 `src/config/theme.ts` 把 `DEFAULT_FONT` 改为 `'alibaba-puhuiti'`
即可设为默认，或运行时用右上角字体切换按钮选择。

---

## 1. 下载字体

官网：<https://www.alibabafonts.com/#/font> （阿里巴巴普惠体 3.0，**免费商用**）

建议下载 3 个常用字重（对应 CSS 400 / 500 / 700）：

| CSS 字重 | 普惠体 3.0 命名（示例） |
| -------- | ----------------------- |
| 400      | AlibabaPuHuiTi-3-55-Regular |
| 500      | AlibabaPuHuiTi-3-65-Medium  |
| 700      | AlibabaPuHuiTi-3-85-Bold    |

## 2. 转换为 woff2 子集（二选一）

### 方式 A：单文件子集（推荐，最省事）

用 fonttools 把每个字重裁剪 + 转成单个 woff2，文件名**必须含字重数字**：

```bash
pip install fonttools brotli

pyftsubset "AlibabaPuHuiTi-3-55-Regular.ttf" \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2000-206F,U+3000-303F,U+3040-30FF,U+FF00-FFEF,U+4E00-9FFF" \
  --flavor=woff2 --layout-features='*' \
  --output-file="alibaba-400.woff2"
# 对 500 / 700 同理，分别产出 alibaba-500.woff2 / alibaba-700.woff2
```

把产出的 `alibaba-400.woff2` 等**直接放到本目录**即可。
> 上面的 unicode 范围含完整 CJK 区（U+4E00-9FFF），覆盖最全但单文件约 4–5MB。
> 想更小（~1MB），把 `--unicodes=...` 换成 `--text-file=常用字.txt`（自备常用字表），
> 或改用下面的方式 B（按字频自动精简）。

### 方式 B：cn-font-split 分包（体积最小，按需加载）

```bash
# 中国大陆网络可先：set CN_FONT_SPLIT_GH_HOST=https://ik.imagekit.io/github
pnpm add -D cn-font-split

# 每个字重输出到一个子目录；务必把 family 命名为 Alibaba PuHuiTi、并指定对应字重
npx cn-font-split -i ./AlibabaPuHuiTi-3-55-Regular.ttf --out-dir ./400 \
  --font-family "Alibaba PuHuiTi" --font-weight 400
```

把生成的子目录（含 `.css` 与若干 woff2 分块）整个放到本目录下，例如
`alibaba-puhuiti/400/`、`/500/`、`/700/`。加载器会自动 import 其中的 `.css`。
> 关键：`.css` 里的 `font-family` 必须是 `Alibaba PuHuiTi`，否则字体栈匹配不上。
> 若你的 cn-font-split 版本没有 `--font-family` 参数，用其 JS API 的 `css.fontFamily` 设置。

## 3. 验证

`pnpm dev` → `/showcase`，右上角字体切到「阿里巴巴普惠体」，中文应变为普惠体；
`pnpm build` 后确认 `dist/assets` 下只有该字体的 **woff2**（无 woff）。
