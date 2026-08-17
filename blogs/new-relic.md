---
title: "New Relic"
date: "2013-10-21"
category: "DevOps"
tags: []
excerpt: "I received a mail some months ago to register to New Relic, they had some cool offers then like free t-shirts etc. I didn't check it then as i was..."
author: "Roshan Nagekar"
---

I received a mail some months ago to register to New Relic, they had some cool offers then like free t-shirts etc. I didn't check it then as i was really busy with other stuff. However since my new DevOps learning experience and course material had mentions of monitoring tools, after googling a bit i came across New Relic too.

So New Relic is a software analytics company. It delivers a Saas)Software as a service) model, that monitors Web and Mobile application real-time. Monitoring using New Relic seemed easy as i tried it on one or two systems and the logs generated looked really accurate and helpful too.

While there are may other useful ways as well for any organization for monitoring using New Relic, i only tried it for a systems performance. You can monitor your app, by simply supplying a a config file to the project directory and compiling and deploying the project. New Relic will provide real-time updates of the resources used by the app. You can add many plugins to your New Relic dashboard and enhance your monitoring experience.

## Installation

- Installation on windows was simple as you just have to download New Relic executable from their website. free trial is available.
- After installing New Relic Server monitor. Log in to your New Relic account (Create one if you did not create.) You can see you dashboard.
- Click on Dashboard and click on Add more. It will pull up the list of compatible Operating systems along with instructions to go ahead with monitoring.
- It is important to note that their is a unique key supplied on this page for the monitoring to show any progress or logs in the system.

## Configuring

- The configuration only involves copying the key to the New Relic Server monitor on your windows machine
- Go to Start > Programs > New Relic Server Monitor > Configure copy the key to the space provided.
- If you are using any proxy then you can add more details in the proxy tab

## Start Service

- Once the required configuration has been done, just click on start service and start monitoring in you Dashboard in the web interface.

You can see Pie Charts, Graphs of total memory used by process, total memory free, disk space, network usage etc. Screenshots are attached. Happy Monitoring.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-QWLGcK8l4Y66tD-0ZhkEtSXA0BfT9vTVFOIYrVngu8wSFWdggY6sucBAP0jK42vFF_SwBqlAx91Gc9AYZ3HJnwdbebw1DjEf-hMYv53PNdi5CZI9EduvUtZ9EVoeDVctvz-6PZlWxs4/s1600/mnitor3.png)
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQdqhlbYCGUDpop1bMwir6S6o2yzuFLaUMWVFJ1n_uGnroQ5Ni5Q-rsiiVGRoWIXsOsKvRpaoFp9GLXniPwwYtWbJU88RzO85a2mWPiLIA29CaMpXCxgp72_HOgvlAQ_PSoYuWEH22S3Y/s1600/Monitor1.png)
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdAhtRmJObOpCngUoe8w-zS4UCH1X16ogwRXqDX2YfFkXpCmCHV1MKu3v7rEgs1dQpa3wCWKJeD4bPvpjxxMifT6avq0pV7ZAywbB_dPgOI8xBvS_X9Kqky4KXv8snK_yRjZygRq8Jn58/s1600/Monitor2.png)
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYozx9ebJZguRaFOVc07Hq4yHLXrPXmCIq1TdLvRjmiqPj_fyHinx1ik62IeSioY-A5H3LNU65XBGl62IqflZe38UJn_wykPwQQDqIPXZdGWVfh0M0micAp_sC8pobED25vIap3j5CdEI/s1600/monitor4.png)

## What New Relic Actually Monitors

The server monitor described above is just one slice of what New Relic covers. The platform has grown into a full observability suite with several distinct product areas.

**APM (Application Performance Monitoring)** instruments your application code — PHP, Java, Python, Node.js, Ruby, Go, and others — to capture transaction traces, error rates, and Apdex scores. It shows you which endpoints are slow, which external calls are blocking, and where exceptions are thrown, all in the context of a real request lifecycle.

**Infrastructure agent** runs as a daemon on each host and streams host-level telemetry: CPU utilization, memory usage, disk I/O, network throughput, and running process inventory. It also integrates with on-host integrations for common services like Nginx, MySQL, Redis, and Kafka, pulling service-specific metrics without requiring code changes.

**Browser (Real User Monitoring)** injects a JavaScript snippet into your page's `<head>` that measures actual end-user experience: page load times, AJAX call durations, JavaScript errors, and Core Web Vitals (LCP, FID, CLS). Unlike synthetic monitoring, it captures real sessions across real network conditions.

**Logs** provides centralized log management. The infrastructure agent can forward logs from `/var/log` or any configured path, and APM agents automatically correlate log entries with traces — so a slow transaction leads directly to the log lines emitted during that request.

**Alerts** supports both static thresholds and anomaly detection. Anomaly detection baselines your metrics over time and fires when values deviate significantly from the learned pattern — useful for catching gradual degradation that a fixed threshold would miss.

## Setting Up the Infrastructure Agent

The infrastructure agent is the fastest way to start getting value from New Relic on a Linux host. Installation takes under five minutes.

On Debian/Ubuntu:

```bash
curl -fsSL https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/newrelic-infra.gpg
echo "deb https://download.newrelic.com/infrastructure_agent/linux/apt noble main" | sudo tee /etc/apt/sources.list.d/newrelic-infra.list
sudo apt-get update && sudo apt-get install newrelic-infra -y
```

On RHEL/CentOS:

```bash
sudo curl -o /etc/yum.repos.d/newrelic-infra.repo https://download.newrelic.com/infrastructure_agent/linux/yum/el/9/x86_64/newrelic-infra.repo
sudo yum install newrelic-infra -y
```

In both cases, add your license key to `/etc/newrelic-infra.yml`:

```yaml
license_key: YOUR_LICENSE_KEY_HERE
```

Start the agent with `sudo systemctl start newrelic-infra` and verify it is reporting by navigating to `Infrastructure > Hosts` in the New Relic UI. New hosts typically appear within two to three minutes of the agent starting.

## Key Metrics to Watch

Knowing which metrics matter — and what thresholds to alert on — separates reactive monitoring from proactive observability.

**Apdex score** measures user satisfaction on a 0-to-1 scale based on response time. An Apdex of 1.0 means all requests completed within the "satisfied" threshold (typically 500ms for web apps); below 0.7 indicates significant user impact. Alert when Apdex drops below 0.8 for more than five minutes.

**Error rate** is the percentage of transactions that result in a 5xx response or an uncaught exception. A sudden spike in error rate is often the first signal of a deployment gone wrong. Alert when error rate exceeds 1% over a five-minute window.

**Throughput (RPM/PPM)** measures requests or page views per minute. A sudden drop — not a spike — in throughput is often a sign of an upstream routing problem or a crashed process. Alert when throughput falls below 20% of the rolling 24-hour average.

**Response time percentiles (p95, p99).** Average response time hides tail latency. A p99 of 8 seconds means one in a hundred users waited eight seconds — that matters. Track both p95 and p99 and alert when p99 exceeds three times the normal baseline.

**Host CPU/memory/disk.** Alert when CPU stays above 85% for more than 10 minutes, when available memory falls below 10% of total, or when disk utilization exceeds 80%. Disk is particularly easy to miss — a log file that fills a volume will take down a server as surely as a hardware failure.

## New Relic vs. Alternatives

New Relic is not the only observability platform, and it is not always the right choice. Here is how it compares to the main alternatives.

**Datadog** has become the dominant SaaS observability platform for cloud-native organizations. It offers more out-of-the-box integrations with AWS, GCP, and Azure services, a more polished UI for infrastructure at scale, and arguably better log analytics. The trade-off is cost — Datadog's per-host and per-GB pricing can become very expensive at scale. Choose Datadog if you are heavily invested in cloud-native infrastructure and willing to pay for best-in-class integrations.

**Prometheus + Grafana** is the self-hosted alternative. Prometheus scrapes metrics from instrumented services and stores them in a time-series database; Grafana visualizes them. The setup is more involved — you manage the storage, retention, and alerting infrastructure yourself — but you get full control over your data, no per-seat or per-host licensing, and a large ecosystem of pre-built Grafana dashboards. Choose Prometheus + Grafana if you have the operational capacity to run it and strong cost or data sovereignty requirements.

**Elastic APM** integrates APM data (traces, errors, metrics) directly into your existing Elasticsearch/Kibana stack. If your team is already using the ELK stack for log aggregation, Elastic APM adds application-level observability without introducing a new vendor or data silo. It is a natural fit for organizations already invested in Elastic infrastructure.

For comprehensive documentation and setup guides, see [https://docs.newrelic.com](https://docs.newrelic.com).
