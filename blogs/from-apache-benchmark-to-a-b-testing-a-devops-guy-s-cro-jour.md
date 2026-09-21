---
title: "From Apache Benchmark to A/B Testing, A DevOps Guy’s CRO Journey"
date: "2026-05-11"
category: "DevOps"
tags: ["A/B Testing", "AI Agents", "AI/ML", "Automation", "CRO", "CRO", "DevOps", "Marketing", "Sales"]
excerpt: "When my manager first mentioned A/B testing, I nodded confidently. I knew exactly what it was. Except I didn’t. In my head, “A/B testing” meant Apache..."
author: "Roshan Nagekar"
---

![](https://miro.medium.com/v2/resize:fit:1400/1*9kjWypkr61zsHO6zmWNLfQ.png)


When my manager first mentioned A/B testing, I nodded confidently. I knew exactly what it was.

Except I didn’t.

In my head, “A/B testing” meant **Apache Benchmark**, the `ab` command-line tool DevOps engineers use to hammer HTTP servers and measure throughput. Requests per second. Latency percentiles. That kind of A/B testing.

What followed was a humbling unlearning. Concepts like Conversion Rate Optimization, variations, Split URL tests, A/A tests, I was reading all of this through a server engineer’s lens and none of it made sense at first. Why run experiments? Why not just change the code, redeploy, and see what happens?

That was my first mistake. And if you’re a technical person stepping into the world of CRO, you’ll probably make it too.


## So, What Actually Is CRO?

Let me skip the textbook definition and use a story instead.

Say you’re selling a bestselling book online. You’re running ads, offering discounts, the traffic numbers look decent, but conversions are low. People are landing on your page and leaving. You’ve checked the backend, the server is healthy, the page loads fast. As a DevOps engineer, you’d call this “nothing to fix.”

But something *is* broken, just not in the infrastructure.

**Conversion Rate Optimization (CRO)** is the practice of understanding *why* visitors don’t convert, and systematically fixing it through experimentation. You introduce a change, a different headline, a reordered checkout flow, a new CTA button color, mark it as Variation A or Variation B, measure which one converts better, and iterate.

Simple math:

```
Conversion Rate = (Conversions / Total Visitors) × 100
```

If 10 out of 100 visitors buy your book, your conversion rate is 10%. A CRO practitioner’s job is to move that number, but more importantly, to *understand why* it moved.

That last part matters. A random change that boosts conversions is luck. Understanding the reason behind the boost, that’s CRO.


## The Hidden Cost of Ignoring CRO

Here’s a pattern that plays out more often than it should:

A business pours budget into ad campaigns. Traffic surges. Conversions don’t. They spend more on ads. Still nothing. Eventually someone realizes the problem wasn’t the ad, it was the landing page. Confusing layout, unclear value proposition, a checkout flow that made users feel unsafe.

By then, they’ve burned through their budget chasing the wrong problem.

CRO tools exist to surface these issues before they become expensive. **Heatmaps** show you where users click (and where they don’t). **Session recordings** let you literally watch a user struggle with your UI. **Exit-intent surveys** catch people right as they’re leaving and ask them why. These aren’t vanity metrics, they’re diagnostic tools.

As someone who spends a lot of time on observability and monitoring in DevOps, I found this framing familiar: *if you can’t measure it, you can’t fix it.*


## Before You Start: Is CRO Even Right for You?

This is a question I wish someone had asked me earlier.

**A/B testing requires traffic.** Without enough visitors, you can’t achieve statistical significance, the confidence level that tells you a result is real and not just noise. Most CRO practitioners aim for 95% confidence, ideally 99%.

Here’s an analogy that clicked for me:

Flip a coin 3 times, get heads all 3 times. Is the coin rigged? Hard to say, could be luck. Flip it 1,000 times and get heads 900 times. Now you’re pretty sure something’s off.

That “pretty sure” feeling, measured as a percentage, is your confidence level.


If your site gets 200 visitors a month, running a statistically valid A/B test is going to take a very long time. Many A/B testing platforms offer sample size calculators, use them before committing to a test.


## A Framework for Getting Started

When I started approaching CRO with more structure, things got clearer. Here’s the sequence that worked for me:

## 1. Define a Goal First

Don’t open a heatmap tool and start poking around without knowing what you’re looking for. Start with a concrete goal:
- Increase revenue by X% in Y days
- Grow the customer base by Z%
- Improve feature adoption on a specific page


Each goal points to a different strategy:

GoalLeverIncrease revenueUpsells, pricing page clarityBigger customer baseBetter UX, reduced frictionIncrease engagementFeature discovery, onboarding flow

## 2. Audit Your Site

At a [D2C roundtable conference](https://optiphoenix.com/d2c-roundtable) I attended, participants were split into groups and given websites to audit, armed with CRO cards listing what to look for. Are visitors able to find what they need? Is the checkout frictionless? How long does the full journey take?

One presenter, [Gursimran Gujral](https://www.linkedin.com/in/gursimran-gujral-6b0a4724/) (Co-Founder at OptiPhoenix), walked through a heatmap that had driven several of their key CRO decisions. Seeing a real example in action made the whole framework concrete.

Auditing before testing gives you hypotheses. Hypotheses give your tests direction. A good hypothesis follows a simple structure: “If I change X, then Y will happen, because Z.” That “because” is what separates informed testing from random tinkering.

An example: If I change the CTA button text from *‘Buy Now’* to *‘Get Your Copy Today’*, then more visitors will click through to checkout, because the new copy feels less transactional and creates a sense of ownership.

## 3. Pick the Right Tools

You don’t need everything at once. Start with one tool per job:
- **User behavior**: [Microsoft Clarity](https://clarity.microsoft.com/) (free) or [Hotjar](https://www.hotjar.com/), heatmaps, session recordings
- **A/B / Split URL / Multivariate testing**: [Convert.com](https://www.convert.com/), robust experimentation platform
- **Funnel analysis**: GA4 + LookerStudio, track where users drop off


Analytics alone won’t get you there. You need a dedicated testing tool to run controlled experiments.

## 4. Run Tests with Patience

One of the most common beginner mistakes is stopping a test too early because the early numbers look good (or bad). Let tests run for **at least a week** to account for day-of-week behavior differences. Trust the confidence interval, not your gut.


## Resources Worth Your Time

These are the ones I actually found useful, not just names I’m dropping:
- **Ruben de Boer’s courses: **practical, tool-focused, good for getting hands-on fast
- **CXL’s CRO Fundamentals**: more rigorous, worth it if you want depth over speed
- **MeasureSchool on YouTube**: excellent for GA4, GTM, and LookerStudio workflows
- **Baymard Institute**: research-backed UX analysis, great for e-commerce audits
- **Robert Cialdini’s *Influence: The Psychology of Persuasion: ***understanding *why* humans behave on pages is half the battle


For practice: volunteer your CRO skills to NGOs or small businesses. Real traffic on real sites teaches you things no course can.


## The Real Takeaway

CRO isn’t a bag of tricks. It’s a discipline built on measurement, hypotheses, and patience, things that, honestly, aren’t that different from good DevOps practice.

You instrument. You observe. You form a hypothesis. You test. You learn.

The difference is that in DevOps, you’re optimizing for uptime and throughput. In CRO, you’re optimizing for human behavior. And humans, unlike servers, don’t always behave the way the logs suggest they should.

That’s what makes it interesting, and why I’m still learning.


*If you’re a technical person who’s crossed over into CRO or is curious about it, I’d love to hear your experience. Drop a comment or reach out.*