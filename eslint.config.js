import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      // Disables ESLint rules that conflict with Prettier — keep this last.
      prettier,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // 路由文件天然同时导出「路由对象 + 组件」，豁免 fast-refresh 单一导出限制
    files: ['**/routes.tsx', '**/*Route.tsx', 'src/app/router.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // shadcn/ui 生成代码：保持与上游一致（组件文件含 variants、use-mobile 的 effect 写法），
    // 不手改以免 `shadcn add` 升级时被覆盖，故对这些目录放宽相关规则。
    files: ['src/components/ui/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    // 分层依赖方向（单向，自上而下）：app → features → 内核(lib/components/hooks/types/config)。
    // 内核层是“可整体搬走、零业务”的底座，绝不能反向依赖上层。
    files: [
      'src/lib/**/*.{ts,tsx}',
      'src/components/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}',
      'src/types/**/*.{ts,tsx}',
      'src/config/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/**', '@/features', '@/features/**'],
              message:
                '内核层（lib/components/hooks/types/config）不得依赖 app 或 features —— 依赖只能自上而下。',
            },
          ],
        },
      ],
    },
  },
  {
    // feature 之间禁止互相 import（要复用就下沉到 lib/components）；feature 也不得依赖组合根 app。
    // 同一 feature 内部请用相对路径（./），跨 feature 才会写成 @/features/<name>，故在此整体禁掉。
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/**', '@/features/*', '@/features/*/**'],
              message:
                'feature 之间禁止互相依赖（请下沉到 lib/components），且不得依赖 app；同 feature 内部用相对路径。',
            },
          ],
        },
      ],
    },
  },
])
