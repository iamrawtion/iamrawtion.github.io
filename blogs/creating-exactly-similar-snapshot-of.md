---
title: "Creating an exactly similar snapshot of your existing running EC2 ami instance"
date: "2013-07-19"
category: "Cloud Computing"
tags: []
excerpt: "Some rights reserved by Martin Fisch was going pretty well on the existing EC2 instance, when the developers offshore came up with another version of..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-RkAui0SizULhPGjU9J4jB6vsq1Hjrtvg-pfuKFV5-LvuJzcF8FbDgzherMe93Q5Bo8FRjfipnRp9EgXyGAm0_lq2q14rYWdNVtcOlKQnh0hWbhyo9PJ1MbGa09DYOfzQHg5Gj3AEaCw/s1600/6352047101_989f7e1f24_m.jpg)

Some rights reserved by [Martin Fisch](https://www.flickr.com/photos/marfis75/)

## Everything

was going pretty well on the existing EC2 instance, when the developers
offshore came up with another version of the existing CMS, which needed
to be tested along with the existing CMS. One way was to have another
virtual host created for the new CMS but there were some existing
resources that could not be shared between the two CMSs.

The
only way out of this was to have another instance with the new CMS
version. Installing the same applications in the new instance was surely
time consuming, this would take another day for sure. So we came up
with the idea of creating a snapshot of the existing instance.

## Caution

## If you only try to create a copy of the existing instance you will only

get the Instance along with the OS not the applications along with it.
To create the exact similar copy of the instance the steps are slightly
different.

Steps to create an exact similar copy are as follows:

1. Create an EBS volume using the web interface. You may use [Amazon Documentation](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-creating-volume.html) for this.
2. Attach this volume to your existing instance. note down the volume and the device id. (Vol -123456, /dev/sdg) [Documentation](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-attaching-volume.html)
3. Next you would need is a file system to work on, on the attached volume. Log in to your instance, and use the commands below

- mkfs.ext3 /dev/sdg
- tune2fs -c 0 /dev/sdg

4. Now mount this disk

- mkdir /mnt/data
- mount /dev/sdg /mnt/ebs

5. Now

   you can copy all the data to your EBS volume but before you do that,
   shutdown the running services that may harm the data, I stopped **MySQL**

---

## Apache, ElasticSearch etc on my instance. To copy all data use rsync

   This will sync all the data in your present volume to the new volume.

- rsync -avx --exclude /mnt / /mnt/ebs //you may use --exclude <directory name> to exclude any directories

6. This should take long time depending on how big the data is. Once the copying is done, Unmount the volume by:

- umount /dev/sdg
- You may want to check the volume space by df -h

7. Detach the volume for the present instance from the console. [Documentation](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-detaching-volume.html)
8. Right

   click on the volume and click on create AMI image. When the image is
   created. Right click on it and click on Launch Instance.

You now have an exact copy of your old instance running.
