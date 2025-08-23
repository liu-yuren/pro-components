# 组件库构建说明

## 构建命令

### 构建所有包

```bash
pnpm build
```

### 构建特定包

```bash
# 构建组件包
pnpm build:components

# 构建工具包
pnpm build:utils
```

### 清理构建文件

```bash
pnpm clean
```

### 类型检查

```bash
pnpm type-check
```

## 构建输出

构建完成后，每个包会在 `packages/*/dist/` 目录下生成以下文件：

- `index.js` - CommonJS 格式
- `index.mjs` - ES Module 格式
- `index.d.ts` - TypeScript 类型声明
- `index.d.ts.map` - 类型声明源码映射

## 构建配置

### unbuild 配置

每个包都使用 `unbuild.config.ts` 进行构建配置：

- 支持 CommonJS 和 ES Module 双格式输出
- 自动生成 TypeScript 类型声明
- 外部化 Vue 和 Element Plus 依赖
- 支持源码映射

### TypeScript 配置

- 启用严格模式
- 支持 Vue 3 JSX
- 生成声明文件和源码映射
- 项目引用支持

## 开发流程

1. 在 `packages/*/src/` 目录下开发代码
2. 运行 `pnpm build` 构建所有包
3. 构建产物在 `packages/*/dist/` 目录
4. 发布时只包含 `dist` 目录

## 注意事项

- 确保所有依赖都正确声明在 `peerDependencies` 中
- 构建前会自动清理之前的构建产物
- 支持 TypeScript 项目引用，可以并行构建
- 使用 pnpm workspace 管理多包依赖
