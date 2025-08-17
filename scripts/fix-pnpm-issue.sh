#!/bin/bash

echo "🔧 修复 pnpm GitHub Actions 问题..."

# 检查当前工作流文件
if [ -f ".github/workflows/deploy-docs.yml" ]; then
    echo "✅ 找到主工作流文件"
    
    # 备份原文件
    cp .github/workflows/deploy-docs.yml .github/workflows/deploy-docs.yml.backup
    echo "📋 已备份原工作流文件"
    
    # 检查是否有备用文件
    if [ -f ".github/workflows/deploy-docs-backup.yml" ]; then
        echo "🔄 使用备用工作流文件..."
        mv .github/workflows/deploy-docs-backup.yml .github/workflows/deploy-docs.yml
        echo "✅ 已切换到备用工作流"
    else
        echo "❌ 未找到备用工作流文件"
        exit 1
    fi
else
    echo "❌ 未找到主工作流文件"
    exit 1
fi

echo "🎉 修复完成！"
echo "📝 现在可以推送代码到 GitHub 了："
echo "   git add ."
echo "   git commit -m 'fix: use backup workflow for pnpm issue'"
echo "   git push origin main"
