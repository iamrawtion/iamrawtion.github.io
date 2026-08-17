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

## Beyond top: Modern Monitoring Tools

`top` is what you reach for when you're already SSH'd into a machine and need to see what's happening right now. It's fast and available everywhere. But it has real limits: no history, no alerting, limited context for diagnosing what's actually causing the load. These tools fill the gaps.

**htop** — an improved `top` with color, mouse support, and per-CPU bars:
```bash
sudo apt install htop  # or brew install htop
htop
```

htop shows individual CPU cores as horizontal bars, lets you scroll through the process list, and supports mouse clicks for sorting and killing processes. It's strictly more usable than `top` for interactive debugging. The reason I still mention `top` first is that htop isn't always installed on minimal or production systems; `top` always is.

**vmstat** — system-wide stats in a time series, good for spotting trends rather than instantaneous snapshots:
```bash
vmstat 1 10    # report every 1 second, 10 times
```

vmstat shows CPU, memory, swap, and I/O in a compact columnar format. Running it with a time interval lets you see how these metrics move over time — something `top` doesn't give you in a scannable format.

**iostat** — disk I/O stats alongside CPU, part of the `sysstat` package:
```bash
iostat -x 1    # extended stats every 1 second
```

The extended stats (`-x`) show utilization per device, average queue length, and await time (how long requests wait for I/O to complete). If your `top` shows high `wa` (I/O wait) and you want to know which disk is the bottleneck, `iostat` is where you look next.

**sar** (System Activity Reporter) — historical data, also part of `sysstat`:
```bash
sar -u 1 5     # CPU utilization, 1 second interval, 5 samples
sar -r 1 5     # memory utilization
sar -b 1 5     # I/O statistics
```

`sar` is particularly valuable because it can read from historical logs collected by the `sadc` daemon — so you can look at CPU utilization from 6 hours ago when the alert fired, not just right now.

Brendan Gregg's [Linux Performance Tools](http://www.brendangregg.com/linuxperf.html) page is the definitive reference for understanding which tool to reach for at each layer of the stack. Worth bookmarking.

## Interpreting top Output for Common Problems

Knowing the fields is one thing. Knowing what combinations of values indicate which problems is what actually matters when you're debugging under pressure.

**High load average but low CPU%**: the processes are blocked waiting for something that isn't CPU. Check the `wa` column in the CPU line — that's I/O wait, the percentage of time the CPU is idle because processes are waiting on disk. If `wa` is elevated (anything above 5-10% is worth investigating), the bottleneck is disk. Verify with `iostat -x 1`.

**High CPU% on a single process**: find it with `top` (it'll be at the top of the list sorted by %CPU). Then dig deeper with `strace -p <pid>` to see what system calls it's making, or `perf top` to see which code paths are consuming the cycles. High CPU on a known-good process often means a hot loop caused by unexpected input data or a configuration change.

**Memory pressure**: watch the `si` and `so` values in the memory section of `top` — swap in and swap out. Non-zero `si`/`so` means the kernel is actively moving data between RAM and disk. Swap in (`si`) means it's reading previously swapped-out data back into RAM because something needs it — performance is degraded because disk access is happening where RAM access should be. Sort by %MEM in top (press `M`) to find what's consuming memory.

**Zombie processes**: visible in the tasks line as the `Z` count. A zombie is a process that has finished executing but whose parent hasn't called `wait()` to retrieve its exit status and clean it up. The zombie sits in the process table using a small amount of kernel resources. A handful of zombies at any point is normal. A growing count of zombies indicates the parent process has a bug — it's spawning children and not collecting them. You can't kill a zombie directly; you have to kill (or fix) the parent.

## Setting Up Persistent Monitoring

`top` tells you what's happening right now. It doesn't tell you what happened an hour ago, and it can't alert you when something goes wrong while you're not looking. For production systems, you need monitoring that runs continuously, retains history, and sends alerts.

**Prometheus + node_exporter** is the current standard for Linux host metrics. node_exporter is a small agent that runs on each host and exposes CPU, memory, disk, filesystem, and network metrics in Prometheus format. Prometheus scrapes and stores them. Pair it with Grafana for dashboards and Alertmanager for routing alerts to PagerDuty, Slack, or email. This stack requires some setup investment but scales well and gives you full control over retention and alerting rules. See [node_exporter on GitHub](https://github.com/prometheus/node_exporter) to get started.

**Netdata** is the right choice if you want real-time dashboards with minimal setup. Install it on a host and you immediately get per-second granularity metrics with a built-in web UI — no separate Prometheus or Grafana required. It's better for single-host visibility than for multi-host fleet monitoring, but for a small number of machines it's fast to get running.

**CloudWatch Agent** — if your infrastructure is on AWS EC2, the CloudWatch Agent collects the same metrics (CPU, memory, disk, network) and ships them to CloudWatch without requiring you to run separate infrastructure. You get CloudWatch Alarms and dashboards out of the box. The tradeoff is cost (CloudWatch isn't free at scale) and lock-in to AWS tooling.

The principle to internalize: `top` is for interactive debugging when you're already SSH'd in because something is wrong. Prometheus (or equivalent) is what catches problems before you need to SSH in. Running in production without persistent monitoring means you only find out about problems when users tell you — and by then the `top` output you're looking at may not show the actual cause, just the aftermath.
