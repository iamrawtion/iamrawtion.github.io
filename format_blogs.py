#!/usr/bin/env python3
"""
Script to improve markdown formatting for blog posts.
Detects and formats code blocks, fixes list formatting, and preserves content.
"""

import re
import glob
from pathlib import Path
from typing import List, Tuple, Dict

class MarkdownFormatter:
    def __init__(self):
        # Common command prefixes
        self.command_prefixes = [
            'sudo', 'apt-get', 'apt', 'yum', 'dnf', 'docker', 'kubectl', 'git',
            'npm', 'pip', 'pip3', 'python', 'python3', 'ruby', 'gem', 'cd', 'ls',
            'mkdir', 'cp', 'mv', 'rm', 'rmdir', 'chmod', 'chown', 'wget', 'curl',
            'ssh', 'scp', 'rsync', 'ansible', 'ansible-playbook', 'terraform',
            'vagrant', 'make', 'gcc', 'java', 'javac', 'mvn', 'gradle', 'cat',
            'echo', 'grep', 'find', 'sed', 'awk', 'ps', 'kill', 'systemctl',
            'service', 'netstat', 'ifconfig', 'ip', 'ping', 'traceroute', 'nslookup',
            'dig', 'host', 'export', 'source', 'virtualenv', 'conda', 'brew'
        ]

        # Statistics
        self.stats = {
            'code_blocks_created': 0,
            'lists_formatted': 0,
            'yaml_blocks': 0,
            'json_blocks': 0,
            'bash_blocks': 0,
            'tree_blocks': 0
        }

    def is_command_line(self, line: str) -> bool:
        """Detect if line is a command."""
        stripped = line.strip()
        if not stripped:
            return False

        # Check for command prefixes
        for cmd in self.command_prefixes:
            if stripped.startswith(cmd + ' ') or stripped == cmd:
                return True

        # Check for common shell patterns
        if re.match(r'^[a-z_][a-z0-9_-]*\s+', stripped):
            # Simple command pattern
            if any(char in stripped for char in ['--', '-h', '&&', '||', '|', '>']):
                return True

        return False

    def is_output_line(self, line: str, prev_was_command: bool) -> bool:
        """Detect if line looks like command output."""
        stripped = line.strip()
        if not stripped:
            return False

        # If previous line was command, this might be output
        if prev_was_command:
            # Common output patterns
            output_patterns = [
                r'^[A-Z][a-z]+:',  # "Client version:", "Server version:"
                r'^\d+\s',  # Numbers at start
                r'^[A-Z_]+\s+=',  # ENV VAR =
                r'^[a-z_]+\s*:',  # key: value
                r'^\s*\d+\.\d+',  # Version numbers
                r'^(Pulling|Download|Downloading|Installing|Installed)',  # Docker/apt output
                r'^(CONTAINER|IMAGE|REPOSITORY|NAME|USER)',  # Docker table headers
                r'^\[',  # Progress bars [=====>    ]
                r'^\w+\s+\d+',  # "Containers: 1"
            ]

            for pattern in output_patterns:
                if re.match(pattern, stripped):
                    return True

        return False

    def is_tree_line(self, line: str) -> bool:
        """Detect directory tree structure."""
        tree_chars = ['├──', '└──', '│', '|--', '`--']
        return any(char in line for char in tree_chars)

    def is_yaml_line(self, line: str) -> bool:
        """Detect YAML syntax."""
        stripped = line.strip()
        if not stripped:
            return True  # Empty lines are fine in YAML

        # YAML patterns
        yaml_patterns = [
            r'^[a-zA-Z_][a-zA-Z0-9_-]*\s*:',  # key:
            r'^-\s+[a-zA-Z_]',  # - item
            r'^\s+[a-zA-Z_][a-zA-Z0-9_-]*\s*:',  # indented key:
        ]

        for pattern in yaml_patterns:
            if re.match(pattern, stripped):
                return True

        return False

    def is_json_line(self, line: str) -> bool:
        """Detect JSON syntax."""
        stripped = line.strip()
        json_chars = ['{', '}', '[', ']']
        if any(stripped.startswith(c) or stripped.endswith(c) for c in json_chars):
            return True
        if re.match(r'^\s*"[^"]+"\s*:', stripped):  # "key":
            return True
        return False

    def is_separator_line(self, line: str) -> bool:
        """Detect separator lines like ---, ====, etc."""
        stripped = line.strip()
        if len(stripped) >= 3:
            if all(c == '-' for c in stripped):
                return True
            if all(c == '=' for c in stripped):
                return True
        return False

    def extract_frontmatter(self, lines: List[str]) -> Tuple[List[str], List[str]]:
        """Extract frontmatter from the beginning of the file."""
        if not lines or not lines[0].strip() == '---':
            return [], lines

        # Find the closing ---
        for i in range(1, len(lines)):
            if lines[i].strip() == '---':
                return lines[:i+1], lines[i+1:]

        return [], lines

    def format_content(self, lines: List[str]) -> List[str]:
        """Format the content lines (excluding frontmatter)."""
        result = []
        i = 0
        in_code_block = False

        while i < len(lines):
            line = lines[i]

            # Skip if already in a code block
            if line.strip().startswith('```'):
                result.append(line)
                in_code_block = not in_code_block
                i += 1
                continue

            if in_code_block:
                result.append(line)
                i += 1
                continue

            # Check for separator-based code blocks
            if self.is_separator_line(line):
                code_block, next_i = self.extract_separator_block(lines, i)
                if code_block:
                    result.extend(code_block)
                    i = next_i
                    continue

            # Check for tree structures
            if self.is_tree_line(line):
                tree_block, next_i = self.extract_tree_block(lines, i)
                if tree_block:
                    result.append('```')
                    result.extend(tree_block)
                    result.append('```')
                    result.append('')
                    self.stats['tree_blocks'] += 1
                    self.stats['code_blocks_created'] += 1
                    i = next_i
                    continue

            # Check for command blocks
            if self.is_command_line(line):
                command_block, next_i = self.extract_command_block(lines, i)
                if command_block:
                    result.append('```bash')
                    result.extend(command_block)
                    result.append('```')
                    result.append('')
                    self.stats['bash_blocks'] += 1
                    self.stats['code_blocks_created'] += 1
                    i = next_i
                    continue

            # Check for YAML blocks
            if self.is_yaml_line(line) and ':' in line:
                yaml_block, next_i = self.extract_yaml_block(lines, i)
                if yaml_block and len(yaml_block) > 1:  # More than one line
                    result.append('```yaml')
                    result.extend(yaml_block)
                    result.append('```')
                    result.append('')
                    self.stats['yaml_blocks'] += 1
                    self.stats['code_blocks_created'] += 1
                    i = next_i
                    continue

            # Check for JSON blocks
            if self.is_json_line(line):
                json_block, next_i = self.extract_json_block(lines, i)
                if json_block:
                    result.append('```json')
                    result.extend(json_block)
                    result.append('```')
                    result.append('')
                    self.stats['json_blocks'] += 1
                    self.stats['code_blocks_created'] += 1
                    i = next_i
                    continue

            # Check for list items
            if re.match(r'^[\*\-]\s+\w+', line.strip()):
                list_block, next_i = self.extract_list_block(lines, i)
                if list_block:
                    # Ensure blank line before list
                    if result and result[-1].strip():
                        result.append('')
                    result.extend(list_block)
                    result.append('')
                    self.stats['lists_formatted'] += 1
                    i = next_i
                    continue

            # Default: keep the line as is
            result.append(line)
            i += 1

        return result

    def extract_separator_block(self, lines: List[str], start: int) -> Tuple[List[str], int]:
        """Extract code block marked by separator lines."""
        if not self.is_separator_line(lines[start]):
            return None, start

        # Find the closing separator
        code_lines = []
        i = start + 1

        while i < len(lines):
            if self.is_separator_line(lines[i]):
                # Found closing separator
                if code_lines:
                    # Determine language
                    lang = self.detect_code_language(code_lines)
                    result = [f'```{lang}']
                    result.extend(code_lines)
                    result.append('```')
                    result.append('')
                    return result, i + 1
                break
            code_lines.append(lines[i])
            i += 1

        return None, start

    def extract_tree_block(self, lines: List[str], start: int) -> Tuple[List[str], int]:
        """Extract directory tree structure."""
        tree_lines = []
        i = start

        while i < len(lines):
            if self.is_tree_line(lines[i]) or lines[i].strip().startswith('.') or lines[i].strip().startswith('├') or lines[i].strip().startswith('└') or lines[i].strip().startswith('│'):
                tree_lines.append(lines[i])
                i += 1
            elif not lines[i].strip():
                i += 1
                break
            else:
                break

        if len(tree_lines) > 1:
            return tree_lines, i

        return None, start

    def extract_command_block(self, lines: List[str], start: int) -> Tuple[List[str], int]:
        """Extract command and possibly output lines."""
        command_lines = []
        i = start
        prev_was_command = True

        while i < len(lines):
            line = lines[i]

            # Empty line might be end of block
            if not line.strip():
                # Look ahead to see if more commands follow
                if i + 1 < len(lines) and self.is_command_line(lines[i + 1]):
                    i += 1
                    continue
                else:
                    break

            # Check if this is a command or output
            if self.is_command_line(line):
                command_lines.append(line)
                prev_was_command = True
                i += 1
            elif self.is_output_line(line, prev_was_command):
                command_lines.append(line)
                prev_was_command = False
                i += 1
            elif prev_was_command and not line.strip().startswith('#') and not re.match(r'^[A-Z].*[.!?]$', line.strip()):
                # Might be continuation or output
                # Check if it looks like output
                if any(char in line for char in [':', '=', '/', '-', '|']):
                    command_lines.append(line)
                    i += 1
                else:
                    break
            else:
                break

        if command_lines:
            return command_lines, i

        return None, start

    def extract_yaml_block(self, lines: List[str], start: int) -> Tuple[List[str], int]:
        """Extract YAML block."""
        yaml_lines = []
        i = start
        base_indent = len(lines[start]) - len(lines[start].lstrip())

        while i < len(lines):
            line = lines[i]

            # Empty lines are ok in YAML
            if not line.strip():
                # Check if next line continues YAML
                if i + 1 < len(lines) and self.is_yaml_line(lines[i + 1]):
                    yaml_lines.append(line)
                    i += 1
                    continue
                else:
                    break

            # Check if line is YAML
            if self.is_yaml_line(line):
                yaml_lines.append(line)
                i += 1
            else:
                break

        if len(yaml_lines) > 1:
            return yaml_lines, i

        return None, start

    def extract_json_block(self, lines: List[str], start: int) -> Tuple[List[str], int]:
        """Extract JSON block."""
        json_lines = []
        i = start
        brace_count = 0
        bracket_count = 0

        while i < len(lines):
            line = lines[i]
            json_lines.append(line)

            # Count braces and brackets
            brace_count += line.count('{') - line.count('}')
            bracket_count += line.count('[') - line.count(']')

            i += 1

            # If balanced, we might be done
            if brace_count == 0 and bracket_count == 0 and json_lines:
                break

            # Safety check
            if i - start > 100:
                break

        if len(json_lines) > 1:
            return json_lines, i

        return None, start

    def extract_list_block(self, lines: List[str], start: int) -> Tuple[List[str], int]:
        """Extract markdown list block."""
        list_lines = []
        i = start

        while i < len(lines):
            line = lines[i]

            # Empty line might separate list items or end list
            if not line.strip():
                # Check if next line is also a list item
                if i + 1 < len(lines) and re.match(r'^[\*\-]\s+\w+', lines[i + 1].strip()):
                    i += 1
                    continue
                else:
                    break

            # Check if it's a list item
            if re.match(r'^[\*\-]\s+\w+', line.strip()):
                # Convert to proper markdown list
                list_lines.append(line)
                i += 1
            else:
                break

        return list_lines, i

    def detect_code_language(self, lines: List[str]) -> str:
        """Detect programming language of code block."""
        text = '\n'.join(lines)

        # Python
        if re.search(r'\b(def|class|import|from|print)\b', text):
            return 'python'

        # Bash/Shell
        if re.search(r'#!/bin/(bash|sh)', text) or re.search(r'\b(if|then|fi|case|esac)\b', text):
            return 'bash'

        # YAML
        if re.search(r'^[a-zA-Z_][a-zA-Z0-9_-]*\s*:', text, re.MULTILINE):
            return 'yaml'

        # JSON
        if re.search(r'^\s*[{\[]', text, re.MULTILINE) or re.search(r'^\s*"[^"]+"\s*:', text, re.MULTILINE):
            return 'json'

        # Default
        return ''

    def format_blog(self, content: str) -> str:
        """Format a blog post's markdown content."""
        lines = content.split('\n')

        # Extract frontmatter
        frontmatter, body_lines = self.extract_frontmatter(lines)

        # Format body
        formatted_body = self.format_content(body_lines)

        # Combine
        result = frontmatter + formatted_body

        return '\n'.join(result)

def process_blogs(directory: str = '/home/user/iamrawtion.github.io/blogs'):
    """Process all blog files."""
    formatter = MarkdownFormatter()

    # Get all markdown files except README
    blog_files = sorted(glob.glob(f'{directory}/*.md'))
    blog_files = [f for f in blog_files if 'README' not in f]

    print(f"Found {len(blog_files)} blog files to process\n")

    processed_files = []
    errors = []

    for filepath in blog_files:
        try:
            # Read original content
            with open(filepath, 'r', encoding='utf-8') as f:
                original_content = f.read()

            # Format content
            formatted_content = formatter.format_blog(original_content)

            # Write back
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(formatted_content)

            processed_files.append(Path(filepath).name)
            print(f"✓ Processed: {Path(filepath).name}")

        except Exception as e:
            errors.append((Path(filepath).name, str(e)))
            print(f"✗ Error processing {Path(filepath).name}: {e}")

    # Print summary
    print(f"\n{'='*60}")
    print("PROCESSING SUMMARY")
    print(f"{'='*60}")
    print(f"Total files processed: {len(processed_files)}")
    print(f"Errors: {len(errors)}")
    print(f"\nFormatting Statistics:")
    print(f"  - Total code blocks created: {formatter.stats['code_blocks_created']}")
    print(f"  - Bash blocks: {formatter.stats['bash_blocks']}")
    print(f"  - YAML blocks: {formatter.stats['yaml_blocks']}")
    print(f"  - JSON blocks: {formatter.stats['json_blocks']}")
    print(f"  - Tree blocks: {formatter.stats['tree_blocks']}")
    print(f"  - Lists formatted: {formatter.stats['lists_formatted']}")

    if errors:
        print(f"\nErrors encountered:")
        for filename, error in errors:
            print(f"  - {filename}: {error}")

    print(f"\n{'='*60}\n")

    return processed_files, errors, formatter.stats

if __name__ == "__main__":
    process_blogs()
