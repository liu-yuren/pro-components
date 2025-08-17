# GitHub Pages 部署设置

本项目已配置自动部署到 GitHub Pages。以下是设置步骤：

## 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 `Settings` 标签页
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `GitHub Actions`

## 2. 配置仓库设置

确保你的仓库设置正确：

- **仓库可见性**: 可以是 Public 或 Private
- **分支**: 确保主分支是 `main` 或 `master`
- **权限**: GitHub Actions 需要写入权限

## 3. 工作流程

当你的代码推送到主分支时，GitHub Actions 会自动：

1. 安装依赖 (`pnpm install`)
2. 构建文档 (`pnpm build:docs`)
3. 部署到 GitHub Pages

## 4. 访问文档

部署完成后，你的文档将在以下地址可用：

```
https://[你的用户名].github.io/element-plus-pro-components/
```

## 5. 自定义配置

### 修改仓库名称

如果你想要不同的 URL 路径，需要修改以下文件：

1. `docs/.vitepress/config.mts` 中的 `base` 配置
2. `.github/workflows/deploy-docs.yml` 中的路径

### 修改部署分支

默认部署 `main` 和 `master` 分支，可以在 `.github/workflows/deploy-docs.yml` 中修改。

## 6. 故障排除

### 构建失败

#### pnpm 找不到错误

如果遇到 "Unable to locate executable file: pnpm" 错误：

1. **使用备用工作流**：
   - 重命名 `.github/workflows/deploy-docs-backup.yml` 为 `.github/workflows/deploy-docs.yml`
   - 或者直接使用备用工作流

2. **手动修复**：
   - 确保 pnpm 设置步骤在 Node.js 设置之前
   - 检查 pnpm 版本是否正确

3. **其他检查**：
   - 检查 Node.js 版本 (需要 >= 20.10.0)
   - 检查 pnpm 版本 (需要 >= 9.12.0)
   - 查看 GitHub Actions 日志中的调试信息

### 页面无法访问

- 确保 GitHub Pages 已启用
- 检查仓库设置中的 Pages 配置
- 等待几分钟让部署完成

## 7. 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev:docs

# 构建文档
pnpm build:docs

# 预览构建结果
pnpm preview:docs
```

## 8. 注意事项

- 每次推送到主分支都会触发新的部署
- 部署可能需要几分钟时间
- 确保 `.github/workflows/deploy-docs.yml` 文件存在于仓库中
