---
title: "Git versioning system, How to use Git?"
date: "2013-01-26"
category: "Programming"
tags: []
excerpt: "Some rights reserved by Sean MacEntee Its been months i used Git. I thought i should write about it. Probably because i shouldn't forget what is it..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCGifQ0ZG4GZhp6gESHqPriPv_Nbr-4diTj0t-vLerLzfjGLJGoZyKU3DObokGDkjN-dS9bfCEkp9Ig54cI3D7XQ6aO1uhDNYDQPaA6jqsSWmTF8NnLJWI-dhtCdUlwHZT4lzwLeS8nls/s1600/10797247294_9d40601d06_m.jpg)

Some rights reserved by [Sean MacEntee](https://www.flickr.com/photos/smemon/)

## Git

Its been months i used Git. I thought i should write about it. Probably because i shouldn't forget what is it all about... :P.

Git is a software version control and source code management(SCM) system developed by Linus Torvalds.

What is version controlling? Every software has versions in it.
How could you possibly keep all the versions in the same system and develop, modify, test and use all of them together is done by version controlling.

And **Git helps in achieving this (I could be wrong...this is just my understanding of **Git...) So how does it work.

Git works on a tree based structure where the developers can branch their codes in and make versions or builds accordingly.

For instance consider a repository which has a master node.
The master node will contain all the actual code of a particular software.
The participants or developers here are not all reliable so the project manager explain them the requirements and asks them to do whichever module they want as per their choice and add a branch to the main tree.

Say there are 3 developers Tom, Dik and Harry.
All of them plan to do the same module.
The Project Manager(PM) evaluated the code after all three of them were done with the module.
They all are supposed to push their code to their respective branch.
Unless and until the PM evaluates the code they cant commit the code to their respective branches.
Till then a push is fine.
While committing you need to add certain details as to why are you committing or whats the change in it, etc.

The commit can be done only after review has been done.
Tom, Dik and Harry here will have their own versions of software that's downloaded locally by each one of them.

If their are any changes in the master branch you can >git pull and get only those changes that don't match with your current local repository and check the changes accordingly.

The changes if any to any of the file are informed file by file and line by line.
So the developers are automatically updated of where the code was changed.
> git add.
Will add all the local changes to the git repository.
You are allowed to add only specific files.
After committing an add with a > **git commit you have to add a flag -m and specify what changes you did etc. Changes can be uploaded to the server with a > **git push. Accordingly Tom , Dik and Harry can do a > **git pull and repeat the procedure. Check for other functionality on **Git's website. There are many more cool features as well.

## Git Workflows for Teams

Using Git alone on a personal project is simple — you commit to main and push. Working with a team introduces the need for agreed-upon workflows, and the right choice depends heavily on the context.

**Feature Branch Workflow** is the most common starting point. Every piece of work happens on its own branch, branched off from main (or master). When the work is done, a pull request is opened, reviewed, and merged. This works well for small-to-medium teams and keeps main always in a releasable state. Most startups start here and stay here.

**Gitflow** adds more structure: there are dedicated branches for develop, release, hotfix, and feature. It was designed for software that ships versioned releases on a schedule rather than continuously. It is popular in enterprises and open source libraries that maintain multiple supported versions simultaneously. For a team doing continuous deployment, Gitflow adds overhead without much benefit.

**Trunk-based development** is the model preferred by high-velocity teams at companies like Google and Netflix. Everyone commits directly to main (trunk) frequently — sometimes multiple times a day. Feature flags gate incomplete work from users. Long-lived branches are avoided entirely. It requires strong CI/CD and good test coverage to work safely, but it eliminates the painful merge conflicts that accumulate on long-lived branches.

The short version: feature branch for most teams, Gitflow for versioned releases, trunk-based for mature teams with strong automation.

## Git Commands Worth Knowing Beyond the Basics

Most developers learn `git add`, `git commit`, `git push`, and `git pull` and stop there. A handful of less-known commands will save you significant time.

**`git bisect`** performs a binary search through commit history to find the exact commit that introduced a bug. You mark a known-good commit and a known-bad commit, and Git checks out commits in between for you to test. When you identify whether each commit is good or bad, Git narrows down the culprit. This turns a potentially hours-long debugging session into a few minutes of systematic searching.

**`git stash`** temporarily shelves uncommitted changes so you can switch context — answer an urgent bug on another branch, for example — and then restore your work-in-progress with `git stash pop`. Use `git stash list` to see everything you have stashed.

**`git cherry-pick`** applies a specific commit from one branch onto another. If a hotfix was committed to a feature branch accidentally, or you need to backport a single bug fix to an older release branch, cherry-pick is the right tool. Use it selectively — overusing it creates duplicate commits that complicate history.

**`git reflog`** is the safety net that most people do not know exists. Git keeps a log of every position HEAD has pointed to, even after resets, rebases, and branch deletions. If you accidentally delete a branch or lose commits after a hard reset, `git reflog` shows you the commit hashes you can use to recover them.

## Git Hygiene That Actually Matters

Beyond knowing the commands, good Git habits make collaboration significantly smoother.

**Write meaningful commit messages.** A commit message should explain *why* a change was made, not just *what* changed — the diff already shows what. "Fix login timeout bug caused by session cookie expiry mismatch" is useful; "Fix bug" is not. Many teams follow the Conventional Commits format (`feat:`, `fix:`, `chore:`) to make history scannable and enable automated changelog generation.

**Make atomic commits.** Each commit should represent one logical change. Mixing a refactor, a bug fix, and a new feature in a single commit makes it impossible to revert or cherry-pick individual changes later.

**Never commit secrets.** A password or API key that enters a Git repository — even briefly — should be considered compromised. Use `.gitignore` to exclude `.env` files and credential files before the temptation to commit them arises. Tools like [git-secrets](https://github.com/awslabs/git-secrets) or pre-commit hooks can automatically scan staged files for credential patterns before a commit is allowed through.

**Sign commits with GPG.** Commit authorship in Git is self-reported and trivially spoofed. GPG signing creates cryptographic proof that a commit came from a specific key. GitHub and GitLab display a "Verified" badge on signed commits. For teams handling sensitive codebases or regulated environments, signing is worth the setup effort.

For a comprehensive reference on all of the above and much more, the [Pro Git book](https://git-scm.com/book/en/v2) is available free online and covers Git from basics to internals.
