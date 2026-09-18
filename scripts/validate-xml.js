import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Strict XML 1.0 Well-Formedness Validator
 */
export function validateXmlString(xmlContent, filename = 'XML') {
  const errors = [];
  let pos = 0;
  const len = xmlContent.length;
  const tagStack = [];

  // 1. Check XML Declaration
  if (!xmlContent.trim().startsWith('<?xml')) {
    errors.push(`${filename}: Missing <?xml ... ?> declaration at start`);
  }

  // Tokenize / Parse XML state machine
  let i = 0;
  while (i < len) {
    // Check for comments: <!-- ... -->
    if (xmlContent.startsWith('<!--', i)) {
      const endComment = xmlContent.indexOf('-->', i + 4);
      if (endComment === -1) {
        errors.push(`${filename}: Unclosed comment starting at index ${i}`);
        break;
      }
      i = endComment + 3;
      continue;
    }

    // Check for CDATA: <![CDATA[ ... ]]>
    if (xmlContent.startsWith('<![CDATA[', i)) {
      const endCdata = xmlContent.indexOf(']]>', i + 9);
      if (endCdata === -1) {
        errors.push(`${filename}: Unclosed CDATA block starting at index ${i}`);
        break;
      }
      i = endCdata + 3;
      continue;
    }

    // Check for processing instructions: <? ... ?>
    if (xmlContent.startsWith('<?', i)) {
      const endPi = xmlContent.indexOf('?>', i + 2);
      if (endPi === -1) {
        errors.push(`${filename}: Unclosed processing instruction starting at index ${i}`);
        break;
      }
      i = endPi + 2;
      continue;
    }

    // Check for unescaped ampersand outside tags/CDATA
    if (xmlContent[i] === '&') {
      const entityMatch = xmlContent.substring(i).match(/^&([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+);/);
      if (!entityMatch) {
        // Find line number
        const line = xmlContent.substring(0, i).split('\n').length;
        const col = i - xmlContent.lastIndexOf('\n', i - 1);
        errors.push(`${filename} [Line ${line}, Col ${col}]: Raw unescaped '&' found`);
      }
    }

    // Check for tags: <tag ...> or </tag>
    if (xmlContent[i] === '<') {
      const closeBracket = xmlContent.indexOf('>', i);
      if (closeBracket === -1) {
        errors.push(`${filename}: Unclosed tag '<' starting at index ${i}`);
        break;
      }

      const tagContent = xmlContent.substring(i + 1, closeBracket).trim();
      const line = xmlContent.substring(0, i).split('\n').length;

      if (tagContent.startsWith('/')) {
        // Closing tag
        const closingTagName = tagContent.substring(1).trim().split(/\s+/)[0];
        if (tagStack.length === 0) {
          errors.push(`${filename} [Line ${line}]: Unexpected closing tag </${closingTagName}> with empty stack`);
        } else {
          const expected = tagStack.pop();
          if (expected.name !== closingTagName) {
            errors.push(`${filename} [Line ${line}]: Mismatched closing tag </${closingTagName}> (expected </${expected.name}> opened at line ${expected.line})`);
          }
        }
      } else if (tagContent.endsWith('/')) {
        // Self-closing tag <tag ... />
        // Valid, no stack push
      } else {
        // Opening tag
        const tagName = tagContent.split(/\s+/)[0];
        // Check tag name validity
        if (/^[a-zA-Z_:][a-zA-Z0-9.\-_:]*$/.test(tagName)) {
          tagStack.push({ name: tagName, line });
        } else {
          errors.push(`${filename} [Line ${line}]: Invalid tag name '<${tagName}>'`);
        }
      }

      i = closeBracket + 1;
      continue;
    }

    i++;
  }

  if (tagStack.length > 0) {
    tagStack.forEach(unclosed => {
      errors.push(`${filename}: Unclosed tag <${unclosed.name}> opened at line ${unclosed.line}`);
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Test against files if run directly
const filesToTest = [
  path.join(rootDir, 'public', 'rss.xml'),
  path.join(rootDir, 'public', 'feed.xml'),
  path.join(rootDir, 'public', 'sitemap.xml'),
  path.join(rootDir, 'dist', 'rss.xml'),
  path.join(rootDir, 'dist', 'feed.xml'),
  path.join(rootDir, 'dist', 'sitemap.xml')
];

let allPassed = true;

for (const filePath of filesToTest) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relName = path.relative(rootDir, filePath);
    const result = validateXmlString(content, relName);
    if (result.valid) {
      console.log(`PASS: ${relName} is 100% valid XML`);
    } else {
      console.error(`FAIL: ${relName} has XML errors:`, result.errors);
      allPassed = false;
    }
  }
}

if (!allPassed) {
  process.exit(1);
}
