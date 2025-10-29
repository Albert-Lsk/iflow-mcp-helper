document.addEventListener('DOMContentLoaded', function() {
    const inputCommand = document.getElementById('inputCommand');
    const outputSingleQuote = document.getElementById('outputSingleQuote');
    const outputBacktick = document.getElementById('outputBacktick');
    const copySingleQuoteBtn = document.getElementById('copySingleQuote');
    const copyBacktickBtn = document.getElementById('copyBacktick');

    // 监听输入框变化
    inputCommand.addEventListener('input', function() {
        const inputText = inputCommand.value.trim();
        
        if (inputText) {
            try {
                // 执行转换
                const result = transformCommand(inputText);
                outputSingleQuote.value = result.singleQuote;
                outputBacktick.value = result.backtick;
            } catch (error) {
                outputSingleQuote.value = '转换出错: ' + error.message;
                outputBacktick.value = '转换出错: ' + error.message;
            }
        } else {
            // 清空输出框
            outputSingleQuote.value = '';
            outputBacktick.value = '';
        }
    });

    // 转换命令的核心函数
    function transformCommand(input) {
        // 尝试多种模式来找到 JSON 部分
        let lastJsonStartIndex = input.lastIndexOf(' "{' );
        
        // 如果没找到，尝试其他模式
        if (lastJsonStartIndex === -1) {
            lastJsonStartIndex = input.lastIndexOf(' "' );
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
        
        // 生成单引号版输出
        const singleQuoteOutput = `${commandBody} '${cleanJsonString}'`;
        
        // 生成反引号版输出
        const backtickEscapedJson = cleanJsonString
            .replace(/"/g, '`"')
            .replace(/{/g, '`{')
            .replace(/}/g, '`}');
        const backtickOutput = `${commandBody} "${backtickEscapedJson}"`;
        
        return {
            singleQuote: singleQuoteOutput,
            backtick: backtickOutput
        };
    }

    // 复制功能
    function copyToClipboard(text, button) {
        // 在 Chrome 插件环境中，优先使用 document.execCommand 作为备选方案
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showCopySuccess(button);
            }).catch(err => {
                console.error('Clipboard API failed:', err);
                fallbackCopyToClipboard(text, button);
            });
        } else {
            fallbackCopyToClipboard(text, button);
        }
    }
    
    // 备选复制方案
    function fallbackCopyToClipboard(text, button) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                showCopySuccess(button);
            } else {
                throw new Error('execCommand failed');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('复制失败，请手动复制');
        }
    }
    
    // 显示复制成功效果
    function showCopySuccess(button) {
        const originalText = button.textContent;
        button.textContent = '已复制！';
        button.classList.add('copied');
        
        // 2秒后恢复
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    // 为复制按钮添加事件监听器
    copySingleQuoteBtn.addEventListener('click', function() {
        copyToClipboard(outputSingleQuote.value, this);
    });

    copyBacktickBtn.addEventListener('click', function() {
        copyToClipboard(outputBacktick.value, this);
    });
});