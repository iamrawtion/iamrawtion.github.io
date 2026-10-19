---
title: "Linux and Git Field Notes"
date: "2012-11-23"
category: "Linux"
tags: ["Linux", "Git", "SVN", "Bash", "DevOps"]
excerpt: "A collection of Linux and Git commands from my notes. Covers pdftk, ps, du, wget, ISO creation, GCC, svn2git, git tagging, branch merging, and more."
author: "Roshan Nagekar"
---

*A collection of Linux and Git commands from my notes. Rough around the edges — preserved as written.*

---

## PDF, Packages, Dropbox, and Process Management

**Split pages from a PDF** (requires `pdftk`):

```bash
pdftk old.pdf cat 1-9 26-end output new.pdf
```

**Export list of manually installed packages:**

```bash
aptitude search '!~M ~i' | awk -F " " '{ print "apt-get -y install " $2 }' > aptshell.sh
```

**Start Dropbox daemon:**

```bash
~/.dropbox-dist/dropboxd
```

**Useful `ps` commands:**

```bash
ps aux                  # all running processes
ps -A                   # every process on the system
ps -U root -u root -N   # every process except root
ps -u vivek             # processes for a specific user
top                     # dynamic real-time view
pstree                  # tree view of processes
```

**Check disk usage by depth:**

```bash
du --max-depth=1   # first tier only
du --max-depth=0   # same as -s, just the total
```

**Download files with wget:**

```bash
wget <url>
wget <url> -t 5    # retry up to 5 times (useful for broken downloads)
```

---

## Create ISO Files from the Terminal

**From a folder:**

```bash
mkisofs -r -o /isofile.iso /folder
```

**From specific files:**

```bash
mkisofs -r -o /isofile.iso /mybigfile
mkisofs -r -o /isofile.iso *.mp3
```

**From a CD/DVD drive:**

```bash
dd if=/dev/cdrom0 of=isofile.iso
```

---

## GCC: Preprocessed Output, Object Code, and Assembly

**Generate preprocessed code (with all `#include` files expanded):**

```bash
gcc -E test.c > test.pp
```

**Compile to object code:**

```bash
gcc test.c test2.c -o test.o
```

**Dump the assembly:**

```bash
objdump -d test.o
```

---

## SVN and Git: Branch History, Commit Counts, Merging

**Get full log history for an SVN branch using svn2git:**

```bash
mkdir ORACLEPOC
cd ORACLEPOC
svn2git svn://<your-svn-server>/<repo>/UI/ORACLEPOC --rootistrunk --verbose
cd ..
```

**Count total commits across all branches:**

```bash
total=0
for i in *; do
  cd $i
  echo "In $i"
  total=`expr $total + $(git log | grep "Date:" | wc -l)`
  cd ..
done
echo $total
```

**Merge two branches from different repositories:**

```bash
git remote add MSSQL_2.3 /home/git/MSSQL_2.3
git pull MSSQL_2.3 master:b
git merge b
git branch -d b
```

**Untrack a directory without deleting it:**

```bash
git rm -r --cached <your-directory>
```

---

## Git Tips

**Undo a commit and redo it:**

```bash
git reset --soft HEAD^   # undo commit, keep changes staged
# make your edits
git add .
git commit -c ORIG_HEAD  # reuse the old commit message
```

**List all commits for a specific file:**

```bash
git log -- <path/to/file>
git log --stat <path>    # shows impact of each commit
```

**Tagging and using commit numbers as build numbers:**

```bash
git tag -a v2.5 -m 'Version 2.5'
git describe --tags --long
# output: v2.5-0-deadbeef
#          ^    ^ ^
#          |    | SHA of HEAD
#          |    number of commits since last tag
#          last tag
```

**Remove untracked empty directories:**

```bash
git clean -fdn   # dry run first — shows what will be deleted
git clean -fd    # actually delete
```

**Create a dummy/empty commit:**

```bash
git commit --allow-empty -m 'Dummy commit to create the first tag'
```

**Rename a tag (prepend a prefix):**

```bash
# usage: git tag <new_tag> <old_tag> -f -m <message>
# -f forces the rename
git tag "MSSQL_2.30.0" "2.30.0" -f -m "Prepending DB type to existing tag name"
```

**See files changed per commit (SVN `-v` equivalent):**

```bash
git log --name-status
git log --name-only
git log --stat
```

---

## Miscellaneous

**Show timestamps in bash history:**

```bash
export HISTTIMEFORMAT="%F %T "
```

**Fix missing dependencies in CentOS:**

```bash
sudo yum --disableexcludes=main install kernel-headers
```

**Remove an invalid git remote:**

```bash
git remote set-url origin git://github.com/<user>/<repo>.git
```
