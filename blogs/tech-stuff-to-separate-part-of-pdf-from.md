---
title: "TECHNICAL STUFF"
date: "2013-01-02"
category: "Linux"
tags: []
excerpt: "Some rights reserved by Arthur Caranta 1. to separate a part of pdf from the original pdf use the following command, u may need to install pdftk..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZv1LxK9nXT1ncbbWzmSnHJDC24-009e9h2qfBk0mmRjGxVVWN1FfeOoS__ZoVM7KdkYZhZ3XfqcAT6WzDMqe9h4UahF81YOZXQaIi9f6e7hHac8gqvr_6lpsEclhyfuXPgLtQzbocqSU/s1600/4048968087_4412c5f7cf_m.jpg)

****Some rights reserved by [Arthur Caranta](https://www.flickr.com/photos/arthur-caranta/)****

  
**TECH STUFF**  

1. **to separate a part of pdf from the original pdf use the following command, u may need to install pdftk “pdftk old.pdf cat 1-9 26-end output new.pdf”**
2. **get all the packages installed in the PC**

**aptitude search '!~M ~i' | awk -F " " '{ print "apt-get -y install " $2 }' > aptshell.sh**  

**- to load dropbox**
**~/.dropbox-dist/dropboxd**  

**- ps command**
**Type the following ps command to display all running process:  
# ps aux | less  
Where,  
  -A: select all processes  
    a: select all processes on a terminal, including those of other users  
    x: select processes without controlling ttys  
Task: see every process on the system  
# ps -A  
# ps -e  
Task: See every process except those running as root  
# ps -U root -u root -N  
Task: See process run by user vivek  
# ps -u vivek**  

**- Task: top command**
**The top program provides a dynamic real-time view of a running system. Type the top at command prompt:  
# top**  

**- Task: display a tree of processes
- pstree shows running processes as a tree. The tree is rooted at either pid or init if pid is omitted. If a user name is specified, all process trees rooted at processes owned by that user are shown.**
**$ pstree**  

**- --max-depth=, which instructs du to list its subdirectories and their sizes to any desired level of depth (i.e., to any level of subdirectories) in a directory tree. For example, the following would cause du to list only the first tier (i.e., layer) of directories in the current directory and their sizes (inclusive of all of their contents, including those of their subdirectories):**
**du --max-depth=1  
  
The total space consumption for the current directory tree will also be reported, and it will, of course, be the same regardless of the depth of the files listed.  
  
Setting --max-depth= to zero tells du to not list any of the subdirectories within the selected directory, i.e., to list only report the size of the selected directory itself. The result is the same as using the -s option.**  

**- wget**
**to download anu file online  
wget <url>  
wget <url> -t 'n'  
-t will make n number of trials... useful at the times of broken downloads.  
  

10. HOWTO: ISO creation from terminal

Hi,  
I was looking for this (for a BASH script I wanted to write), and I found out how to do it. Now I want to share it  
1. Create ISO-file from folder  
Code:  
  
mkisofs -r -o /isofile.iso /folder  
  
where /isofile.iso is the relative or absolute path to the iso-file you want to create and /folder the absolute or relative path to the folder you want to backup.  
  
2. Create ISO-file from file(s)  
Code:  
  
mkisofs -r -o /isofile.iso /mybigfile  
  
or if you want to backup multipi files (like you .mp3 collection):  
Code:  
  
mkisofs -r -o /isofile.iso *.mp3  
  
3. Create ISO-file from a cd/dvd-drive  
Code:  
  
dd if=/dev/cdrom0 of=isofile.iso  
where /dev/cdrom0 is your cd/dvd-drive and isofile.iso your iso-file you want to create.  
  
Note: An absolute path is like '/home/yn/myfile.iso', a relative path is like 'myfile.iso'  
__________________  

11. âž™ Synchronize all your files across Windows, Linux and Mac OS with Dropbox (2GB free storage!). By signing up via this link I'll get some extra space also, thanks!
12. command for generation of preprocessed code which will have the included files in the code as well as the code that we have written

gcc -E test.c > test.pp  
  
object code post compilation that we always do.  
gcc test.c test2.c -o test.o  
  
  
the assembly dump of the code generated.  
objdump -d test.o**  
**test.c ->** #include <stdio.h>
#include <stdlib.h>
double add(int,int);
int main()
{
printf("%f\n", add(1,2));
return 0;
}  
  

test2.c -> #include <stdio.h>

double add(int a, int b)

{

printf("%f\n", (double)(a + b));

return a + b;

}  
  
13.  
 How to get all log history for the so called branches in subversion  
(they are nothing more than directories)  
  
 mkdir ORACLEPOC; cd ORACLEPOC; svn2git  
svn://[110.0.0.10/idbl//UI/ORACLEPOC](http://110.0.0.10/idbl//UI/ORACLEPOC) --rootistrunk --verbose; cd ..  
  
  
14.  
 Count total number of commits in all UI branches:  
  
grepping on "Date:"  
total=0;for i in *;  do cd $i; echo In $i; total=`expr $total + $(git  
log | grep "Date:" | wc -l)`; cd ..; done; echo $total  
  
  
15.   
Merge two branches  (that are in different repositories) into one.  
  
git remote add MSSQL_2.3  /home/git/MSSQL_2.3  
git pull MSSQL_2.3 master:b  
git merge b  
git branch -d  
  
16.  

|  |
| --- |
| **Linux / Unix Command: ***chage***** |
|  |
| [Command Library](http://linux.about.com/library/cmd/blcmdl.htm) |

## NAME

chage - change user password expiry information 

## SYNOPSIS

**chage**
:   [**-m***mindays*] [**-M***maxdays*] [**-d***lastday*] [**-I***inactive*]   
    [**-E***expiredate*] [**-W***warndays*] *user*