// V3.0 Content Script - iflow MCP 助手内容脚本
// 只在 https://platform.iflow.cn/mcp* 页面生效

(function() {
    'use strict';
    
    console.log('iflow MCP Helper Content Script 已加载');
    
    // 从 V1.0 script.js 复制的核心转换函数
    function transformCommand(input) {
        // 尝试多种模式来找到 JSON 部分
        let lastJsonStartIndex = input.lastIndexOf(' "{');
        
        // 如果没找到，尝试其他模式
        if (lastJsonStartIndex === -1) {
            lastJsonStartIndex = input.lastIndexOf(' "');
        }
        
        // 如果还是没找到，尝试查找第一个 { 的位置
        if (lastJsonStartIndex === -1) {
            const firstBraceIndex = input.indexOf('{');
            if (firstBraceIndex !== -1) {
                // 找到 { 前面的空格位置
                const spaceBeforeBrace = input.lastIndexOf(' ', firstBraceIndex);
                if (spaceBeforeBrace !== -1) {
                    lastJsonStartIndex = spaceBeforeBrace;
                }
            }
        }
        
        if (lastJsonStartIndex === -1) {
            throw new Error('未找到 JSON 部分');
        }
        
        // 提取命令主体和坏的 JSON 字符串
        const commandBody = input.substring(0, lastJsonStartIndex).trim();
        const badJsonString = input.substring(lastJsonStartIndex + 1).trim();
        
        // 净化 JSON 字符串
        let cleanJsonString = badJsonString;
        
        // 如果字符串以引号开头，移除首尾引号
        if (cleanJsonString.startsWith('"') && cleanJsonString.endsWith('"')) {
            cleanJsonString = cleanJsonString.substring(1, cleanJsonString.length - 1);
        }
        
        // 将 \" 替换为 "
        cleanJsonString = cleanJsonString.replace(/\\"/g, '"');
        
        // 生成单引号版输出（内容脚本只提供单引号版）
        const singleQuoteOutput = `${commandBody} '${cleanJsonString}'`;
        
        return singleQuoteOutput;
    }
    
    // 检测并注入 PowerShell 复制按钮
    function injectPowerShellButton() {
        console.log('正在查找 MCP 命令元素...');
        
        // 更广泛的查找策略
        let foundElement = null;
        let commandText = '';
        
        // 1. 查找所有包含 iflow mcp 命令的元素
        const allElements = document.querySelectorAll('*');
        for (const element of allElements) {
            const text = element.textContent || element.innerText || '';
            if (text.includes('iflow mcp add-json')) {
                console.log('找到包含 MCP 命令的元素:', element);
                foundElement = element;
                commandText = text.trim();
                break;
            }
        }
        
        // 2. 如果没找到，查找特定的代码块
        if (!foundElement) {
            const codeSelectors = [
                'code', 'pre', '.code', '.command', 
                '[class*="code"]', '[class*="command"]',
                'textarea', 'input[type="text"]'
            ];
            
            for (const selector of codeSelectors) {
                const elements = document.querySelectorAll(selector);
                for (const element of elements) {
                    const text = element.textContent || element.value || '';
                    if (text.includes('iflow mcp add-json')) {
                        console.log('在代码块中找到 MCP 命令:', selector, element);
                        foundElement = element;
                        commandText = text.trim();
                        break;
                    }
                }
                if (foundElement) break;
            }
        }
        
        // 3. 查找复制按钮附近的内容
        if (!foundElement) {
            const copyButtons = document.querySelectorAll('button, [role="button"], .btn');
            for (const button of copyButtons) {
                const buttonText = button.textContent || button.title || '';
                if (buttonText.includes('复制') || buttonText.includes('copy')) {
                    console.log('找到复制按钮:', button);
                    // 查找按钮附近的命令文本
                    const parent = button.closest('div') || button.parentElement;
                    if (parent) {
                        const parentText = parent.textContent || '';
                        if (parentText.includes('iflow mcp add-json')) {
                            foundElement = button;
                            commandText = parentText.trim();
                            break;
                        }
                    }
                }
            }
        }
        
        // 如果找到了目标，注入按钮
        if (foundElement && commandText) {
            // 检查是否已经注入过
            const existingBtn = document.getElementById('ps-copy-btn');
            if (existingBtn) {
                existingBtn.remove();
            }
            
            console.log('准备注入 PowerShell 复制按钮');
            
            // 创建 PowerShell 复制按钮
            const psButton = document.createElement('button');
            psButton.id = 'ps-copy-btn';
            psButton.textContent = '复制 (PowerShell)';
            psButton.className = 'ps-copy-button';
            
            // 绑定点击事件
            psButton.addEventListener('click', async () => {
                try {
                    console.log('点击了 PowerShell 复制按钮');
                    console.log('原始命令:', commandText);
                    
                    // 转换命令
                    const psCommand = transformCommand(commandText);
                    console.log('转换后的命令:', psCommand);
                    
                    // 复制到剪贴板
                    await navigator.clipboard.writeText(psCommand);
                    
                    // 显示成功反馈
                    const originalText = psButton.textContent;
                    psButton.textContent = '已复制！';
                    psButton.classList.add('success');
                    
                    setTimeout(() => {
                        psButton.textContent = originalText;
                        psButton.classList.remove('success');
                    }, 2000);
                    
                } catch (error) {
                    console.error('PowerShell 复制失败:', error);
                    const originalText = psButton.textContent;
                    psButton.textContent = '复制失败';
                    psButton.classList.add('error');
                    
                    setTimeout(() => {
                        psButton.textContent = originalText;
                        psButton.classList.remove('error');
                    }, 2000);
                }
            });
            
            // 插入按钮到 DOM
            if (foundElement.tagName === 'BUTTON') {
                foundElement.parentNode.insertBefore(psButton, foundElement.nextSibling);
            } else {
                foundElement.appendChild(psButton);
            }
            
            console.log('PowerShell 复制按钮已注入');
        } else {
            console.log('未找到 MCP 命令元素');
        }
    }
    
    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver((mutations) => {
        let shouldInject = false;
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const text = node.textContent || '';
                        if (text.includes('iflow mcp') || text.includes('add-json')) {
                            shouldInject = true;
                            break;
                        }
                    }
                }
            }
        });
        
        if (shouldInject) {
            setTimeout(injectPowerShellButton, 500);
        }
    });
    
    // 开始观察整个文档
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: true
    });
    
    // 页面加载完成后立即执行一次
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(injectPowerShellButton, 1000);
        });
    } else {
        setTimeout(injectPowerShellButton, 1000);
    }
    
    // 定期检查（防止某些动态内容遗漏）
    setInterval(injectPowerShellButton, 3000);
    
})();