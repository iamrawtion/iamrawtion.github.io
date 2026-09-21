---
title: "Part 2: The Experiments That Actually Move the Number"
date: "2026-06-22"
category: "DevOps"
tags: ["A/B Testing", "Administration", "AI Agents", "AI/ML", "CRO", "CRO", "DevOps"]
excerpt: "If you read the first post in this series, you now have a working definition of CRO, a sense of why conversion rate matters, and hopefully a free account on..."
author: "Roshan Nagekar"
---

If you read the [first post](https://medium.com/@iamrawtion/from-apache-benchmark-to-a-b-testing-a-devops-guys-cro-journey-5ff76a502363) in this series, you now have a working definition of CRO, a sense of why conversion rate matters, and hopefully a free account on some combination of Clarity, GA4, and Convert.com(sshhh… I work for them).

Maybe you even opened a heatmap, stared at the colors for a while, and thought: “Okay. Now what?”

This post is that now what.

Once you understand the basics of CRO, the next challenge is figuring out what kind of experiment to run. A/A test? A/B test? Split URL test? Multivariate test? They all sound similar at first, but they solve different problems at different stages.

And if you are coming from a technical background, the temptation is to overthink the setup before shipping anything. I know, because that is exactly what I started doing.

So let’s break down the main experiment types, when to use each one, and how to think about them without getting stuck. I will also share a formula from a CRO course I have been working through that quietly changed how I think about the whole thing.

## The Four Experiment Types, Explained Without Jargon

### 1. A/A Testing

Before you trust your first experiment result, run an A/A test.

In an A/A test, both groups see the exact same page. No headline change, no button change, no layout change. Nothing at all. The purpose is not to improve conversions. The purpose is to check whether your measurement setup is actually trustworthy.

If your tool is configured correctly, both groups should show roughly similar conversion rates over time. If they do not, something is off with how traffic is being split, how visitors are being tracked, or how conversions are being recorded.

The DevOps parallel is straightforward. You would not set up Prometheus alerts on a misconfigured scrape target and then make infrastructure decisions based on that data. An A/A test is the same idea: confirm the instrument is working before you start using it to make calls.

A lot of teams skip this because it feels boring. There is no variation, no redesign, no winner to announce. But if your measurement layer is broken, every A/B test after this becomes questionable. You may spend weeks debating a result that was never reliable in the first place.

On Convert.com, setting up an A/A test takes about three minutes. Do it before anything else, and leave it running for at least a week.

Press enter or click to view image in full size
![](https://miro.medium.com/v2/resize:fit:1400/1*auaB7pqicBaOi-euyIJW6g.png)

### 2. A/B Testing
Once your A/A test passes, you are ready to actually experiment.

An A/B test compares two versions of something. Version A is the original, called the Control. Version B is the changed version, called the Variant. You split traffic between the two and measure which one performs better on your chosen metric.

The element you change could be a headline, a CTA button, a hero image, a form layout, a pricing message, anything on the user journey. The constraint is this: change one meaningful thing at a time.

If you change the headline, button color, pricing layout, and image all in the same test, and the variant wins, you have no idea what actually caused the lift. You got a result but no learning.

The DevOps analogy that clicked for me: a clean commit. If one commit touches ten unrelated files and something breaks, debugging is painful. If one commit changes one logical thing, the cause is much easier to trace.

A good A/B test starts with a hypothesis in this format: “If I change X, then Y will happen, because Z.”

For example: “If I change the CTA text from ‘Buy Now’ to ‘Get Your Copy Today,’ then more visitors will click through to checkout, because the new copy feels less transactional and creates a stronger sense of ownership.”

The “because” is the part most people skip, and it is the most important part. Without it, you are not testing a hypothesis. You are just nudging things and hoping the graph goes up.

Press enter or click to view image in full size
![](https://miro.medium.com/v2/resize:fit:1400/1*0w5KXlIqqcGDLi14nHJIsg.png)

### The confusion between A/A testing and A/B testing
I was always confused as to why A/A and A/B testing are needed. If you are also in the same state, here is a crude example that may simplify it.

**A/A Testing: The Paranoid Caterer**

You are catering a wedding. You make one giant pot of biryani. You serve it to Table 1 and Table 2 from the same pot, same quantity, same everything.

Table 1 finishes 95 plates. Table 2 finishes 30 plates.

You have not changed anything. Both tables got identical food. So why is Table 2 eating so little?

You investigate. Turns out the waiter assigned to Table 2 was busy on his phone and forgot to refill the serving bowls.

The biryani was not the problem. The delivery system was broken.

That is an A/A test. Before you start testing new recipes, you confirm that the serving system itself is not lying to you.

**A/B Testing: The Sensible Caterer**

Same wedding. You make two versions of biryani. Version A has the usual spice level. Version B has a little more pepper because your cousin who went to Bangalore said people there like it spicy now.

You serve Version A to the left side of the hall and Version B to the right side. You count which side finishes faster, asks for seconds more often, and complains less to the mother of the bride.

One change. One comparison. One winner.

You do not also change the raita, the naan, the serving bowl size, and the background music at the same time. Because if the right side loved it, you will never know if it was the pepper or the fact that the DJ on that side was finally playing something decent.

So:

**A/B test: “Which version is better?”
 A/A test: “Can I trust the test setup?”**

### 3. Split URL Testing

A standard A/B test usually changes something on the same page. The URL stays the same and the testing tool modifies what users see. Split URL testing is different: users are sent to entirely different URLs.

Control: /pricing. Variant: /pricing-v2. Traffic is split between them.

Use this when the change is large enough that modifying the existing page gets messy. Major redesigns, completely different landing page structures, new checkout flows, testing a long-form page against a shorter one. If it is a minor copy tweak, A/B is faster and simpler. If you are rebuilding the page from scratch, Split URL is cleaner.

The infrastructure analogy is blue-green deployment: two versions running simultaneously, traffic routed between them at the experimentation layer instead of the load balancer. Same principle, different domain.

One thing to watch carefully: tracking consistency. Both pages need to fire the same analytics events and conversion tracking correctly. A common mistake is having GA4 or pixel tracking set up on the original page but missing or misconfigured on the variant. When that happens, the variant looks like it is losing when the actual problem is your observability. As DevOps people know well, bad telemetry makes healthy systems look broken.

Press enter or click to view image in full size
![](https://miro.medium.com/v2/resize:fit:1400/1*PgjRO-HPFc4jHFjQYE74Ww.png)

### 4. Multivariate Testing
A/B testing changes one element at a time. Multivariate testing (MVT) changes multiple elements and tests every combination of them simultaneously.

Say you want to test two headlines and two hero images. MVT creates four combinations: Headline 1 + Image A, Headline 1 + Image B, Headline 2 + Image A, Headline 2 + Image B. Traffic is split across all four.

The benefit is finding the best combination without running four separate sequential tests. The downside is traffic dilution: more combinations means each version gets a smaller slice of traffic, which means it takes longer to reach a reliable result.

This is why MVT is better suited for high-traffic pages. On a low-traffic site, running multivariate tests is like spinning up a four-node Kubernetes cluster to host a static HTML page. Technically possible. Practically painful.


If you are just getting started, stick to A/B tests until you have enough traffic and enough process confidence to justify MVT.

Press enter or click to view image in full size
![](https://miro.medium.com/v2/resize:fit:1400/1*PKEclMIEyvYT6jZHv4qndQ.png)

### Confused between Split URL and Multivariate?
Here’s the crude example:

**Split URL Testing: The Ambitious Caterer**

This caterer is not making a variation of the existing menu. He has built two entirely separate stalls on opposite ends of the lawn.

Stall A is the traditional setup: biryani, raita, gulab jamun, done.

Stall B is the “fusion experience”: biryani bowls, deconstructed raita in shot glasses, and gulab jamun on a stick with a QR code to leave a Google review.

Half the guests are directed to Stall A and half to Stall B. You measure which stall has a longer queue, higher plate counts, and fewer people quietly throwing food in the dustbin.

This is a Split URL test. You are not tweaking one element on an existing page. You have built two completely different pages and you are routing real traffic to both to see which one works.

The infrastructure cousin of this is blue-green deployment. Same idea, different catering budget.

**Multivariate Testing: The Caterer Who Has Lost the Plot**

This person is testing:
- 2 types of biryani (chicken vs. mutton)
- 2 types of raita (boondi vs. cucumber)
- 2 types of bread (naan vs. rumali roti)
- 2 types of dessert (gulab jamun vs. rasgulla)


That is 16 combinations. You need 16 separate tables, each getting a different combination, and enough guests at each table to statistically prove which combination is the winner.

The wedding has 200 guests. You need at minimum 1,600 guests for the data to mean anything.

You have invited 200.
> You wont get that big venue on any of the wedding seasons, but lets just say… you did.

This is multivariate testing on a low-traffic website. The math does not work. The experiment runs for six months. By the time you have a result, the wedding is over, the couple has moved cities, and nobody remembers what the original research question was.

Run multivariate tests only when you have enough traffic that dividing it sixteen ways still leaves each slice statistically meaningful. Otherwise, stick to A/B.

### Heatmaps Are Research, Not Experiments

This was one of my early mental shifts, and it is worth being explicit about it.

A heatmap does not tell you what will win. It tells you what might be wrong.

Click heatmaps show where users are clicking (and where they are not). Scroll heatmaps show how far down the page users travel before leaving. Session recordings are anonymized playbacks of real user journeys, where you can watch someone hesitate over your pricing table, try to click something that is not a link, or abandon a form halfway through.

None of these tools give you a winner. They give you a hypothesis.

Here is how the workflow actually connects: you open a heatmap for your pricing page and notice that most users never scroll past the first fold. Your main CTA button is near the bottom. Now you have a possible problem and a possible hypothesis: “If I move the CTA above the fold, more users will see it and click it.” You run an A/B test to confirm or deny it.

The heatmap gave you the question. The A/B test gives you the answer.

That distinction matters because it stops you from treating research tools as decision-making tools. Heatmaps, recordings, analytics, and surveys help you decide what to test. Controlled experiments help you decide what to change.

### The Formula That Changed How I Think About All of This

**Success = Chance × Frequency**

Success is the number of winning experiments you produce in a year. Chance is your win rate, the percentage of experiments that produce a meaningful positive result. Frequency is how many experiments you run per month.

Now run the numbers with me.

Team A wants every test to be excellent. They spend weeks on research, debate every design decision, and get thorough sign-off before anything ships. Their win rate is high, say 100%. But all that effort means they can only run one test per month. Twelve winners a year.

Team B is less precious about each individual test. Their research is decent but not exhaustive. Their win rate is only 25%. But they run eight tests a month. Twenty-four winners a year.

Worse hit rate. Double the output.

This is not an argument for carelessness. Bad experiments waste time, and random button-color testing is still random button-color testing. But it is a clear argument against perfectionism as a strategy. The team that ships eight decent experiments a month will outlearn and outperform the team that ships one perfect experiment a month, almost every time.

If this sounds familiar, it should. DevOps made the same argument against waterfall delivery years ago. Smaller releases, shipped more often, create faster feedback loops. You learn sooner, recover faster, and stop treating every release like a quarterly ceremony. CRO has the same rhythm: define the hypothesis, design a clean test, ship it, measure it, document the learning, and move on. The goal is not to win every test. The goal is to learn fast enough that your wins compound.

### A Note on Statistical Significance

Every testing tool gives you some version of a confidence percentage as your test runs. This tells you how likely it is that the result you are seeing is real and not just random variation. Most practitioners aim for 95% confidence before calling a winner.

But one of the most common beginner mistakes is stopping a test early because the numbers look exciting on Day 2. Early data is noisy. Weekday and weekend behavior can differ. Email campaigns, seasonality, and traffic source changes can all skew early results. A variant that looks like it is winning after 200 visitors may look very different after 4,000.

Let tests run for at least one full week, preferably two, before drawing conclusions.

And here is the question I now ask before trusting any result: not just “Did the tool say 95%?” but “Do I trust how we got to 95%?” The number matters. So does sample size, test duration, traffic quality, and whether the tracking was set up cleanly to begin with.

### What Should You Run First?

If this feels like a lot, start small. Here is the beginner loop I would follow:
1. Run an A/A test to confirm your measurement setup is reliable.
2. Pick one high-traffic page with a clear conversion goal.
3. Use heatmaps, session recordings, or analytics to find one point of friction.
4. Write a hypothesis using the “If I change X, then Y, because Z” format.
5. Run one clean A/B test.
6. Let it run long enough to collect meaningful data (at least one week).
7. Document what happened, win or lose.
8. Repeat.


That loop is what CRO actually is, more than any specific tool or technique. Observe, hypothesize, test, learn, repeat. The experiment types are just the mechanics. The real skill is building a habit of running the loop consistently, and gradually running it faster.

In the next post, I will get into prioritization: how to decide which test to run when you have more ideas than time, and how to build a backlog driven by data rather than whoever spoke loudest in the last meeting.

*I work with Convert.com and write about the intersection of DevOps and experimentation. If you are a technical person finding your footing in CRO, drop a comment or reach out. Happy to compare notes.*