# iflow MCP 助手 (PowerShell 专用)

[![GitHub stars](https://img.shields.io/github/stars/Albert-Lsk/iflow-mcp-helper.svg?style=social&label=Star)](https://github.com/Albert-Lsk/iflow-mcp-helper)
[![GitHub forks](https://img.shields.io/github/forks/Albert-Lsk/iflow-mcp-helper.svg?style=social&label=Fork)](https://github.com/Albert-Lsk/iflow-mcp-helper)
[![GitHub license](https://img.shields.io/github/license/Albert-Lsk/iflow-mcp-helper.svg)](https://github.com/Albert-Lsk/iflow-mcp-helper/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/release/Albert-Lsk/iflow-mcp-helper.svg)](https://github.com/Albert-Lsk/iflow-mcp-helper/releases)
[![Language](https://img.shields.io/badge/language-中文-blue.svg)](README.md)
[![Language](https://img.shields.io/badge/language-English-red.svg)](README_EN.md)

一个功能强大的"三合一"工具，提供网页版、Chrome 插件弹窗版和内容注入版，用于转换从 `iflow` 平台复制的 MCP 安装命令，使其兼容 PowerShell 7 环境。

## 🚀 功能特点

- **实时转换**：输入命令后立即显示转换结果
- **双版本输出**：提供单引号版和双引号版两种 PowerShell 兼容格式
- **一键复制**：点击按钮即可复制转换后的命令到剪贴板
- **简洁界面**：专业、易用的用户界面设计
- **纯前端实现**：无需服务器，完全在浏览器中运行
- **三合一架构**：网页版、插件弹窗版、内容注入版三种使用方式
- **智能注入**：在 iflow 官网自动添加 PowerShell 复制按钮
- **精确生效**：内容脚本仅在 iflow 官网生效，不干扰其他网站

## 📖 使用说明

### 🌐 V1.0 网页版使用

1. 打开 [GitHub Pages](https://albert-lsk.github.io/iflow-mcp-helper/) 页面
2. 将从 `iflow` 平台复制的原始命令粘贴到输入框中
3. 查看下方两个输出框中的转换结果
4. 点击"复制"按钮将需要的版本复制到剪贴板

### 🧩 V2.0 Popup 插件版使用

1. **安装插件**：
   - 下载插件文件到本地
   - 在 Chrome 中打开 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"，选择项目文件夹

2. **使用插件**：
   - 点击 Chrome 工具栏中的插件图标
   - 在弹出窗口中粘贴原始命令
   - 查看转换结果并复制需要的版本

### 🎯 V3.0 Content Script 版使用

1. **安装插件**（同 V2.0）
2. **自动生效**：
   - 访问 [iflow MCP 市场](https://platform.iflow.cn/mcp)
   - 浏览任意 MCP 服务
   - 点击安装按钮弹出命令窗口
   - 在原始"复制"按钮旁边会自动出现"复制 (PowerShell)"按钮
   - 点击即可直接复制 PowerShell 兼容格式的命令

### 基本操作

1. 将从 `iflow` 平台复制的原始命令粘贴到输入框中
2. 查看下方两个输出框中的转换结果
3. 点击"复制"按钮将需要的版本复制到剪贴板

### 支持的命令格式

工具支持以下格式的命令：

- **全局安装命令**：
  ```
  iflow mcp add-json -s user 'fetch' "{\"command\":\"npx\",\"args\":[\"-y\",\"@iflow-mcp/fetch@1.0.2\"]}"
  ```

- **项目范围安装**：
  ```
  iflow mcp add-json 'fetch' "{\"command\":\"npx\",\"args\":[\"-y\",\"@iflow-mcp/fetch@1.0.2\"]}"
  ```

### 转换结果说明

- **PowerShell (单引号版本)**：使用单引号包裹 JSON 字符串，适用于大多数 PowerShell 场景
- **PowerShell (双引号版本)**：使用反引号转义特殊字符后用双引号包裹，适用于需要更严格转义的场景

## 🛠️ 技术栈

- **HTML5**：页面结构
- **CSS3**：样式设计
- **原生 JavaScript**：核心转换逻辑
- **无依赖框架**：轻量级实现

## 📁 项目结构

```
iflow-mcp-helper/
├── V1.0 网页版
│   ├── index.html          # 网页版主页面
│   ├── style_web.css       # 网页版样式（800px 宽度）
│   └── script.js           # 转换逻辑
│
├── V2.0 Popup 插件版
│   ├── popup.html          # 插件弹出页面
│   ├── popup_style.css     # 弹窗版样式（380px 宽度）
│   └── script.js           # 转换逻辑（与网页版共享）
│
├── V3.0 Content Script 版
│   ├── manifest.json       # Chrome 插件配置文件
│   ├── content_script.js   # 内容注入脚本
│   ├── content_style.css   # 内容注入样式
│   └── images/             # 插件图标文件夹
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
│
├── README.md               # 中文项目文档
├── README_EN.md            # 英文项目文档
└── LICENSE                 # 许可证
```

## 🌐 在线使用

- **V1.0 网页版**：访问 [GitHub Pages](https://albert-lsk.github.io/iflow-mcp-helper/) 直接使用工具
- **V2.0 Popup 插件版**：下载并安装插件，点击工具栏图标随时使用
- **V3.0 Content Script 版**：安装插件后，访问 iflow 官网自动生效

## 💻 本地运行

### V1.0 网页版本地运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/Albert-Lsk/iflow-mcp-helper.git
   cd iflow-mcp-helper
   ```

2. 使用任意 HTTP 服务器打开：
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx http-server
   
   # 或直接在浏览器中打开 index.html
   ```

3. 访问 `http://localhost:8000`

### V2.0 & V3.0 Chrome 插件版本地安装

1. 克隆仓库（同上）
2. 准备插件图标文件（16px, 48px, 128px）
3. 在 Chrome 中打开 `chrome://extensions/`
4. 开启"开发者模式"
5. 点击"加载已解压的扩展程序"，选择项目文件夹
6. 重新加载插件以应用更改

## 🔧 转换逻辑详解

<details>
<summary>点击查看技术实现细节</summary>

### 核心转换流程

1. **定位 JSON 部分**：智能识别命令中的 JSON 字符串起始位置
2. **提取命令主体**：分离命令参数和 JSON 内容
3. **净化 JSON**：移除转义字符，生成标准 JSON 格式
4. **生成输出**：
   - 单引号版：`命令主体 'JSON内容'`
   - 反引号版：`命令主体 "转义后的JSON"`

### 智能匹配策略

工具采用多层次匹配策略，确保兼容各种命令格式：
- 优先匹配 `"{\"` 模式
- 备选匹配 `" ` 模式
- 最终通过 `{` 字符定位 JSON 起始位置

</details>

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交 Pull Request

## 📝 更新日志

<details>
<summary>版本历史</summary>

### v1.2.0 (2024-10-29)
- 🎯 新增 Content Script 内容注入功能
- 🔄 重构为"三合一"架构，三个版本完全独立
- 🧠 增强 DOM 监听和命令检测逻辑
- 🎨 优化网页版和插件版的界面样式
- 🔧 修复 iflow 官网匹配规则
- 📝 完善文档和使用指南

### v1.1.0 (2024-10-29)
- 🧩 新增 Chrome 插件版本
- ✨ 优化插件界面布局和样式
- ✨ 添加 GitHub 项目链接
- 🔧 增强复制功能的兼容性
- 📱 适配插件弹出窗口尺寸

### v1.0.0 (2024-10-29)
- ✨ 初始版本发布
- ✨ 支持基本命令转换功能
- ✨ 实现单引号版和双引号版输出
- ✨ 添加一键复制功能
- ✨ 响应式界面设计

</details>

## 🔒 安全说明

- 本工具完全在浏览器中运行，不会发送任何数据到服务器
- 所有转换逻辑均在本地执行，确保命令安全性
- 不存储任何用户输入数据

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

- 感谢 `iflow` 平台提供的 MCP 服务
- 感谢所有贡献者和用户的支持

---

## 🔗 相关链接

- [iflow 官网](https://iflow.com)
- [PowerShell 官方文档](https://docs.microsoft.com/powershell/)
- [MCP 规范文档](https://modelcontextprotocol.io/)

---

**如果这个工具对您有帮助，请考虑给项目一个 ⭐ Star！**