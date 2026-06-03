import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './config/env' // 最先执行：环境变量校验不通过则直接中止启动
import './index.css'
import { App } from './app/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
