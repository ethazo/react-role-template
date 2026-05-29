import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './config/env' // 最先执行：环境变量校验不通过则直接中止启动
import './index.css'
import { applyBrand } from './shared/theme/brand'
import { applyFontPreset } from './shared/theme/fonts'
import { App } from './app/providers'

// 渲染前先把品牌皮肤与字体落到 <html>，避免首屏闪烁
applyBrand()
applyFontPreset()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
