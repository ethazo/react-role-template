import { GraduationCapIcon, MonitorPlayIcon, TrophyIcon } from 'lucide-react'
import { APP_NAME, APP_LOGO_TEXT } from '@/config/app'

const features = [
  { icon: MonitorPlayIcon, title: '在线学习', desc: '解剖、生理、诊断等课程随时学' },
  { icon: TrophyIcon, title: '技能竞赛', desc: '临床技能大赛，以赛促学检验所学' },
  { icon: GraduationCapIcon, title: '教学管理', desc: '课程、班级、成绩一站式管理' },
]

/**
 * 登录页左侧品牌展示区（仅大屏显示）。
 * 用品牌令牌做渐变 + 几何光晕，承载平台定位与核心特性——
 * 把「登录」从一张孤零零的卡片，升级为有品牌叙事的入口。
 */
export function LoginBrandPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-accent text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
      {/* 装饰光晕 */}
      <div className="absolute -top-24 -left-16 size-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-[-4rem] size-80 rounded-full bg-brand-accent/30 blur-3xl" />
      {/* 网格纹理 */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-white/15 text-lg font-bold backdrop-blur">
          {APP_LOGO_TEXT}
        </span>
        <span className="font-heading text-lg font-semibold">{APP_NAME}</span>
      </div>

      <div className="relative space-y-8">
        <div className="space-y-3">
          <h2 className="font-heading text-3xl font-bold tracking-tight">医学教学与竞赛平台</h2>
          <p className="max-w-sm text-sm text-primary-foreground/80">
            面向医学生、临床教师与管理者，连接日常教学与各类技能竞赛，让学与教都更高效。
          </p>
        </div>

        <ul className="space-y-5">
          {features.map((f) => (
            <li key={f.title} className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
                <f.icon className="size-5" />
              </span>
              <div>
                <p className="font-medium">{f.title}</p>
                <p className="text-sm text-primary-foreground/75">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-xs text-primary-foreground/60">
        © {APP_NAME} · 教学与竞赛一体化平台
      </p>
    </div>
  )
}
