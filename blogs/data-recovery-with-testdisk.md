---
title: "Data Recovery with TestDisk"
date: "2014-02-07"
category: "Linux"
tags: ["Data Recovery", "Storage"]
excerpt: "some rights reserved by epSos .de You buy a portable hard disk drive to keep a back up of all your important data, Or you are carrying an extremely..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9gFrC33gyk6Ertbup3MmNjilWZsKmRgBBQpRQUKWVGQge3wlfaXBgYL0-hafHi9O9SJOevKNEMyjOVpkXnlQX8MgqN7KKTi7LOnfFDRDKlMPcQFLDHcaXL2t7ZXPhdA51MHsi-6Vqkgg/s1600/8336691931_32bc2f3e2e_m.jpg)

some rights reserved by [epSos .de](https://www.flickr.com/photos/epsos/)

 You buy a portable hard disk drive to keep a back up of all your
important data, Or you are carrying an extremely important doc in a USB
drive, or you have some data on your internal hard disk drive. You try
to get the data and ... boom!!! No Data!!! You have absolutely no clue
how to get back the important data you had in the drives. Finally you
just consider it lost and curse your fate and carry on.

This
happened to me too. 1 TeraBytes of important data in my external Hard
disk drive got corrupt in a second and was lost. I tried all OS's i
could right from MAC to Windows to Linux but no luck. I was about to
give up when i came across Data Recovery softwares on Internet.

Data
Recovery softwares are those softwares that help you read
corrupt/lost/deleted data from your drives. There were so many softwares
out there. I started trying out my luck on all the softwares i could
with a windows machine(i should not have done that, but i have no
option!!). Unfortunately most of them just gives a list of deleted items
on the disk that i never needed. One or two of them did get me the data
however since they were trial versions, i could only view the data and
not copy them. Anyways it just gave me the hope that the data was still
there in the disk.

Finally i searched for Open Source alternatives and there i got my answer. TestDisk!!!

**What is TestDisk?**

As
per their website wiki: TestDisk is a free data recovery software
designed to help recover lost partitions and/or make non-booting disks
bootable again when these symptoms are caused by faulty software,
certain types of viruses, or human error. It can also be used to repair
some filesystem errors.

## Installation

---

## You don't need to

install it. Its a very small 1.5 MB software, where you just need to
run the executable, it was really easy to use command line based
software with most of the information self explanatory.

## Steps to Use

1. Logs

   Creation : Like every other Linux based software, this one as well
   makes a log of every session carried out. when you execute the
   TestDisk.exe You are 1st asked for if, you would like to CREATE a new
   log, APPEND  the existing log, or want NO LOG.

2. Media/Disk

   Detection :Next you need to select the disk you want to recover the lost
   data from. It shows a list of all volumes connected to you computer and
   you can select using keyboard arrow keys.

3. Disk/Partition Table

   Type Selection : The next screen prompts you to select the partition
   table type. In most of the cases it detects all by itself the type.
   Otherwise it keeps it to none for you to select. Mine was a windows
   machine that i was running this program on and i used this with quiet a
   many volumes and every time it detected Intel. I am assuming windows
   users could probably select Intel in case they are unsure of this option.
   But selection "None"is not recommended as its very rare that a drive is
   non partitioned.

4. Next Screen Gives the following Options :

Analyse Analyse current partition structure and search for lost partitions to restore them
Advanced Filesystem Utils

```yaml
FAT: Boot and FAT repair

NTFS: Boot and MFT repair
```

ext2/ext3: Find Backup SuperBlock
FAT file undelete
NTFS file undelete
ext2 file undelete
Image Creation

Geometry Change disk geometry

Options Modify options

MBR Code Write TestDisk MBR code to first sector

Delete Delete all data in the partition table

Analyzing of disk is done to look for lost partitions. This takes long time based on the size of the disk. Most
of the times for windows if you get an error "The type of the file
system is RAW." or "The disk in drive D is not formatted. Do you want to
format it now?" then that means the Boot sector is damaged. You can
click on Advanced file system Utils and and use the FAT: Boot and FAT
repair/NTFS: Boot and MFT repair based on the type of partitioin you
have. This was the problem with my disk too and got corrected in no
time.

To be contd ...
