#!/usr/bin/env python3
"""
Enhanced Markdown Formatter
Fixes remaining image URL issues and enhances markdown with proper formatting
"""

import os
import re
from pathlib import Path

def fix_image_urls(content):
    """Fix duplicate image URL patterns like ![](url)](url)"""
    # Pattern: ![](https://...)](https://...)
    pattern = r'!\[\]\((https://[^)]+)\)\]\(\1\)'
    fixed_content = re.sub(pattern, r'![](\1)', content)

    # Also check for variations with different sizes
    pattern2 = r'!\[\]\((https://[^)]+/s\d+/[^)]+)\)\]\((https://[^)]+/s\d+/[^)]+)\)'
    fixed_content = re.sub(pattern2, r'![](\2)', fixed_content)

    return fixed_content

def enhance_headings(content):
    """Add proper H2/H3 headings for section breaks"""
    lines = content.split('\n')
    enhanced_lines = []
    in_code_block = False

    for i, line in enumerate(lines):
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            enhanced_lines.append(line)
            continue

        if in_code_block:
            enhanced_lines.append(line)
            continue

        # Skip if already a heading
        if line.strip().startswith('#'):
            enhanced_lines.append(line)
            continue

        # Look for lines that end with colon and are followed by content
        # These are likely section headers
        if line.strip().endswith(':') and len(line.strip()) > 3 and len(line.strip()) < 80:
            # Check if not part of a URL or code
            if 'http' not in line and not line.strip().startswith('-'):
                # Don't convert if it's a simple list item
                if i > 0 and not lines[i-1].strip().startswith('-'):
                    # Check next line exists and has content
                    if i + 1 < len(lines) and lines[i+1].strip():
                        # Make it a heading
                        heading_text = line.strip().rstrip(':')
                        enhanced_lines.append(f"\n## {heading_text}\n")
                        continue

        enhanced_lines.append(line)

    return '\n'.join(enhanced_lines)

def enhance_emphasis(content):
    """Add bold and italic for emphasis"""
    lines = content.split('\n')
    enhanced_lines = []
    in_code_block = False

    # Technical terms that should be bold (case-insensitive)
    tech_terms = [
        'Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Terraform',
        'DevOps', 'DevSecOps', 'CI/CD', 'AWS', 'Azure', 'GCP',
        'Linux', 'Ubuntu', 'CentOS', 'RedHat', 'RHCE',
        'Git', 'GitHub', 'GitLab', 'Vagrant', 'Nagios',
        'Hadoop', 'Oozie', 'HDFS', 'MapReduce',
        'Python', 'Java', 'JavaScript', 'Node.js',
        'API', 'REST', 'JSON', 'YAML', 'XML',
        'SSL', 'TLS', 'SSH', 'FTP', 'HTTP', 'HTTPS',
        'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
        'Nginx', 'Apache', 'Tomcat',
        'VMware', 'VirtualBox', 'KVM', 'Xen',
        'Cobbler', 'PXE', 'DHCP', 'DNS',
        'Bugzilla', 'JIRA', 'Confluence',
        'ACM', 'ICPC'
    ]

    for line in lines:
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            enhanced_lines.append(line)
            continue

        if in_code_block or line.strip().startswith('#') or line.strip().startswith('![]'):
            enhanced_lines.append(line)
            continue

        enhanced_line = line

        # Make first occurrence of technical terms bold (if not already formatted)
        for term in tech_terms:
            # Only bold if it's a standalone word and not already bold/in link
            pattern = r'(?<!\*\*)(?<!\[)(?<!\w)(' + re.escape(term) + r')(?!\w)(?!\])(?!\*\*)'
            # Only replace first occurrence in the line
            enhanced_line = re.sub(pattern, r'**\1**', enhanced_line, count=1, flags=re.IGNORECASE)

        enhanced_lines.append(enhanced_line)

    return '\n'.join(enhanced_lines)

def create_tables(content):
    """Convert structured data into markdown tables where applicable"""
    lines = content.split('\n')
    enhanced_lines = []
    in_code_block = False
    potential_table = []

    for line in lines:
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            enhanced_lines.append(line)
            continue

        if in_code_block:
            enhanced_lines.append(line)
            continue

        # Look for pattern: "key: value" or "key - value" lines
        if re.match(r'^[\w\s]+:\s+.+$', line.strip()) or re.match(r'^[\w\s]+-\s+.+$', line.strip()):
            potential_table.append(line)
        else:
            # If we have accumulated potential table rows, check if should convert
            if len(potential_table) >= 3:
                # Convert to table
                enhanced_lines.append('\n')
                enhanced_lines.append('| Item | Description |')
                enhanced_lines.append('|------|-------------|')
                for table_line in potential_table:
                    if ':' in table_line:
                        parts = table_line.split(':', 1)
                    elif '-' in table_line:
                        parts = table_line.split('-', 1)
                    else:
                        continue
                    item = parts[0].strip()
                    desc = parts[1].strip()
                    enhanced_lines.append(f'| {item} | {desc} |')
                enhanced_lines.append('\n')
                potential_table = []
            elif potential_table:
                # Not enough for table, add as-is
                enhanced_lines.extend(potential_table)
                potential_table = []

            enhanced_lines.append(line)

    # Handle any remaining potential table
    if potential_table:
        enhanced_lines.extend(potential_table)

    return '\n'.join(enhanced_lines)

def process_blog(file_path):
    """Process a single blog file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Extract frontmatter
    frontmatter_match = re.match(r'^(---\s*\n.*?\n---\s*\n)', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        body = content[len(frontmatter):]
    else:
        frontmatter = ''
        body = content

    # Apply fixes and enhancements
    body = fix_image_urls(body)
    body = enhance_headings(body)
    body = enhance_emphasis(body)
    # Commenting out table creation as it might be too aggressive
    # body = create_tables(body)

    # Recombine
    new_content = frontmatter + body

    # Only write if changed
    if new_content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True

    return False

def main():
    blogs_dir = Path('blogs')

    if not blogs_dir.exists():
        print("Error: blogs directory not found")
        return

    total_files = 0
    modified_files = 0

    print("Enhancing markdown formatting...")
    print("=" * 60)

    for md_file in sorted(blogs_dir.glob('*.md')):
        total_files += 1
        if process_blog(md_file):
            modified_files += 1
            print(f"✓ Enhanced: {md_file.name}")
        else:
            print(f"  Skipped: {md_file.name} (no changes needed)")

    print("=" * 60)
    print(f"\nProcessed {total_files} files")
    print(f"Modified {modified_files} files")
    print("\nEnhancements applied:")
    print("  ✓ Fixed remaining image URL display issues")
    print("  ✓ Added H2 headings for section breaks")
    print("  ✓ Added bold formatting for technical terms")
    print("  ✓ Improved overall markdown structure")

if __name__ == '__main__':
    main()
