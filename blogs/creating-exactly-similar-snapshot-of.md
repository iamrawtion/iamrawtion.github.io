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
   shutdown the running services that may harm the data, I stopped MySQL

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

## When to Clone an EC2 Instance

Cloning an EC2 instance is not something you do every day, but there are several scenarios where it becomes the most practical path forward.

**Creating staging environments** is probably the most common use case. Rather than building a staging server from scratch and hoping it matches production, you clone production directly. The result is a staging environment that is byte-for-byte identical to what your users see — same OS patches, same installed packages, same configuration files. Any bug that exists in production will exist in staging, which is exactly what you want when testing a fix.

**Horizontal scaling before Auto Scaling Groups** is another strong use case. When you need to quickly spin up additional capacity during a traffic spike and you have not yet set up an Auto Scaling Group, creating an AMI from your running instance and launching copies of it is a fast, reliable way to scale out. It is not a substitute for proper auto-scaling architecture, but it works well as a short-term measure.

**Disaster recovery snapshots** are a third reason to create AMIs regularly. Even if you have a backup strategy in place, having a point-in-time AMI of a fully configured instance means that recovery is as simple as launching a new instance from that image. Restoring from a database dump or a configuration management tool takes time and involves steps that can go wrong. Launching from an AMI does not.

**Migrating to a different instance type** is the fourth scenario. If you need to move from an older generation instance (say, m3 to m6i) or from one instance family to another (compute-optimized to memory-optimized), the cleanest way is to create an AMI of the current instance and launch it on the new type. You test on the new hardware before touching production.

## The AMI Creation Process Explained

When you create an AMI from a running or stopped EC2 instance, AWS performs a sequence of operations behind the scenes.

First, AWS takes a snapshot of each EBS volume attached to the instance. These snapshots are stored in Amazon S3 and are the actual data being preserved. The root volume snapshot contains the operating system and everything installed on it. Additional data volumes are also snapshotted and included in the AMI definition.

Second, AWS stores metadata in the EC2 service itself — the AMI ID, the architecture, the root device type, kernel ID, and the block device mapping that describes which snapshots attach at which device paths when a new instance is launched.

There is an important distinction between **EBS-backed AMIs** and **instance store-backed AMIs**. EBS-backed AMIs (the default for almost every modern instance) store the root volume as an EBS snapshot. When you launch an instance from an EBS-backed AMI, the root volume is created from that snapshot. EBS-backed instances can be stopped without losing data. Instance store-backed AMIs, by contrast, store the root volume in S3 and copy it to local ephemeral storage at launch. Instance store instances cannot be stopped — only terminated. Unless you have a specific reason to use instance store, EBS-backed is what you want.

**Encryption** also matters here. If your source EBS volumes are unencrypted, the resulting snapshots will be unencrypted by default. You can choose to encrypt the AMI during creation, which will create encrypted copies of the snapshots. Encrypted AMIs cannot be directly shared across AWS accounts the way unencrypted ones can, but they are the right choice for any data that requires encryption at rest.

## Automating AMI Creation

Manual AMI creation is fine for a one-off task, but for ongoing backup or deployment pipelines you want automation.

The AWS CLI makes this straightforward:

```bash
aws ec2 create-image \
  --instance-id i-0123456789abcdef0 \
  --name "backup-$(date +%Y%m%d)" \
  --description "Automated daily backup" \
  --no-reboot
```

The `--no-reboot` flag tells AWS to create the AMI without stopping and restarting the instance. This is faster but means the AMI may have a slightly inconsistent filesystem state if writes were in progress. For databases, it is safer to take a snapshot during a maintenance window or after stopping the instance.

To manage costs and avoid accumulating stale AMIs, use **Amazon Data Lifecycle Manager (DLM)** to attach lifecycle policies to your instances. DLM can automatically create AMIs on a schedule and delete AMIs older than a specified number of days or count. This keeps your AMI inventory clean without manual intervention.

## Pitfalls to Avoid

A few common mistakes are worth knowing about before you rely on this process in production.

**Inconsistent state if the instance is not stopped.** If your instance is writing data heavily when the AMI is created, the resulting snapshot may capture a filesystem in an inconsistent state. For stateless applications this is usually fine, but for anything running a database or writing critical files, stop the instance first or at least stop the database service before taking the snapshot.

**Unencrypted AMIs crossing accounts.** Sharing an unencrypted AMI with another AWS account exposes all the data on those EBS snapshots to the target account. If the data is sensitive, always encrypt the AMI before sharing it. You cannot retroactively encrypt a snapshot that has already been shared unencrypted.

**AMI costs.** Many people forget that AMIs are not free. You pay for the underlying EBS snapshots at the standard snapshot storage rate (per GB-month). If you create AMIs frequently and never clean them up, those costs add up. Always have a retention policy in place.

For complete documentation on AMI creation, see the official [AWS guide to creating an EBS-backed AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-an-ami-ebs.html).
