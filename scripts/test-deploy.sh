#!/bin/bash

# 测试部署脚本
echo "🚀 开始测试部署配置..."

# 检查 Node.js 版本
echo "📋 检查 Node.js 版本..."
node --version

# 检查 pnpm 版本
echo "📋 检查 pnpm 版本..."
pnpm --version

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 构建文档
echo "🔨 构建文档..."
pnpm build:docs

# 检查构建结果
echo "✅ 检查构建结果..."
if [ -d "docs/.vitepress/dist" ]; then
    echo "✅ 构建成功！文档已生成到 docs/.vitepress/dist"
    ls -la docs/.vitepress/dist
else
    echo "❌ 构建失败！未找到 dist 目录"
    exit 1
fi

echo "🎉 部署配置测试完成！"
