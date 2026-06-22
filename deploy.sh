#!/bin/bash
# 睿度文档中心一键发布脚本

set -e

# 配置
SERVER_HOST="192.168.144.77"
SERVER_USER="root"
SERVER_PATH="/var/www/ruidu-docs"
LOCAL_DIST=".vitepress/dist"
SSH_KEY="$HOME/.ssh/id_rsa_cemos"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查 SSH key
if [ ! -f "$SSH_KEY" ]; then
    log_error "SSH key not found: $SSH_KEY"
    exit 1
fi

# 进入项目目录
cd "$(dirname "$0")"
log_info "当前目录: $(pwd)"

# 构建项目
log_info "开始构建 VitePress..."
npm run docs:build

# 检查构建产物
if [ ! -d "$LOCAL_DIST" ]; then
    log_error "构建失败，$LOCAL_DIST 不存在"
    exit 1
fi

# 同步到服务器
log_info "同步文件到 $SERVER_HOST:$SERVER_PATH"
rsync -avz --delete \
    -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
    "$LOCAL_DIST/" \
    "${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/"

log_info "部署完成！"
log_info "访问地址: http://$SERVER_HOST/ruidu-docs"
