---
title: "Second Place Story : Server ghouls haunt bulk ingestion"
date: "2013-11-03"
category: "Programming"
tags: ["Server", "Storage", "Troubleshooting"]
excerpt: "Some rights reserved by Julie Rybarczyk I recently shared one of my stories while monitoring an Ingestion Server with AppFirst for one of the..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHkXCfyNHTRUA1SrYS1UpDmrku0fP0iVUpcrPVM3pZuE0UGWO7_eSGWrqkEmxf0weIo62K6FpneKbNlaMumUt_Ds3d0-CEJK74hbcZhxtATlnTPMPw-hreOUZuXoinjFg4ZWwzTgcKDmE/s1600/5096035675_fbc69eac8f_m.jpg)

Some rights reserved by [Julie Rybarczyk](https://www.flickr.com/photos/48424574@N07/)

  
  
I recently shared one of my stories while monitoring an Ingestion Server with [AppFirst](http://www.appfirst.com/) for one of the Halloween contest they conducted. Thankfully, won 2nd prize in the same. Sharing the same story here along with the [link](http://www.appfirst.com/blog/halloween-infographic-and-horror-story-winners/) to visit.  
  

Second Place Story

**Server ghouls haunt bulk ingestion**  
Company: Roshvert  
I was suppose to monitor an Ingestion Server that was performing a
bulk ingestion through an EC2 instance with around 200 GB of data to be
ingested to another server.  
Since it was a huge amount of data and the ingestion would take
another day to complete, I kept the ingestion going and the logs were
performing well. I decided then that I’d log in early tomorrow morning
to check the ingestion status. During this time, the log files were
supposed to be created automatically through the ingestion and the name
of the log file for any particular day should be log_dd-mm-yyyy.txt with
date of that day mentioned. It was a staging server and the code was
supposed to be supplied for UAT in a day or two.  
I logged in early the next morning to check the ingestion status. I
was totally puzzled as I couldn’t make out what was happening:  

- The log file for the previous day log_27-08-2013.txt was showing
  everything went well until 11pm midnight and no logs thereafter.
- The log file for today log_28-08-2013.txt got created with no data in it.
- The ingestion process was running with no errors.
- The server logs showed no errors.
- The system never went down.
- Nearly 150 GB of data was still to be ingested and was not progressing at all.
- None of the logs showed any updates as to why the ingestion was not progressing.

Since the delivery was urgent, I stopped the ingestion on the
instance and restarted it. To my horror, the ingestion was not
progressing at all. I tried running ingestion on other instances, and it
worked fine.  
Then something hit me, and I went back to check the logs of
ingestion. The ingestion logs still showed nothing with 0 kb space used
by the logs. Wait!!! Space? 0kb? 150 GB data still remaining?  
I immediately checked the disk space and found zero space available. Whoaa!!!  
What actually happened is while performing the ingestion, the server
created a duplicate copy of the data on the same instance, and until the
entire ingestion completes, this data used to remain there. Around 250
GB of disk space was used by ingestion by midnight and the disk was
full. I immediately attached a bigger volume to the instance and
restarted the ingestion. Thankfully it was complete in a few hours and
that saved me from a big trouble!!!