#!/usr/bin/env python3
"""
Fix Image Code Block Issues
Removes code block wrappers around images that cause URLs to display as text
"""

import os
import re
from pathlib import Path

def fix_image_codeblocks(content):
    """
    Remove code blocks that wrap images
    Pattern: ```json\n[\n\n![](url)\n```
    Should become: ![](url)
    """
    # Pattern 1: Code block containing only images (may have multiple images)
    # Matches code blocks that contain only images and whitespace
    def replace_image_codeblock(match):
        block_content = match.group(1)
        # Extract all images from the block
        images = re.findall(r'!\[[^\]]*\]\([^\)]+\)', block_content)
        if images:
            # Return images without code block wrapper, with spacing preserved
            return '\n'.join(images) + '\n'
        return match.group(0)  # Return original if no images found

    # Match code blocks that primarily contain images
    pattern = r'```(?:json|yaml|bash)?\s*\n((?:[\[\s]*\n*(?:!\[[^\]]*\]\([^\)]+\))\s*\n*)+)```'
    content = re.sub(pattern, replace_image_codeblock, content, flags=re.MULTILINE)

    # Pattern 2: Standalone [ before image (leftover from incomplete conversions)
    # Matches: [\n\n![](url)  or  [\n![](url)
    pattern2 = r'\[\s*\n+(!\[[^\]]*\]\([^\)]+\))'
    content = re.sub(pattern2, r'\1', content, flags=re.MULTILINE)

    # Pattern 4: More complex - multiline code blocks with images
    # Split by lines and process
    lines = content.split('\n')
    fixed_lines = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Check if this is start of a code block with bracket
        if line.strip() in ['```json', '```yaml', '```bash', '```']:
            # Check next few lines
            if i + 1 < len(lines) and lines[i + 1].strip() == '[':
                # Look for image in next 2-3 lines
                found_image = False
                image_idx = -1
                for j in range(i + 2, min(i + 5, len(lines))):
                    if lines[j].strip().startswith('![]('):
                        found_image = True
                        image_idx = j
                        break

                if found_image:
                    # Look for closing ```
                    for k in range(image_idx + 1, min(image_idx + 4, len(lines))):
                        if lines[k].strip() == '```':
                            # Found the pattern! Skip all and just add the image
                            fixed_lines.append(lines[image_idx])
                            i = k + 1
                            found_image = True
                            break

                    if found_image and i > image_idx:
                        continue

        fixed_lines.append(line)
        i += 1

    return '\n'.join(fixed_lines)

def remove_standalone_brackets(content):
    """Remove standalone [ characters that appear before images"""
    lines = content.split('\n')
    fixed_lines = []

    for i, line in enumerate(lines):
        # Skip lines that are just [ followed by an image
        if line.strip() == '[':
            # Check if next non-empty line is an image
            for j in range(i + 1, min(i + 4, len(lines))):
                if lines[j].strip():
                    if lines[j].strip().startswith('![]('):
                        # Skip this [ line
                        continue
                    break

        fixed_lines.append(line)

    return '\n'.join(fixed_lines)

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

    # Fix image code blocks
    body = fix_image_codeblocks(body)
    body = remove_standalone_brackets(body)

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

    print("Fixing image code block display issues...")
    print("=" * 60)

    # Focus on files we know have issues
    problem_files = [
        'skenais-role-in-devsecops-cicd-pipeline.md',
        'devsecops-pune-meetup-1.md',
        'devsecops-pune-meetup-2.md',
        'devsecops-pune-meetup-3.md',
        'devsecops-pune-meetup-4.md',
        '27.md',
        'new-relic.md'
    ]

    # Process all markdown files
    for md_file in sorted(blogs_dir.glob('*.md')):
        total_files += 1
        if process_blog(md_file):
            modified_files += 1
            print(f"✓ Fixed: {md_file.name}")
        else:
            if md_file.name in problem_files:
                print(f"  Checked: {md_file.name} (no changes detected)")

    print("=" * 60)
    print(f"\nProcessed {total_files} files")
    print(f"Modified {modified_files} files")
    print("\nFixes applied:")
    print("  ✓ Removed code block wrappers around images")
    print("  ✓ Removed standalone [ characters before images")
    print("  ✓ Images now render properly instead of showing URLs")

if __name__ == '__main__':
    main()
