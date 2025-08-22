# 部署说明

## GitHub Pages 配置步骤

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 `Settings` 标签页
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `GitHub Actions`

### 2. 仓库设置

确保你的仓库名称是 `pro-components`，这样 VitePress 的 `base: '/pro-components/'` 配置才能正确工作。

### 3. 部署流程

现在当你推送代码到 `main` 分支时，GitHub Actions 会自动：

1. 安装依赖
2. 构建文档
3. 部署到 GitHub Pages

### 4. 访问地址

部署成功后，你的文档将可以通过以下地址访问：
`https://liu-yuren.github.io/pro-components/`

### 5. 故障排除

如果部署失败，请检查：

1. **权限问题**：确保仓库的 `Settings > Actions > General` 中允许 Actions 运行
2. **分支保护**：确保 `main` 分支没有被保护规则阻止
3. **构建错误**：查看 Actions 日志中的具体错误信息

### 6. 手动部署

你也可以在 GitHub 仓库的 `Actions` 标签页中手动触发部署：

1. 点击 `Deploy Docs` 工作流
2. 点击 `Run workflow`
3. 选择 `main` 分支
4. 点击 `Run workflow`

## 注意事项

- 确保 `.node-version` 文件存在且包含正确的 Node.js 版本
- 确保 `pnpm-lock.yaml` 文件已提交到仓库
- 第一次部署可能需要几分钟时间
