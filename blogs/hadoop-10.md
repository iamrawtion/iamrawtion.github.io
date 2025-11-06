---
title: "Hadoop 1.0"
date: "2014-08-25"
category: "DevOps"
tags: ["BigData", "Devops", "Hadoop", "Hbase", "Hive"]
excerpt: "some rights reserved by intelfreepress Got opportunity to work with Hadoop with a recent project. Understanding the architecture conceptually and..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhob0BaQ4oCq2lbAOXjHBcY1dX0mnSRtSuqt0yUdUZIAQ_e9USQsxJgFwTX9VvFpL3bu-dMCLhyWNlc52TmtcSPXJVLGBTUJ8qooQaIb7T1IOmb9Es2p_8u837PKdecifHJ7K80Oas9Q7I/s1600/8552968000_9da6bffe9a_m.jpg)

some rights reserved by [intelfreepress](https://www.flickr.com/photos/intelfreepress/8552968000)

Got opportunity to work with Hadoop with a recent project. Understanding the architecture conceptually and then learn using it is fun. I am still learning it though. This part explains Hadoop 1.0 which I believe helped me to understand 2.0 well.  
  
Before understanding Hadoop it would make more sense if we get rid of a few jargon that would come our way.  
  
```json
[

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOu4MM482qPyH8qvbWQ1j30zldRcv17HiQThVLYp3v8XL4k6q0siDpm51DS50ZRr1vSNOG8ZLYejlvzr04aJPahxEYT_wIHdAqfwwo6YBpa8Jukv3bnV6SF2rcyza1eb0keNPotlTRwKQ/s1600/Hadoop1.png)**Oozie** is like a cronjob. In addition to running jobs time based, it also allows running jobs on particular statuses, like:  
i. Run job B when Job A completes  
ii. Run Job B when a particular file is present.  
Oozie is a kind of job coordinator. When you write Oozie, you need to specify in an xml the kind of workflow you want it to follow.  
  
**Hive** is a dataware housing system for hadoop.  
  
**Pig Latin** is a kind of Data Analysis. Those who are not java programmers and may not be able to write complex java code can use pig to run the MapReduce job on Hadoop. Syntax is similar to erlang programming language where you could say load this file , group by etc. A simple program of 2 -3 lines which in java may take a some effort could be written easily here. The limitation could be that you may not be able to write very complex logic in Pig. If you have something simple as a log file that you just want to read data from that is separated by tabs, you could use Pig.  
  
**Mahout** is a machine learning. It provides all the machine learning algorithms which are in place. Mahout just writes a wrapper around existing algos so that you can use it along with Hadoop.  
  
**HBase** is hadoop database. Its a NoSQL kind of DB which is inside Hadoop and a lower layer of file system that is HDFS.  
  
**HDFS** Hadoop distributed file system, will sit on top of your existing filesystem. In the native OS the file system could be ext3, ext4 etc. The HDFS sits as a pseudo filesystem on top of your existing filesystem so that you can visualize all the different filesystems on differnt nodes and clusters as one.  
  
**Flume and Scoop**: Flume handles unstructured data like tweets, logs or semistructured data like xmls. Scoop handles structured data. We can configure flume to read data form apache log directory : /var/log/apache2/error.log  
  
Hadoop has two very important parts.  
1. Storage unit  
2. Processing unit  
  
[

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbrEgt-cCjJJs4n8GrIFRGAcoP_XBEqSovvptsFhKT027VQLH_Ym8gOqmIFZNUsvmn7zo4NcAJe1aDqaGdlZuMK_YbnVG3oDJe4UVLM0kkuQhTjM5jAmRb4haTUHYsZzZXpJ6j3eY1Xt0/s1600/Hadoop2.png)
  
  
Storage unit is where you store, read and write data onto i.e HDFS. This HDFS is distributed across nodes. They are natively redundant, that means it is by default redundant and you do not need to configure RAID or any other software or hardware for this. It would by default make 3 copies of each block. This number is configurable to any number of copies you need.  
  
Hadoop has a Master Slave architecture. It has a master node and a few slave nodes that talk to the master. The master node in Hadoop is known as Name Node. All the nodes that have Data Nodes running could be slave nodes. Different instances can have different or same type of filesystems, but HDFS will be laid across all these nodes. So when you run the command "hadoop fs -ls /" it doesn't bother as to which node the file is present, It will bring files from all nodes data node1 data node2 data node3... and show up. The NameNode keeps track of all the data blocks.  
  
Processing Unit is provided by the MapReduce framework. This can be called as the brain of Hadoop. When you supply a job to Hadoop, it will split the jobs according to the processors you have. If you have a Hadoop cluster with two nodes, each node with one processor. You can run two processes in one cluster parallely.  
*Locality of reference*: Earlier, when you wanted to process a data you would move data close to the processing unit. This required you to 1st copy the data.  It would pull the data in the RAM and then it would process it there. This is fine when dealing with small amount of data. But in case of Hadoop you will be dealing with data in terabytes and petabytes. Here copying or moving of huge data is time consuming. In order to not invlove any data movement, now Hadoop instead moves the processing unit itself to where the data is present. This is called *locality of reference*.  
  
(To be contd..)
```
