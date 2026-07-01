import path from 'path';
// 从 sidebar index 导入所有模块
import { sidebar as sidebarConfig } from '../../../.vitepress/sidebar';

type SidebarItem = any;
type Page = {
  path: string;
  title: string;
  group?: string;
};

type ResolvedPath = {
  module: string;
  path: string;
  subPath: string;
  pages: Page[];
};

// 从 sidebar index 提取模块映射
const sidebarModules = (sidebarConfig || {}) as Record<string, SidebarItem[]>;

/**
 * 从 sidebar 配置中查找匹配的页面
 */
function findPagesByPath(sidebar: SidebarItem[], pathStr: string): Page[] {
  if (!pathStr || pathStr.trim() === '') {
    return flattenPages(sidebar);
  }

  const parts = pathStr.split('>').map(p => p.trim());

  if (parts.length === 1) {
    const groupName = parts[0];
    const group = sidebar.find(item => item.text === groupName);

    if (group && group.items) {
      return extractPagesFromItems(group.items, groupName);
    }

    return findPageByName(sidebar, groupName);
  }

  if (parts.length === 2) {
    const [groupName, pageName] = parts;
    const group = sidebar.find(item => item.text === groupName);

    if (group && group.items) {
      return findPageByName(group.items, pageName);
    }
  }

  return [];
}

/**
 * 展平所有页面
 */
function flattenPages(items: SidebarItem[], parentGroup = ''): Page[] {
  const pages: Page[] = [];

  for (const item of items) {
    if (item.link) {
      pages.push({
        path: item.link,
        title: item.text,
        group: parentGroup,
      });
    }

    if (item.items) {
      const nestedGroup = parentGroup ? `${parentGroup} > ${item.text}` : item.text;
      pages.push(...flattenPages(item.items, nestedGroup));
    }
  }

  return pages;
}

/**
 * 从 items 中提取页面
 */
function extractPagesFromItems(items: SidebarItem[], group = ''): Page[] {
  const pages: Page[] = [];

  for (const item of items) {
    if (item.link) {
      pages.push({
        path: item.link,
        title: item.text,
        group: group,
      });
    }

    if (item.items) {
      pages.push(...extractPagesFromItems(item.items, group ? `${group} > ${item.text}` : item.text));
    }
  }

  return pages;
}

/**
 * 根据名称查找页面
 */
function findPageByName(items: SidebarItem[], name: string): Page[] {
  for (const item of items) {
    if (item.text === name && item.link) {
      return [{ path: item.link, title: item.text }];
    }

    if (item.items) {
      const found = findPageByName(item.items, name);
      if (found.length > 0) return found;
    }
  }

  return [];
}

/**
 * 解析导出路径
 * @param exportPath 导出路径（如 "orbitcontrol" 或 "orbitcontrol > 使用手册"）
 * @param _sidebarDir 未使用（保留以兼容接口）
 */
export function resolveExportPath(exportPath: string, _sidebarDir: string): ResolvedPath {
  if (!exportPath) {
    throw new Error('导出路径不能为空');
  }

  const parts = exportPath.split('>').map(p => p.trim());
  const moduleName = parts[0];
  const subPath = parts.slice(1).join(' > ');

  // 从模块名推导 sidebar 路径（如 orbitcontrol -> /orbitcontrol/）
  const sidebarPath = `/${moduleName}/`;
  const sidebar = sidebarModules[sidebarPath];

  if (!sidebar) {
    throw new Error(`模块不存在: ${moduleName}。可用模块: ${Object.keys(sidebarModules).map(k => k.replace(/\//g, '')).join(', ')}`);
  }

  let pages: Page[];

  if (!subPath) {
    pages = flattenPages(sidebar);
  } else {
    pages = findPagesByPath(sidebar, subPath);
  }

  return {
    module: moduleName,
    path: exportPath,
    subPath: subPath,
    pages: pages,
  };
}

export { flattenPages, findPagesByPath };
