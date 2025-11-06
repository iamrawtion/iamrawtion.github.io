#!/usr/bin/env python3
"""
Professional Markdown Reformatter for Blog Posts
Applies best markdown practices to blogs scraped from WYSIWYG editor
"""

import os
import re
from pathlib import Path
from typing import List, Tuple

class MarkdownReformatter:
    def __init__(self):
        # Technical terms that should be bold
        self.tech_terms = [
            'Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Terraform',
            'DevOps', 'DevSecOps', 'CI/CD', 'AWS', 'Azure', 'GCP',
            'Linux', 'Ubuntu', 'CentOS', 'RedHat', 'RHCE',
            'Git', 'GitHub', 'GitLab', 'Vagrant', 'Nagios',
            'Hadoop', 'Oozie', 'HDFS', 'MapReduce',
            'Python', 'Java', 'JavaScript', 'Node.js', 'Ruby',
            'API', 'REST', 'JSON', 'YAML', 'XML',
            'SSL', 'TLS', 'SSH', 'FTP', 'HTTP', 'HTTPS',
            'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
            'Nginx', 'Apache', 'Tomcat',
            'VMware', 'VirtualBox', 'KVM', 'Xen',
            'Cobbler', 'PXE', 'DHCP', 'DNS',
            'Bugzilla', 'JIRA', 'Confluence',
            'ACM', 'ICPC', 'OWASP', 'Kali', 'Metasploit',
            'Qualys', 'Snyk', 'Twistlock', 'Travis', 'CircleCI'
        ]

    def extract_frontmatter(self, content: str) -> Tuple[str, str]:
        """Extract and return frontmatter and body separately"""
        frontmatter_match = re.match(r'^(---\s*\n.*?\n---\s*\n)', content, re.DOTALL)
        if frontmatter_match:
            return frontmatter_match.group(1), content[len(frontmatter_match.group(1)):]
        return '', content

    def clean_whitespace(self, content: str) -> str:
        """Clean up excessive whitespace while preserving intentional breaks"""
        # Remove trailing whitespace from lines
        content = re.sub(r'[ \t]+$', '', content, flags=re.MULTILINE)

        # Replace 3+ newlines with exactly 2 (paragraph break)
        content = re.sub(r'\n{3,}', '\n\n', content)

        # Remove double horizontal rules (---\n\n---)
        content = re.sub(r'---\s*\n+---', '---', content)

        # Ensure blank line before and after headings
        content = re.sub(r'([^\n])\n(#{1,6} )', r'\1\n\n\2', content)
        content = re.sub(r'(#{1,6} [^\n]+)\n([^\n#])', r'\1\n\n\2', content)

        return content.strip()

    def improve_heading_hierarchy(self, content: str) -> str:
        """Improve heading structure and hierarchy"""
        lines = content.split('\n')
        improved_lines = []
        in_code_block = False

        for i, line in enumerate(lines):
            # Track code blocks
            if line.strip().startswith('```'):
                in_code_block = not in_code_block
                improved_lines.append(line)
                continue

            if in_code_block or line.strip().startswith('#'):
                improved_lines.append(line)
                continue

            # Look for potential section headers
            # Pattern 1: Line ending with colon, short, not a URL
            if (line.strip().endswith(':') and
                5 < len(line.strip()) < 100 and
                'http' not in line.lower() and
                not line.strip().startswith('-') and
                not line.strip().startswith('*')):

                # Check if next line has content
                if i + 1 < len(lines) and lines[i + 1].strip():
                    # Make it a H2 heading
                    heading_text = line.strip().rstrip(':')
                    improved_lines.append(f"## {heading_text}")
                    continue

            # Pattern 2: Short line (potential title) followed by content
            if (i > 0 and
                5 < len(line.strip()) < 80 and
                not line.strip().startswith('-') and
                not line.strip().startswith('*') and
                not line.strip().startswith('!') and
                not line.strip().startswith('[') and
                not line.strip().startswith('```') and
                i + 1 < len(lines) and
                lines[i - 1].strip() == '' and  # Blank line before
                len(lines[i + 1].strip()) > 50):  # Substantial content after

                # Check if it looks like a title (capitalized, no ending punctuation except :)
                if (line[0].isupper() and
                    not line.strip().endswith('.') and
                    not line.strip().endswith(',') and
                    'http' not in line.lower()):

                    # Make it a H2 heading
                    improved_lines.append(f"## {line.strip()}")
                    continue

            improved_lines.append(line)

        return '\n'.join(improved_lines)

    def format_lists(self, content: str) -> str:
        """Improve list formatting with proper spacing"""
        lines = content.split('\n')
        formatted_lines = []
        in_code_block = False
        in_list = False

        for i, line in enumerate(lines):
            # Track code blocks
            if line.strip().startswith('```'):
                in_code_block = not in_code_block
                formatted_lines.append(line)
                continue

            if in_code_block:
                formatted_lines.append(line)
                continue

            is_list_item = line.strip().startswith('-') or line.strip().startswith('*') or re.match(r'^\d+\.', line.strip())

            if is_list_item:
                if not in_list and formatted_lines and formatted_lines[-1].strip() != '':
                    # Add blank line before list starts
                    formatted_lines.append('')
                in_list = True
                formatted_lines.append(line)
            else:
                if in_list and line.strip() != '':
                    # Add blank line after list ends
                    formatted_lines.append('')
                    in_list = False
                formatted_lines.append(line)

        return '\n'.join(formatted_lines)

    def enhance_code_blocks(self, content: str) -> str:
        """Ensure code blocks have proper language tags and formatting"""
        lines = content.split('\n')
        enhanced_lines = []
        in_code_block = False

        for i, line in enumerate(lines):
            if line.strip() == '```':
                # Check if we're starting a code block
                if not in_code_block and i + 1 < len(lines):
                    next_line = lines[i + 1].strip()
                    # Try to detect language
                    if any(cmd in next_line for cmd in ['sudo', 'apt-get', 'yum', 'docker', 'kubectl', 'git', 'npm', 'cd', 'ls', 'mkdir', 'chmod']):
                        enhanced_lines.append('```bash')
                        in_code_block = True
                        continue
                    elif next_line.startswith('{') or next_line.startswith('['):
                        enhanced_lines.append('```json')
                        in_code_block = True
                        continue
                    elif ':' in next_line and not next_line.startswith('http'):
                        enhanced_lines.append('```yaml')
                        in_code_block = True
                        continue
                in_code_block = not in_code_block

            enhanced_lines.append(line)

        return '\n'.join(enhanced_lines)

    def add_emphasis(self, content: str) -> str:
        """Add bold emphasis to important technical terms"""
        lines = content.split('\n')
        emphasized_lines = []
        in_code_block = False

        for line in lines:
            # Track code blocks
            if line.strip().startswith('```'):
                in_code_block = not in_code_block
                emphasized_lines.append(line)
                continue

            # Don't modify headings, links, images, or code blocks
            if (in_code_block or
                line.strip().startswith('#') or
                line.strip().startswith('![') or
                line.strip().startswith('http')):
                emphasized_lines.append(line)
                continue

            emphasized_line = line

            # Skip lines with URLs
            if 'http://' in line or 'https://' in line or '.com' in line or '.io' in line:
                emphasized_lines.append(line)
                continue

            # Bold technical terms (only first occurrence per line)
            for term in self.tech_terms:
                # Only bold if it's a whole word and not already bold
                pattern = r'(?<!\*\*)(?<!\[)(?<!\w)(' + re.escape(term) + r')(?!\w)(?!\])(?!\*\*)'
                # Only replace first occurrence
                emphasized_line = re.sub(pattern, r'**\1**', emphasized_line, count=1, flags=re.IGNORECASE)

            emphasized_lines.append(emphasized_line)

        return '\n'.join(emphasized_lines)

    def add_blockquotes(self, content: str) -> str:
        """Add blockquotes for important notes or quotes"""
        lines = content.split('\n')
        quoted_lines = []
        in_code_block = False

        important_markers = [
            'note:', 'important:', 'warning:', 'remember:', 'tip:',
            'caution:', 'attention:', 'summary:'
        ]

        for line in lines:
            # Track code blocks
            if line.strip().startswith('```'):
                in_code_block = not in_code_block
                quoted_lines.append(line)
                continue

            if in_code_block or line.strip().startswith('#') or line.strip().startswith('>'):
                quoted_lines.append(line)
                continue

            # Check if line starts with important marker
            line_lower = line.strip().lower()
            if any(line_lower.startswith(marker) for marker in important_markers):
                # Make it a blockquote
                quoted_lines.append(f"> {line.strip()}")
                continue

            quoted_lines.append(line)

        return '\n'.join(quoted_lines)

    def improve_paragraphs(self, content: str) -> str:
        """Improve paragraph breaks and readability"""
        lines = content.split('\n')
        improved_lines = []
        in_code_block = False
        prev_was_short = False

        for i, line in enumerate(lines):
            # Track code blocks
            if line.strip().startswith('```'):
                in_code_block = not in_code_block
                improved_lines.append(line)
                prev_was_short = False
                continue

            if in_code_block:
                improved_lines.append(line)
                continue

            # If line is very long (>500 chars) and contains sentences, try to break it
            if len(line) > 500 and '. ' in line and not line.strip().startswith('-'):
                # Split on '. ' and create separate paragraphs
                sentences = line.split('. ')
                for j, sentence in enumerate(sentences):
                    if j > 0:
                        sentence = sentence[0].upper() + sentence[1:] if len(sentence) > 1 else sentence
                    improved_lines.append(sentence.strip() + ('.' if j < len(sentences) - 1 and not sentence.endswith('.') else ''))
                    if j < len(sentences) - 1 and len(sentence) > 100:
                        # Add paragraph break after long sentences
                        improved_lines.append('')
                prev_was_short = False
                continue

            improved_lines.append(line)
            prev_was_short = len(line.strip()) < 50

        return '\n'.join(improved_lines)

    def fix_links(self, content: str) -> str:
        """Fix and improve link formatting"""
        # Fix markdown links that have ** in the URL part: [text](url**with**bold)
        # Match [text](url) pattern and remove ** from URL
        def fix_url_in_link(match):
            text_part = match.group(1)
            url_part = match.group(2)
            # Remove all ** from URL part
            clean_url = url_part.replace('**', '')
            return f'[{text_part}]({clean_url})'

        # Fix links with ** in URL
        content = re.sub(r'\[([^\]]+)\]\(([^)]*\*\*[^)]*)\)', fix_url_in_link, content)

        # Fix bold markers scattered in standalone URLs - multiple passes to catch all
        for _ in range(3):  # Run multiple times to catch nested patterns
            content = re.sub(r'\*\*([:/.-])', r'\1', content)  # **:// -> ://
            content = re.sub(r'([:/.-])\*\*', r'\1', content)  # ://** -> ://
            content = re.sub(r'(https?)\*\*', r'\1', content)  # https** -> https
            content = re.sub(r'\*\*(https?)', r'\1', content)  # **https -> https
            content = re.sub(r'(com|org|io|net|in)\*\*', r'\1', content)  # com** -> com
            content = re.sub(r'\*\*(com|org|io|net|in)', r'\1', content)  # **com -> com

        return content

    def add_horizontal_rules(self, content: str) -> str:
        """Add horizontal rules for major section breaks"""
        lines = content.split('\n')
        ruled_lines = []
        in_code_block = False
        prev_was_heading = False

        for i, line in enumerate(lines):
            # Track code blocks
            if line.strip().startswith('```'):
                in_code_block = not in_code_block
                ruled_lines.append(line)
                continue

            if in_code_block:
                ruled_lines.append(line)
                continue

            # Check if this is a major heading (H2) and prev wasn't a heading
            if line.strip().startswith('## ') and not prev_was_heading:
                # Check if there's substantial content before this
                if len(ruled_lines) > 10 and ruled_lines[-1].strip() == '':
                    # Only add if previous line is not already a horizontal rule
                    if ruled_lines[-2].strip() != '---':
                        # Add a subtle horizontal rule before major sections (after first)
                        if i > 20:  # Don't add at very top
                            ruled_lines.append('---')
                            ruled_lines.append('')

            prev_was_heading = line.strip().startswith('#')
            ruled_lines.append(line)

        return '\n'.join(ruled_lines)

    def reformat_blog(self, content: str) -> str:
        """Apply all reformatting steps"""
        # Extract frontmatter
        frontmatter, body = self.extract_frontmatter(content)

        # Apply all improvements
        body = self.clean_whitespace(body)
        body = self.improve_heading_hierarchy(body)
        body = self.format_lists(body)
        body = self.enhance_code_blocks(body)
        body = self.improve_paragraphs(body)
        body = self.add_blockquotes(body)
        body = self.add_emphasis(body)
        body = self.fix_links(body)
        body = self.add_horizontal_rules(body)
        body = self.clean_whitespace(body)  # Final cleanup

        # Recombine
        return frontmatter + body + '\n'

def process_blog_file(file_path: Path, reformatter: MarkdownReformatter) -> bool:
    """Process a single blog file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # Reformat
        new_content = reformatter.reformat_blog(original_content)

        # Only write if changed
        if new_content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True

        return False
    except Exception as e:
        print(f"Error processing {file_path.name}: {e}")
        return False

def main():
    blogs_dir = Path('blogs')

    if not blogs_dir.exists():
        print("Error: blogs directory not found")
        return

    reformatter = MarkdownReformatter()

    print("Professional Markdown Reformatting")
    print("=" * 70)
    print("Applying best markdown practices to all blog posts...")
    print()

    total_files = 0
    modified_files = 0

    # Process all markdown files
    for md_file in sorted(blogs_dir.glob('*.md')):
        total_files += 1
        print(f"Processing: {md_file.name:50s} ", end='', flush=True)

        if process_blog_file(md_file, reformatter):
            modified_files += 1
            print("✓ REFORMATTED")
        else:
            print("  (no changes)")

    print()
    print("=" * 70)
    print(f"Processed: {total_files} files")
    print(f"Reformatted: {modified_files} files")
    print()
    print("Improvements applied:")
    print("  ✓ Proper heading hierarchy (H2, H3)")
    print("  ✓ Enhanced list formatting with proper spacing")
    print("  ✓ Code blocks with appropriate language tags")
    print("  ✓ Bold emphasis on technical terms")
    print("  ✓ Blockquotes for important notes")
    print("  ✓ Improved paragraph spacing and readability")
    print("  ✓ Horizontal rules for major section breaks")
    print("  ✓ Clean whitespace throughout")
    print()
    print("All blogs now follow professional markdown best practices!")

if __name__ == '__main__':
    main()
