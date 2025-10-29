# iflow MCP Helper (PowerShell Edition)

[![GitHub stars](https://img.shields.io/github/stars/Albert-Lsk/iflow-mcp-helper.svg?style=social&label=Star)](https://github.com/Albert-Lsk/iflow-mcp-helper)
[![GitHub forks](https://img.shields.io/github/forks/Albert-Lsk/iflow-mcp-helper.svg?style=social&label=Fork)](https://github.com/Albert-Lsk/iflow-mcp-helper)
[![GitHub license](https://img.shields.io/github/license/Albert-Lsk/iflow-mcp-helper.svg)](https://github.com/Albert-Lsk/iflow-mcp-helper/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/release/Albert-Lsk/iflow-mcp-helper.svg)](https://github.com/Albert-Lsk/iflow-mcp-helper/releases)
[![Language](https://img.shields.io/badge/language-中文-blue.svg)](README.md)
[![Language](https://img.shields.io/badge/language-English-red.svg)](README_EN.md)

A lightweight tool providing both web and Chrome extension versions for converting MCP installation commands copied from the `iflow` platform to make them compatible with PowerShell 7 environment.

## 🚀 Features

- **Real-time Conversion**: Instant conversion results as you type
- **Dual Version Output**: Provides both single-quote and double-quote PowerShell-compatible formats
- **One-click Copy**: Click buttons to copy converted commands to clipboard
- **Clean Interface**: Professional and user-friendly UI design
- **Pure Frontend**: No server required, runs entirely in the browser
- **Chrome Extension**: Convenient browser extension for anytime use

## 📖 Usage Guide

### 🌐 Web Version Usage

1. Open the [GitHub Pages](https://albert-lsk.github.io/iflow-mcp-helper/) page
2. Paste the original command copied from the `iflow` platform into the input box
3. View the conversion results in the two output boxes below
4. Click the "Copy" button to copy the desired version to clipboard

### 🧩 Chrome Extension Usage

1. **Install Extension**:
   - Download extension files locally
   - Open `chrome://extensions/` in Chrome
   - Enable "Developer mode"
   - Click "Load unpacked extension" and select the project folder

2. **Use Extension**:
   - Click the extension icon in Chrome toolbar
   - Paste the original command in the popup window
   - View conversion results and copy the desired version

### Basic Operations

1. Paste the original command copied from the `iflow` platform into the input box
2. View the conversion results in the two output boxes below
3. Click the "Copy" button to copy the desired version to clipboard

### Supported Command Formats

The tool supports the following command formats:

- **Global Installation Command**:
  ```
  iflow mcp add-json -s user 'fetch' "{\"command\":\"npx\",\"args\":[\"-y\",\"@iflow-mcp/fetch@1.0.2\"]}"
  ```

- **Project Scope Installation**:
  ```
  iflow mcp add-json 'fetch' "{\"command\":\"npx\",\"args\":[\"-y\",\"@iflow-mcp/fetch@1.0.2\"]}"
  ```

### Conversion Results Explanation

- **PowerShell (Single Quote Version)**: Wraps JSON string with single quotes, suitable for most PowerShell scenarios
- **PowerShell (Double Quote Version)**: Uses backticks to escape special characters then wraps with double quotes, suitable for scenarios requiring stricter escaping

## 🛠️ Tech Stack

- **HTML5**: Page structure
- **CSS3**: Styling design
- **Vanilla JavaScript**: Core conversion logic
- **No Framework Dependencies**: Lightweight implementation

## 📁 Project Structure

```
iflow-mcp-helper/
├── manifest.json       # Chrome extension configuration
├── popup.html          # Extension popup page
├── index.html          # Web version main page
├── style.css           # Stylesheet
├── script.js           # Conversion logic
├── images/             # Extension icons folder
│   └── icon_placeholder.txt
├── README.md           # Chinese documentation
├── README_EN.md        # English documentation
└── LICENSE             # License
```

## 🌐 Online Usage

- **Web Version**: Visit [GitHub Pages](https://albert-lsk.github.io/iflow-mcp-helper/) to use the tool directly
- **Chrome Extension**: Download and install the extension for anytime use in your browser

## 💻 Local Development

### Web Version Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Albert-Lsk/iflow-mcp-helper.git
   cd iflow-mcp-helper
   ```

2. Open with any HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Or directly open index.html in browser
   ```

3. Visit `http://localhost:8000`

### Chrome Extension Local Installation

1. Clone repository (same as above)
2. Prepare extension icon files (16px, 48px, 128px)
3. Open `chrome://extensions/` in Chrome
4. Enable "Developer mode"
5. Click "Load unpacked extension" and select the project folder

## 🔧 Technical Implementation Details

<details>
<summary>Click to view technical implementation details</summary>

### Core Conversion Process

1. **Locate JSON Section**: Intelligently identify the starting position of JSON string in the command
2. **Extract Command Body**: Separate command parameters from JSON content
3. **Clean JSON**: Remove escape characters to generate standard JSON format
4. **Generate Output**:
   - Single Quote Version: `command_body 'JSON_content'`
   - Backtick Version: `command_body "escaped_JSON"`

### Intelligent Matching Strategy

The tool uses a multi-layered matching strategy to ensure compatibility with various command formats:
- Priority matching for `"{\"` pattern
- Alternative matching for `" ` pattern
- Final positioning through `{` character to locate JSON start

</details>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 Changelog

<details>
<summary>Version History</summary>

### v1.1.0 (2024-10-29)
- 🧩 Added Chrome extension version
- ✨ Optimized extension interface layout and styling
- ✨ Added GitHub project link
- 🔧 Enhanced copy function compatibility
- 📱 Adapted for extension popup window size

### v1.0.0 (2024-10-29)
- ✨ Initial release
- ✨ Basic command conversion functionality
- ✨ Single quote and double quote version output
- ✨ One-click copy functionality
- ✨ Responsive UI design

</details>

## 🔒 Security Notice

- This tool runs entirely in the browser and does not send any data to servers
- All conversion logic is executed locally to ensure command security
- No user input data is stored

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Thanks to the `iflow` platform for providing MCP services
- Thanks to all contributors and users for their support

---

## 🔗 Related Links

- [iflow Official Website](https://iflow.com)
- [PowerShell Official Documentation](https://docs.microsoft.com/powershell/)
- [MCP Specification](https://modelcontextprotocol.io/)

---

**If this tool helps you, please consider giving the project a ⭐ Star!**