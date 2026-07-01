import path from 'path';
import fs from 'fs';

export function normalizePath(p: string): string {
  if (!p) return '/';
  return p.startsWith('/') ? p : `/${p}`;
}

export function buildUrl(baseUrl: string, pagePath: string): string {
  const normalizedPath = normalizePath(pagePath);
  return baseUrl.replace(/\/$/, '') + normalizedPath;
}

export function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getSafeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
