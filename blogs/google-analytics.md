---
title: "Google Analytics. How to use Google Analytics?"
date: "2013-01-26"
category: "Programming"
tags: []
excerpt: "Some rights reserved by Search Engine People Google Analytics I recently used Google Analytics in one of my Projects for testing purpose, and boy!!!..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjA63gkqf7yx3AuPvEKnQYP2PReA2j0dgrK-FnmF2yeVeUyfjHY66ZDo4z3UVsJVJ-0VbZbI9E3LXqNvgV6e6MKgq7rbA09Qc742XAt6vdILVwyh9LT7KjKTM6DJ9wmGePkdw5Z3OFpXCU/s1600/3542294246_1e9ea65eb4_m.jpg)

Some rights reserved by [Search Engine People](https://www.flickr.com/photos/sepblog/)

Google Analytics

I recently used Google Analytics in one of my Projects for testing purpose, and boy!!! i was so impressed.

I never know Analytics could be this strong and could yield this result.
I thought i should share my experience, not only this i could relate my (whatever little) knowledge of Big Data to each and every report i generated.

I was initially confused on how to use it for the project.
I was unable to understand what was the client really interested in after reading the [JIRA issue](http://roshannagekar.blogspot.in/2013/01/jira-issue-tracking.html).

So i implemented the Google Analytics (GA) code onto my personal blog.
I purposely posted my blog links on my gtalk account in order to temporarily increase the number of visitors to my blog.

And then i kept track of the visitors.
Within a day or so i kind of understood how it's used and what you could do with it.

Of Course Wikipedia always helps as well.

GA is Google offered web tool to keep a track of visitors to your website.
This way you can keep a watch on what your customers really look for, you can accordingly increase your sales rate.

Later i also gotta know that this can also be used as a SEO(search engine optimization tool) Its a must know tool for any Business Development person in any organization most probably a startup organization.

The basic service for GA is available free of cost.
The premium user although is charged i believe(although Wikipedia says its free i dint try it!!!)

GA also tracks all referrers e.g Search Engines, Pay-per-click ads etc.

This is what happens and how it works. I will discuss how i kept track of my site(the one your are a visitor currently to)!!

1. You 1st need to have a Google account to access GA
2. Now you need to generate a code from your GA account that needs to be pasted in your website HTML code so that you can keep a track of it.
3. You can generate and paste the code to as many pages you want and keep a track of all of them.
4. You can keep a track at real time using the real time option on GA
5. You can also generate a report using the Custom Report Generation tab
6. This report can then be sent to as many people you want.
7. The report can be generated based on any criteria e.g devices used to access the website, location of the visitor, browser used, Operating system used and many more.
8. You can also generate a Graph based on reports generated in the same report
10. You can select the duration of which you would want the report for.
11. Real time report generation however is not possible for some reason, However real time tracking can be done, which is fair enough
12. Google Analytics is used by many organizations to keep a track of visitors and their interests in order to increase their business

Must for all, not only startups but also for individuals like me who want to know their blog visitors.... ;)

## GA4 vs Universal Analytics: What Changed

If you set up Google Analytics more than a few years ago, you were likely using Universal Analytics (UA). Google completed the migration to Google Analytics 4 (GA4) in 2023, sunsetting UA entirely. The two systems are fundamentally different in how they model data, not just a cosmetic redesign.

**Session-based vs. event-based.** Universal Analytics organized data around sessions — a user visiting your site started a session, and everything they did within that visit was grouped together. GA4 organizes everything around events. A page view is an event. A click is an event. A scroll past 90% of the page is an event. This makes GA4 more flexible for tracking complex user journeys, but also means your old UA reports do not have direct equivalents in GA4 and historical UA data does not carry over.

**Key differences in reporting.** GA4 introduced a new set of default reports: Acquisition, Engagement, Monetization, and Retention. The Realtime report works differently, and some familiar UA dimensions like Bounce Rate have been replaced — GA4 uses Engaged Sessions (sessions lasting longer than 10 seconds or involving multiple page views) instead.

**The migration deadline has passed.** If you still have UA code on your site, it stopped collecting data in mid-2023. The GA4 tracking snippet uses a different measurement ID format (`G-XXXXXXXXXX` instead of `UA-XXXXXXX-X`) and must be added separately.

## Key Reports to Set Up First

GA4 has a lot of reports, and it can be hard to know where to start. These four are the ones that deliver the most signal early on.

**Acquisition overview** shows you where your visitors are coming from — organic search, direct, referral, social, or paid. This tells you which of your marketing or distribution channels is actually working and helps you decide where to invest more effort.

**Landing pages** (found under Engagement) shows you which pages users arrive at first and how they behave after landing. A page with high traffic but low engagement time or high exit rate is a signal that the content does not match what visitors expected to find.

**User engagement** tracks how long users spend on your site and how many pages they visit per session. This is a proxy for content quality and site navigation. If users consistently leave after one page, something about the experience is not encouraging exploration.

**Conversions** track specific actions you care about — newsletter signups, purchases, form submissions, or any other goal. You have to define these yourself in GA4 as Events and mark them as conversion events. Without this, you are measuring traffic without measuring outcomes.

## Privacy Considerations and Alternatives

Google Analytics is powerful but not without tradeoffs, particularly around user privacy.

**GDPR and cookie consent.** In the European Union and many other jurisdictions, using Google Analytics requires informed consent from users before setting cookies. This means a cookie consent banner is legally required, and users who decline tracking will not appear in your data. GA4 introduced some data modeling to estimate conversions from users who opt out, but the fundamental tension between analytics and privacy remains.

**Privacy-preserving alternatives.** A growing set of analytics tools are designed from the ground up to respect user privacy without requiring cookie consent banners.

[Plausible Analytics](https://plausible.io) is a lightweight, open-source analytics tool that does not use cookies and is fully GDPR-compliant without consent banners. It gives you the core metrics — page views, referrers, countries, devices — without any personal data collection. There is a hosted paid version and a self-hosted free option.

**Fathom Analytics** takes a similar approach — cookieless, GDPR-compliant, simple reporting. It is hosted-only and costs more than Plausible but has a strong reputation for reliability.

[Matomo](https://matomo.org) (formerly Piwik) is a full-featured analytics platform that can be self-hosted, giving you complete ownership of your data. It supports the full range of reports similar to Google Analytics and can be configured to operate without cookies for compliance purposes. Self-hosting requires server setup and maintenance, but it is the most privacy-complete option for organizations that cannot send data to third parties.
