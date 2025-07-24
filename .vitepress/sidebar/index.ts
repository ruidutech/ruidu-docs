import type { DefaultTheme } from 'vitepress'
import { deeprobot01Sidebar } from './deeprobot01'
import { deeprobot03Sidebar } from './deeprobot03'
import { orbitcontrolSidebar } from './orbitcontrol'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/deeprobot01/': deeprobot01Sidebar,
  '/deeprobot03/': deeprobot03Sidebar,
  '/orbitcontrol/': orbitcontrolSidebar,
} 