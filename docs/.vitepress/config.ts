import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vitepress';

// 从文件系统读取 Markdown 文件内容
// This function reads the content of a Markdown file from the file system
function readMarkdownFileContent(filePath: string): string {
  // 如果文件存在，则读取文件内容
  // If the file exists, read its content
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  // 如果文件不存在，返回空字符串
  // If the file doesn't exist, return an empty string
  return '';
}

// 统计文档的字数函数
// This function counts the number of words in a given content
function countWords(content: string): number {
  const cleanedContent = content
    .replace(/```[\s\S]*?```/g, '') // 移除代码块 Remove code blocks
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片链接 Remove image links
    .replace(/\[.*?\]\(.*?\)/g, '') // 移除普通链接 Remove regular links
    .replace(/<\/?[^>]+(>|$)/g, '') // 移除 HTML 标签 Remove HTML tags
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // 移除标点符号 Remove punctuation
    .replace(/\s+/g, ' ') // 将多余的空格归为一个空格 Consolidate multiple spaces into one
    .trim(); // 去除首尾空格 Trim leading and trailing spaces

  // 计算中文字符的数量 Count the number of Chinese characters
  const chineseCharacters = cleanedContent.match(/[\u4e00-\u9fff\uff01-\uffe5]/g) || [];
  // 按空格分隔英文单词 Split English words by spaces
  const words = cleanedContent.split(/\s+/).filter(Boolean);

  // 返回中文字符和英文单词的总数 Return the total count of Chinese characters and English words
  return chineseCharacters.length + words.length;
}

// 生成配置函数
// Generate the site configuration function
function genConfig() {
  return defineConfig({
    // VitePress 的 transformPageData 钩子，用于在页面生成时处理页面数据
    // VitePress hook transformPageData to handle page data during page generation
    transformPageData(pageData) {
      // 构建 Markdown 文件路径 Construct the path to the Markdown file
      const markdownFile = `${pageData.relativePath}`;
      const filePath = path.join(process.cwd(), 'docs', markdownFile);

      // 从文件系统读取文件内容 Read the file content from the file system
      const content = readMarkdownFileContent(filePath);

      // 统计字数 Calculate the word count
      const wordCount = countWords(content);

      // 将字数写入 Frontmatter Write the word count into the page's Frontmatter
      return {
        frontmatter: {
          ...pageData.frontmatter,
          wordCount, // 将字数写入 Frontmatter Add word count to Frontmatter
        },
      };
    },
  });
}

export default genConfig;
