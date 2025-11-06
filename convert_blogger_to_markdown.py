#!/usr/bin/env python3
"""
Blogger HTML to Markdown Converter
Converts Blogger HTML files to clean markdown format with frontmatter.
"""

import os
import re
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from bs4 import BeautifulSoup, Tag
from markdownify import markdownify as md
import dateparser

class BloggerToMarkdownConverter:
    def __init__(self, input_dir: str, output_dir: str):
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.conversion_results = {
            'success': [],
            'failed': [],
            'total': 0
        }
        self.blog_metadata = []

    def extract_slug_from_filename(self, filename: str) -> str:
        """
        Extract the post slug from the Blogger filename.
        Format: https:_roshannagekar.blogspot.com_YYYY_MM_post-slug.html.html
        """
        # Remove the .html.html extension
        name = filename.replace('.html.html', '')
        # Split by underscores and get the last part (post-slug)
        parts = name.split('_')
        # The slug is the last part after the date parts
        if len(parts) >= 4:
            # Format: https:_domain_YYYY_MM_slug
            slug = parts[-1]  # Last part is the slug
            return slug
        return name

    def clean_html_content(self, html_content: str) -> BeautifulSoup:
        """Parse HTML and return BeautifulSoup object."""
        return BeautifulSoup(html_content, 'html.parser')

    def extract_title(self, soup: BeautifulSoup) -> Optional[str]:
        """
        Extract blog post title from HTML.
        Tries multiple locations:
        1. h3.post-title.entry-title
        2. <title> tag (cleaned)
        """
        # Try h3 with post-title class
        post_title = soup.find('h3', class_='post-title entry-title')
        if post_title:
            return post_title.get_text(strip=True)

        # Try <title> tag and clean it
        title_tag = soup.find('title')
        if title_tag:
            title = title_tag.get_text(strip=True)
            # Remove blog name suffix (e.g., " | Techsperiments")
            title = re.split(r'\s*[\|\-]\s*Techsperiments', title)[0]
            return title.strip()

        return None

    def extract_date(self, soup: BeautifulSoup) -> Optional[str]:
        """
        Extract publish date from HTML.
        Tries multiple locations and formats.
        """
        # Try abbr.published with itemprop="datePublished"
        date_abbr = soup.find('abbr', class_='published', itemprop='datePublished')
        if date_abbr and date_abbr.get('title'):
            date_str = date_abbr['title']
            parsed_date = dateparser.parse(date_str)
            if parsed_date:
                return parsed_date.strftime('%Y-%m-%d')

        # Try h2.date-header
        date_header = soup.find('h2', class_='date-header')
        if date_header:
            date_text = date_header.get_text(strip=True)
            parsed_date = dateparser.parse(date_text)
            if parsed_date:
                return parsed_date.strftime('%Y-%m-%d')

        # Try time tag
        time_tag = soup.find('time')
        if time_tag:
            if time_tag.get('datetime'):
                parsed_date = dateparser.parse(time_tag['datetime'])
                if parsed_date:
                    return parsed_date.strftime('%Y-%m-%d')

        return None

    def extract_tags(self, soup: BeautifulSoup) -> List[str]:
        """
        Extract tags/labels from the post.
        Looks for links with rel='tag' attribute.
        """
        tags = []
        labels_section = soup.find('span', class_='post-labels')
        if labels_section:
            tag_links = labels_section.find_all('a', rel='tag')
            for link in tag_links:
                tag_text = link.get_text(strip=True)
                if tag_text and tag_text not in tags:
                    tags.append(tag_text)
        return tags

    def extract_author(self, soup: BeautifulSoup) -> str:
        """
        Extract author name from the post.
        Defaults to 'Roshan Nagekar' if not found.
        """
        author_span = soup.find('span', class_='fn')
        if author_span:
            author_link = author_span.find('a')
            if author_link:
                return author_link.get_text(strip=True)
        return "Roshan Nagekar"

    def extract_content(self, soup: BeautifulSoup) -> Optional[str]:
        """
        Extract the main blog post content.
        Looks for div.post-body.entry-content or similar.
        """
        # Try to find the post body
        post_body = soup.find('div', class_='post-body entry-content')
        if not post_body:
            post_body = soup.find('div', class_='post-body')
        if not post_body:
            post_body = soup.find('div', itemprop='articleBody')

        if not post_body:
            return None

        # Clean up the content before conversion
        self._clean_content(post_body)

        # Convert to markdown
        markdown_content = md(str(post_body),
                            heading_style='ATX',
                            bullets='-',
                            strong_em_symbol='*',
                            code_language='',
                            escape_asterisks=False,
                            escape_underscores=False)

        # Post-process markdown
        markdown_content = self._post_process_markdown(markdown_content)

        return markdown_content

    def _clean_content(self, content_div: Tag):
        """
        Remove unwanted elements from the content div before markdown conversion.
        """
        # Remove script tags
        for script in content_div.find_all('script'):
            script.decompose()

        # Remove style tags
        for style in content_div.find_all('style'):
            style.decompose()

        # Remove inline styles but keep the elements
        for tag in content_div.find_all(True):
            if tag.get('style'):
                del tag['style']
            # Remove various blogger-specific attributes
            for attr in ['trbidi', 'imageanchor', 'dir']:
                if tag.get(attr):
                    del tag[attr]

        # Clean up separator divs (often used for images in blogger)
        for div in content_div.find_all('div', class_='separator'):
            # Keep the content but remove the wrapper
            div.unwrap()

        # Remove outer wrapping div if it has dir="ltr" attribute
        outer_div = content_div.find('div', attrs={'dir': True})
        if outer_div:
            outer_div.unwrap()

    def _post_process_markdown(self, markdown: str) -> str:
        """
        Post-process the markdown to clean it up.
        """
        # Remove excessive blank lines (more than 2 consecutive)
        markdown = re.sub(r'\n{3,}', '\n\n', markdown)

        # Clean up whitespace around images
        markdown = re.sub(r'\n*!\[', '\n\n![', markdown)

        # Fix code blocks if needed
        markdown = re.sub(r'```\n\n', '```\n', markdown)

        # Remove stray opening brackets at the beginning
        markdown = re.sub(r'^\[\n\n', '', markdown)

        # Remove leading/trailing whitespace
        markdown = markdown.strip()

        return markdown

    def infer_category(self, tags: List[str], content: str, title: str) -> str:
        """
        Infer category from tags, content, and title.
        """
        text = f"{' '.join(tags)} {content} {title}".lower()

        # Define category keywords
        categories = {
            'DevOps': ['devops', 'ansible', 'puppet', 'chef', 'jenkins', 'ci/cd', 'docker', 'kubernetes', 'terraform'],
            'Cloud Computing': ['cloud', 'aws', 'azure', 'gcp', 'openstack', 'iaas', 'paas', 'saas'],
            'Linux': ['linux', 'rhce', 'centos', 'ubuntu', 'redhat', 'shell', 'bash'],
            'Programming': ['python', 'ruby', 'java', 'javascript', 'code', 'algorithm', 'acm'],
            'Version Control': ['git', 'github', 'svn', 'version control'],
            'Security': ['security', 'devsecops', 'encryption', 'ssl', 'tls'],
            'Networking': ['network', 'tcp', 'ip', 'dns', 'routing'],
            'Database': ['database', 'sql', 'mysql', 'postgresql', 'mongodb'],
        }

        # Check for category matches
        for category, keywords in categories.items():
            if any(keyword in text for keyword in keywords):
                return category

        # Default category
        return "Technology"

    def create_excerpt(self, content: str, max_length: int = 150) -> str:
        """
        Create an excerpt from the content.
        """
        # Split content into lines to process line by line
        lines = content.split('\n')
        text_lines = []

        for line in lines:
            # Skip lines that are purely images/links (no substantial text)
            if re.match(r'^\s*[\[\]!]*\(https?://.*\)[\[\]]*\s*$', line):
                continue
            # Skip lines with only special characters and whitespace
            if re.match(r'^\s*[\[\]!()]*\s*$', line):
                continue

            # Clean the line
            cleaned = line
            # Remove linked images
            cleaned = re.sub(r'\[!\[.*?\]\(.*?\)\]\(.*?\)', '', cleaned)
            # Remove standalone images
            cleaned = re.sub(r'!\[.*?\]\(.*?\)', '', cleaned)
            # Remove links but keep text
            cleaned = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', cleaned)
            # Remove markdown syntax
            cleaned = re.sub(r'[#*`]', '', cleaned)
            # Clean whitespace
            cleaned = re.sub(r'\s+', ' ', cleaned).strip()

            if cleaned and len(cleaned) > 10:
                text_lines.append(cleaned)

        # Join the text lines
        excerpt = ' '.join(text_lines)

        # If excerpt is empty or very short, return a default message
        if len(excerpt) < 20:
            return "Blog post content"

        # Truncate to max_length
        if len(excerpt) > max_length:
            excerpt = excerpt[:max_length].rsplit(' ', 1)[0] + '...'
        return excerpt

    def create_frontmatter(self, title: str, date: str, category: str,
                          tags: List[str], excerpt: str, author: str) -> str:
        """
        Create YAML frontmatter for the markdown file.
        """
        # Escape quotes in strings
        title = title.replace('"', '\\"')
        excerpt = excerpt.replace('"', '\\"')

        frontmatter = f'''---
title: "{title}"
date: "{date}"
category: "{category}"
tags: {json.dumps(tags)}
excerpt: "{excerpt}"
author: "{author}"
---

'''
        return frontmatter

    def convert_file(self, html_file: Path) -> Tuple[bool, str]:
        """
        Convert a single HTML file to markdown.
        Returns (success, message)
        """
        try:
            # Read HTML file
            with open(html_file, 'r', encoding='utf-8') as f:
                html_content = f.read()

            # Parse HTML
            soup = self.clean_html_content(html_content)

            # Extract metadata
            title = self.extract_title(soup)
            if not title:
                return False, f"Could not extract title from {html_file.name}"

            date = self.extract_date(soup)
            if not date:
                return False, f"Could not extract date from {html_file.name}"

            tags = self.extract_tags(soup)
            author = self.extract_author(soup)

            # Extract content
            content = self.extract_content(soup)
            if not content:
                return False, f"Could not extract content from {html_file.name}"

            # Infer category
            category = self.infer_category(tags, content, title)

            # Create excerpt
            excerpt = self.create_excerpt(content)

            # Create frontmatter
            frontmatter = self.create_frontmatter(title, date, category, tags, excerpt, author)

            # Combine frontmatter and content
            full_markdown = frontmatter + content

            # Generate output filename
            slug = self.extract_slug_from_filename(html_file.name)
            output_file = self.output_dir / f"{slug}.md"

            # Write markdown file
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(full_markdown)

            # Store metadata for blogs.json
            self.blog_metadata.append({
                'title': title,
                'slug': slug,
                'date': date,
                'category': category,
                'tags': tags,
                'excerpt': excerpt,
                'author': author,
                'filename': f"{slug}.md"
            })

            return True, f"Successfully converted {html_file.name} -> {output_file.name}"

        except Exception as e:
            return False, f"Error converting {html_file.name}: {str(e)}"

    def convert_all(self):
        """
        Convert all HTML files in the input directory.
        """
        html_files = sorted(self.input_dir.glob('*.html'))
        self.conversion_results['total'] = len(html_files)

        print(f"Found {len(html_files)} HTML files to convert...\n")

        for html_file in html_files:
            success, message = self.convert_file(html_file)

            if success:
                self.conversion_results['success'].append(message)
                print(f"✓ {message}")
            else:
                self.conversion_results['failed'].append(message)
                print(f"✗ {message}")

        # Sort blog metadata by date (newest first)
        self.blog_metadata.sort(key=lambda x: x['date'], reverse=True)

        # Create blogs.json
        self.create_blogs_json()

        # Print summary
        self.print_summary()

    def create_blogs_json(self):
        """
        Create a JSON file with metadata for all posts.
        """
        json_file = self.output_dir / 'blogs.json'

        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(self.blog_metadata, f, indent=2, ensure_ascii=False)

        print(f"\n✓ Created {json_file}")

    def print_summary(self):
        """
        Print conversion summary.
        """
        print("\n" + "="*70)
        print("CONVERSION SUMMARY")
        print("="*70)
        print(f"Total files processed: {self.conversion_results['total']}")
        print(f"Successfully converted: {len(self.conversion_results['success'])}")
        print(f"Failed conversions: {len(self.conversion_results['failed'])}")

        if self.conversion_results['failed']:
            print("\nFailed files:")
            for fail_msg in self.conversion_results['failed']:
                print(f"  - {fail_msg}")

        print("\n" + "="*70)
        print(f"Markdown files saved to: {self.output_dir.absolute()}")
        print(f"Metadata file: {(self.output_dir / 'blogs.json').absolute()}")
        print("="*70)


def main():
    """Main entry point."""
    # Configuration
    INPUT_DIR = '/home/user/iamrawtion.github.io/blog_posts_only'
    OUTPUT_DIR = '/home/user/iamrawtion.github.io/blogs'

    # Create converter and run
    converter = BloggerToMarkdownConverter(INPUT_DIR, OUTPUT_DIR)
    converter.convert_all()


if __name__ == '__main__':
    main()
