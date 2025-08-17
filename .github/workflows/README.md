# GitHub Workflows

本项目包含以下 GitHub Actions 工作流：

## 📋 CI (ci.yml)

**触发条件：** 推送到 `main` 或 `develop` 分支，或创建 PR 到这些分支

**功能：**

- 代码检查 (ESLint)
- 类型检查
- 构建组件库和工具包
- 构建文档

## 🏗️ Build Documentation (build-docs.yml)

**触发条件：** 推送到 `main` 或 `develop` 分支，或创建 PR 到这些分支

**功能：**

- 安装依赖
- 代码检查
- 构建文档
- 上传构建产物作为 artifacts

## 🚀 Deploy Documentation (deploy-docs.yml)

**触发条件：** 推送到 `main` 分支或手动触发

**功能：**

- 构建文档
- 部署到 GitHub Pages
- 自动配置 Pages 环境

## 📦 Release (release.yml)

**触发条件：** 推送版本标签 (如 `v1.0.0`)

**功能：**

- 构建所有包
- 发布到 npm 仓库
- 创建 GitHub Release

## 🔧 配置要求

### GitHub Pages

1. 在仓库设置中启用 GitHub Pages
2. 选择 "GitHub Actions" 作为部署源

### NPM 发布

1. 在仓库设置中添加 `NPM_TOKEN` secret
2. 确保包名在 npm 上可用

### 权限设置

确保工作流有适当的权限：

- `contents: read` - 读取代码
- `pages: write` - 部署到 Pages
- `id-token: write` - 身份验证

## 📝 使用说明

1. **日常开发：** CI 工作流会自动运行代码检查
2. **文档更新：** 推送到 main 分支会自动部署文档
3. **发布新版本：** 创建并推送版本标签会自动发布到 npm

## 🔍 故障排除

- 检查 Actions 页面的日志输出
- 确保所有依赖的 secret 已正确配置
- 验证包名和版本号符合 npm 规范
