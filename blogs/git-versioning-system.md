---
title: "Git versioning system, How to use Git?"
date: "2013-01-26"
category: "Programming"
tags: []
excerpt: "Some rights reserved by Sean MacEntee Its been months i used Git. I thought i should write about it. Probably because i shouldn't forget what is it..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCGifQ0ZG4GZhp6gESHqPriPv_Nbr-4diTj0t-vLerLzfjGLJGoZyKU3DObokGDkjN-dS9bfCEkp9Ig54cI3D7XQ6aO1uhDNYDQPaA6jqsSWmTF8NnLJWI-dhtCdUlwHZT4lzwLeS8nls/s1600/10797247294_9d40601d06_m.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCGifQ0ZG4GZhp6gESHqPriPv_Nbr-4diTj0t-vLerLzfjGLJGoZyKU3DObokGDkjN-dS9bfCEkp9Ig54cI3D7XQ6aO1uhDNYDQPaA6jqsSWmTF8NnLJWI-dhtCdUlwHZT4lzwLeS8nls/s1600/10797247294_9d40601d06_m.jpg)

Some rights reserved by [Sean MacEntee](https://www.flickr.com/photos/smemon/)

  
  
Git  
  
Its been months i used Git. I thought i should write about it. Probably because i shouldn't forget what is it all about... :P.  
Git is a software version control and source code management(SCM) system developed by Linus Torvalds. What is version controlling? Every software has versions in it. How could you possibly keep all the versions in the same system and develop, modify, test and use all of them together is done by version controlling. And Git helps in achieving this (I could be wrong...this is just my understanding of Git...) So how does it work. Git works on a tree based structure where the developers can branch their codes in and make versions or builds accordingly.   
  
For instance consider a repository which has a master node. The master node will contain all the actual code of a particular software. The participants or developers here are not all reliable so the project manager explain them the requirements and asks them to do whichever module they want as per their choice and add a branch to the main tree. Say there are 3 developers Tom, Dik and Harry. All of them plan to do the same module. The Project Manager(PM) evaluated the code after all three of them were done with the module. They all are supposed to push their code to their respective branch. Unless and until the PM evaluates the code they cant commit the code to their respective branches. Till then a push is fine. While committing you need to add certain details as to why are you committing or whats the change in it, etc. The commit can be done only after review has been done. Tom, Dik and Harry here will have their own versions of software that's downloaded locally by each one of them. If their are any changes in the master branch you can >git pull and get only those changes that don't match with your current local repository and check the changes accordingly. The changes if any to any of the file are informed file by file and line by line. So the developers are automatically updated of where the code was changed. > git add . will add all the local changes to the git repository. you are allowed to add only specific files.  
After committing an add with a > git commit you have to add a flag -m and specify what changes you did etc. Changes can be uploaded to the server with a > git push. Accordingly Tom , Dik and Harry can do a > git pull and repeat the procedure. Check for other functionality on Git's website. There are many more cool features as well.