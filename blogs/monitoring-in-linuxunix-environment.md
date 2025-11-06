---
title: "Monitoring in Linux/Unix Environment using TOP"
date: "2014-01-02"
category: "DevOps"
tags: ["Devops", "Linux", "Troubleshooting"]
excerpt: "Some rights reserved by Steve Jurvetson is the Linux performance monitoring program. For windows user, its analogous to the Task Manager. This..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH47MwOd_VlPuqi8Sc_tjGzqE5Jz4Lur6gQfAPyvYW9BmJ-ducyi5okcX_IyOhqOgBL8T86ZqJW-LFM3eNXdNqtFfqCA9MWg6RfDnM3ytM8OH407dQO1JeOJqqGsI_YNU7CFuHWpBX2TE/s1600/12024889475_4ba5436bf9_m.jpg)

Some rights reserved by [Steve Jurvetson](https://www.flickr.com/photos/jurvetson/)

## Top

Top
is the Linux performance monitoring program. For windows user, its analogous to the Task Manager. This command displays the active processes
at real-time and updates the list regularly. Other system details like
CPU usage, Memory usage, Swap Memory, Cache Size, Buffer Size, Process
PID, User, Commands and much more.
The 1st line of the command mentions the following:

```yaml
- current time in hh:mm:ss format seconds keep updating
- uptime of the machine, how long has the machine been running
- no. of users logged in with running sessions
- average load on the system, 3 values mentioned are load in last one minute, 5 minutes and 15 minutes
```

The 2nd line mentions the following :

- Total number of processes running
- Present number of running processes
- Total sleeping processes
- Total stopped processes
- Total Zombie processes(waiting for parent process to stop)

The 3rd row mentions the following :

- % of CPU for user processes
- % of CPU for system/kernel processes
- % of CPU for prioritized or priority upgraded processes nice
- % of CPU not used
- % of CPU awaiting i/o operation
- % of CPU serving h/w interrupts
- % of CPU for s/w interrupts
- % of CPU stolen from virtual memory(steal time) this will be zero if no virtual machine running.

The 4th and 5th row mentions the following:

- The use of Physical memory
- The use of swap memory
- Both free buffer and cached

The details of the processes are given  with the following details:

```yaml
- PID: Process ID
- USER: The owner user of the process
- PR: Priority of the process
- NI: Nice value of the process
- VIRT: Amount of Virtual Memory used by the process
- RES: Amount of physical memory used by the process
- SHR: Shared memory of the process
- S: Status of the process Sleep Running Zombie
```

- %CPU: % of CPU used
- %MEM: % of RAM used
```yaml
- COMMAND: name of the process

```

The default sorting of the list displayed is based on CPU usage. you can change the sorting of the list as per your convenience.

*Changing the sorting:*

---

## Press Shift+o. A list will be displayed giving

all possible options using which you may sort the list, a letter
corresponding to the sort criteria. Select that particular letter and
hit 'return/enter' and see the new sorted list.

*Display Processes for a specific User:*

top -u username
This command will show the details of all the processes under the specific username mentioned in the command.

*Highlight any Running Process :*

Press Z after running top to highlight the running process to identify them easily.

*Show absolute Path of the process:*

To see the path from where the processes are being invoked press 'c' after running top

*Change screen refresh interval:*

To
change the screen refresh interval of the processes running press 'd'
and enter any number in seconds to set the time interval for refresh.

*Kill Running Process:*

to kill any of the running processes press 'k'
and enter the process id of the process to be killed. After this you
will be required to enter the signal (15) to kill the process.

*To sort by CPU Utilization:* Shift+p

Save Results of Top Command: press Ctrl+w

*for help:* press h
*Exit top after specific Repetition:* top -n <number>
*Manual Page for top :* man top
