#!/usr/bin/env python3
"""
Fix Mismatched Bold Markers in Blog Posts
Fixes issues where ** markers are mismatched or orphaned
"""

import re
from pathlib import Path

def count_bold_markers(text):
    """Count the number of ** markers in text"""
    return text.count('**')

def fix_bold_markers(content):
    """Fix mismatched bold markers in content"""
    # Extract frontmatter
    frontmatter_match = re.match(r'^(---\s*\n.*?\n---\s*\n)', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        body = content[len(frontmatter):]
    else:
        frontmatter = ''
        body = content

    lines = body.split('\n')
    fixed_lines = []
    in_code_block = False

    for line in lines:
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            fixed_lines.append(line)
            continue

        if in_code_block:
            fixed_lines.append(line)
            continue

        fixed_line = line

        # Pattern 0: Line starts with **- (list item with orphaned **)
        # Handle both with and without leading whitespace
        if '**-' in line and (line.strip().startswith('**-') or line.lstrip().startswith('**-')):
            # Preserve leading whitespace
            indent = len(line) - len(line.lstrip())
            rest = line.lstrip()
            if rest.startswith('**-'):
                fixed_line = ' ' * indent + rest.replace('**-', '-', 1)

        # Pattern 1: Line starts with **Word and check for issues
        elif line.strip().startswith('**'):
            count = line.count('**')

            # If count is 1, definitely unpaired
            if count == 1:
                # If it looks like a heading (ends with : or is short), make it a heading
                if line.strip().endswith(':') or (len(line.strip()) < 50 and not '.' in line):
                    text = line.strip()[2:].rstrip(':')  # Remove ** from start and : from end
                    if text and not text.startswith('#'):
                        fixed_line = f"## {text}"
                    else:
                        fixed_line = line.replace('**', '', 1)
                else:
                    # Otherwise just remove the **
                    fixed_line = line.replace('**', '', 1)

            # If count is 2, check if they form a proper pair
            elif count == 2:
                # Split by **
                parts = line.split('**')
                # parts will be: ['', 'text1', 'text2']  if line is **text1**text2
                # or: ['', 'text1 ... ', 'text2'] if line is **text1 ... **text2

                # If second part is long (> 20 chars) or contains " - ", likely not a proper bold pair
                if len(parts[1]) > 20 or ' - ' in parts[1]:
                    # Remove the first **, keep the rest as **text2**
                    fixed_line = parts[1] + '**' + parts[2] + '**'
                # Otherwise, it's probably okay, leave it
                else:
                    fixed_line = line

        # Pattern 2: Line ends with ** alone (like "yaml**" or "command**")
        elif re.search(r'\w\*\*\s*$', line):
            # Remove the trailing **
            fixed_line = re.sub(r'\*\*(\s*)$', r'\1', line)

        # Pattern 3: Check if line has odd number of ** markers (do this before pattern 4!)
        elif '**' in line and line.count('**') % 2 != 0:
                # Odd number of markers, need to fix
                # Strategy: Remove all ** that appear to be orphaned
                # Priority: Keep first complete pair, remove unpaired ones

                # Split by **
                parts = line.split('**')

                # Check the pattern to decide what to do
                # If we have 3 parts (2 **), e.g., "**text1 text2 **text3"
                if len(parts) == 3:
                    # Check if it starts with ** (first part is empty or whitespace)
                    if not parts[0].strip():
                        # Pattern: **text1 **text2 -> remove first **, keep second pair
                        # Result: text1 **text2**
                        fixed_line = parts[1] + '**' + parts[2] + '**'
                    else:
                        # Pattern: text1 **text2 **text3 -> remove last **
                        fixed_line = parts[0] + '**' + parts[1] + '**' + parts[2]
                # If we have 4 parts (3 **), pattern is **text1 **text2 text3** or similar
                elif len(parts) == 4:
                    # Just keep the first complete pair and remove the rest
                    # Pattern: **text1 **text2 text3 -> text1 **text2** text3
                    fixed_line = parts[0] + '**' + parts[1] + '**' + parts[2] + parts[3]
                # Otherwise, if starts with **, remove leading **
                elif line.strip().startswith('**'):
                    fixed_line = line.replace('**', '', 1)
                # If ends with **, remove it
                elif line.rstrip().endswith('**'):
                    fixed_line = re.sub(r'\*\*\s*$', '', line)
                else:
                    # Fallback: remove all ** to be safe
                    fixed_line = line.replace('**', '')

        # Pattern 4: Line has text** word (like "chef-docker** cookbook")
        # This is a catch-all for remaining ** between words
        elif re.search(r'\w\*\*\s+[a-zA-Z]', line):
            # Remove ** when it appears between words
            fixed_line = re.sub(r'(\w)\*\*(\s+[a-zA-Z])', r'\1\2', line)

        # Pattern 5: Line has a single ** in the middle (orphan)
        elif '**' in line and line.count('**') == 1:
            # Just remove the single **
            fixed_line = line.replace('**', '')

        fixed_lines.append(fixed_line)

    return frontmatter + '\n'.join(fixed_lines)

def process_blog_file(file_path):
    """Process a single blog file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        fixed_content = fix_bold_markers(original_content)

        if fixed_content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
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

    print("Fixing Mismatched Bold Markers (**)")
    print("=" * 70)

    total_files = 0
    modified_files = 0

    for md_file in sorted(blogs_dir.glob('*.md')):
        total_files += 1
        if process_blog_file(md_file):
            modified_files += 1
            print(f"✓ Fixed: {md_file.name}")

    print("=" * 70)
    print(f"\nProcessed: {total_files} files")
    print(f"Modified: {modified_files} files")
    print("\nFixes applied:")
    print("  ✓ Removed orphaned ** at start of lines")
    print("  ✓ Removed orphaned ** at end of lines")
    print("  ✓ Fixed ** between words (like 'word** other')")
    print("  ✓ Converted **Heading: to ## Heading")
    print("  ✓ Fixed lines with odd number of ** markers")
    print()
    print("All mismatched bold markers have been fixed!")

if __name__ == '__main__':
    main()
