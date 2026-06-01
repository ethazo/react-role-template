/**
 * 应用级配置单一数据源 (Single source of truth for app identity).
 *
 * 与 config/roles.ts、config/theme.ts 同一套哲学：会随「具体项目」变化的东西收敛到一处，
 * 由代码决定、不暴露给终端用户。新项目落地时改这里即可：应用名、副标题、Logo 文案。
 */

/** 应用名称：显示在侧边栏品牌区、登录页等处 */
export const APP_NAME = '智学云'

/** 应用副标题/简介：登录页等处的辅助说明，可留空 */
export const APP_DESCRIPTION = '面向医学生与临床教师的教学与竞赛平台'

/** 品牌 Logo 占位文案（取应用名首字），有正式 Logo 时替换为 <img> 即可 */
export const APP_LOGO_TEXT = APP_NAME.slice(0, 1)
