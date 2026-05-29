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
])
