---
title: "Part 3: How to Decide Which CRO Test to Run First"
date: "2026-07-24"
category: "DevOps"
tags: ["A/B Testing", "Administration", "Agent Governance", "AI Agents", "Analytics", "AI/ML", "Automation", "CRO", "CRO", "Marketing", "Sales"]
excerpt: "BECAUSE THE LOUDEST IDEA IN THE ROOM IS NOT ALWAYS THE BEST EXPERIMENT. In the last post, I wrote about the main experiment types: A/A, A/B, Split URL, and..."
author: "Roshan Nagekar"
---

## Because the loudest idea in the room is not always the best experiment.

In the last post, I wrote about the main experiment types: A/A, A/B, Split URL, and multivariate testing. I also introduced the formula that quietly changed how I think about experimentation:

**Success = Chance × Frequency**

Once that clicked, I assumed the next step would be simple.

Pick an idea > Run a test > Measure it > Repeat.

Then I actually tried to do it. Because once people around you start thinking in CRO terms, ideas come from everywhere.

The designer wants to test the hero image. The founder wants to rewrite the pricing page because “it does not feel premium enough.” Someone from sales heard that a competitor changed their CTA and now wants to copy it immediately. Someone read a blog at midnight and suddenly wants to add a chatbot, a quiz, a floating banner, and possibly a dancing mascot.

Before you know it, your experiment backlog looks like a Jira board after a chaotic sprint planning session.
- Lots of tickets.
- Very little structure.
- Everyone convinced their idea is the one that will change the company’s destiny.


This is where prioritization comes in. Not because prioritization makes you smarter, but because it protects the experimentation program from becoming purely opinion-driven. And in CRO, opinions can multiply faster than credit card debts.

## The Hidden Cost of Running the Wrong Test

At first, “let’s just test this” sounds harmless. CRO is about experimentation, right? Just run everything. But every test has a cost.

Even when the testing tool makes setup easy, a test still consumes traffic, time, design effort, analysis attention, and usually a couple of weeks of your roadmap. If your site has enough traffic to run two meaningful tests this month, and your backlog has twenty ideas, running the wrong two means you delayed the better ones. That is not a small cost.

This felt immediately familiar from Devops work. You do not deploy every feature request just because someone suggested it in a meeting with confidence and a nice slide deck. You triage. You look at impact, risk, effort, dependencies, and what the system is actually telling you before you start making changes.

CRO needs the same discipline. An idea is not valuable because it sounds smart in a meeting. It becomes valuable when it is connected to evidence and scored against other ideas in the backlog.

## The HiPPO Problem

Before getting into frameworks, there is a force you need to understand. It quietly kills many CRO programs. It is called the **HiPPO**: the **Highest Paid Person’s Opinion**. Every team has one. In fact there is a rude saying about opinions. “Opinions are like…” (*well… Google it*)

The senior leader who says, “I think the button should be green,” and suddenly the next sprint is about button colors. The founder who saw a competitor’s landing page and wants to rebuild yours to match it by Thursday. The VP who has “a feeling” about the checkout flow. The stakeholder who says, “Can we just test it?” in the same tone people use before creating six months of technical debt.

To be fair, these inputs are not useless. People close to the business often have genuine intuition worth exploring. Sales teams hear objections. Support teams hear confusion. Founders understand positioning. Product teams know what users struggle with. The problem is not the idea. The problem is when the idea skips the queue without being scored.

In DevOps, we do not prioritize incident response based on who is shouting loudest in Slack. At least, we should not. We prioritize based on system impact and what the metrics are actually saying.

CRO needs the same structure. A prioritization framework is your polite defense against the HiPPO.

You are not saying: “No, your idea is bad.”

You are saying: “Great, let’s score it the same way we score everything else. If it ranks high, it goes first.”

That small shift changes the conversation. The framework depersonalizes the argument. The number does the heavy lifting. Very convenient, because numbers do not get awkward in meetings.

## Start With the Funnel, Not the Idea

Before scoring individual test ideas, figure out where to look first. Not every page deserves equal attention. A page with very little traffic will take forever to produce statistically meaningful results. A page with high traffic but no meaningful business impact may still not be worth optimizing ahead of a page that sits directly in the conversion path.

Press enter or click to view image in full size
![](https://miro.medium.com/v2/resize:fit:1400/1*SdrqHf6x3P9zjNXl-qs0hA.png)
So before asking: “What should we change?” ask, “Where are we losing people?”, and then. Map your funnel.

For an e-commerce site, it might look like this:

Landing page > Product page > Cart > Checkout > Purchase

For SaaS, it might look like this:

Homepage > Pricing page > Signup > Activation > Paid conversion

For lead generation, it might look like this:

Landing page > Form view > Form start > Form submit > Qualified lead

Then look at where the biggest drops are happening. If 70% of users are abandoning at checkout, testing a homepage headline is probably not the first move.
- It might be interesting.
- It might even win.
- But it is probably not where the biggest leak is.


Analogy in DevOps: If the database is causing 90% of your latency, shaving 20ms off a frontend asset is not the priority. Sure, the frontend improvement may look nice in a performance report. But the database is still sitting there like an overloaded elephant in the server room.

Find the bottleneck first. Then fix it. In CRO, high-traffic pages close to revenue, signup, checkout, or lead generation are your hot paths. Start there.

**Small disclaimer:** *Read at your own risk. This may make you hungry*

## The Two Frameworks: ICE and PIE

Once you know which pages to focus on, you need a way to score the ideas sitting in your backlog. Two common prioritization frameworks in CRO are **ICE** and **PIE**. Both are simple, both use overlapping dimensions and both are easier to remember if you stop thinking about frameworks and start thinking about food. Which, honestly, improves most business concepts. ;)

## ICE: Ordering Food at Midnight

ICE stands for:
- **Impact**
- **Confidence**
- **Ease**


Think of ICE as ordering food on delivery app at 11 pm. You are hungry. You are tired. You are already in bed. This is not the time for adventure. You are not trying to discover a hidden culinary gem. You are trying to avoid sleeping angry. You see a biryani place.

Before you tap “Order,” three thoughts happen automatically.

First:

**“How good is this actually going to be?”**

If it is bad biryani, why bother?

That is **Impact**.

Second:

**“Can I trust this place right now?”**

Will it arrive hot, on time, and with raita? Or will it arrive cold, late, and missing the one thing that emotionally holds the whole meal together? You check the rating, reviews, delivery time, and whether someone recently complained that they received only rice and sadness.

That is **Confidence**.

Third:

**“How easy is this?”**

Is the restaurant open? Is delivery available? Will it reach in 25 minutes, or will the app say “arriving soon” until you lose hope? Will it ask you to verify your phone number again even though it has known you for five years?

That is **Ease**.

ICE is practical and slightly paranoid. It wants evidence before committing.

In CRO terms:

**Impact** asks: If this test wins, how much could it move the business?
**Confidence** asks: How sure are we that this is a real problem worth testing?
**Ease** asks: How difficult will this be to build, QA, launch, and analyze?

Score each dimension from 1 to 5. Then average the three. The highest-scoring ideas usually go first. ICE works especially well when you already have research data: heatmaps, recordings, analytics, surveys, support tickets, or past experiment learnings. Low confidence should lower the score, no matter how exciting the idea sounds.

Because “I saw this on a competitor site” is not research. It is browsing with ambition.

## PIE: Choosing What to Order When You Have Options

PIE stands for:
- **Potential**
- **Importance**
- **Ease**


Now stay in the same food delivery app. You are still hungry. It is still 11 pm. You still should have eaten earlier like a responsible adult, but here we are. This time, you are not evaluating one biryani place. You are deciding what category of food deserves your attention first.

Biryani? Pizza? Rolls? South Indian? Chinese? That one “healthy bowl” option you add to cart and then remove after seeing the price? PIE helps you decide where the biggest opportunity is.

First:

**“How good could this get?”**

Could this be the kind of meal that fixes your mood, your evening, and possibly your belief in humanity?

That is **Potential**.

Second:

**“How important is this meal?”**

Is this a casual snack, or have you skipped dinner and now your stomach is sending production-level alerts?

That is **Importance**.

Third:

**“How easy is it to get?”**

Is it nearby and deliverable in 25 minutes, or is the restaurant far away, closing soon, and likely to cancel after making you wait?

That is **Ease**.

PIE is more optimistic than ICE.

ICE asks, “Can I trust this specific choice?”

PIE asks, “Where is the biggest opportunity?”

In CRO terms:

**Potential** asks: How much improvement could this page or funnel step realistically have?
**Importance** asks: How valuable is this page or funnel step to the business?
**Ease** asks: How simple or difficult is the test to implement?

PIE is useful when you are comparing broader areas of opportunity.

For example, if you are deciding whether to focus on the homepage, pricing page, checkout, signup form, or onboarding flow, PIE can help you decide where the biggest opportunity may be.

So, in food delivery terms:

**ICE helps you decide whether to trust one restaurant.
PIE helps you decide which food category is worth exploring first.**

## ICE vs PIE: The One-Line Difference

Press enter or click to view image in full size
![](https://miro.medium.com/v2/resize:fit:1400/1*Icx99EiSjuUCFd1txFziLA.png)
Here is the easiest way I remember them:
1. ICE helps you decide whether to trust one restaurant. PIE helps you decide which food category is worth exploring first.
2. ICE is about confidence. Can I trust this specific option to deliver? PIE is about opportunity. Which area has the biggest upside if I focus there? Same food app. Different thinking.
3. With ICE, you are asking: “Should I order from this biryani place?” With PIE, you are asking: “Should I even be looking at biryani first, or is pizza, rolls, South Indian, or Chinese the better opportunity tonight?”
4. Both end with Ease, because nobody wants unnecessary complications at 11 pm. Especially not when they are hungry and the app is already saying, “Restaurant is closing soon,” like it is adding pressure to your life.


## Which Framework Should You Use?

Use **ICE** when your team already has research data and wants to prioritize based on evidence. ICE is useful when you are evaluating a specific hypothesis. For example:

“Should we move the CTA above the fold on the pricing page?”


You already have heatmap data. You know users are not scrolling far enough. You want to know whether this specific idea deserves to be tested next. That is ICE.

Use **PIE** when you are earlier in the process and still deciding where the biggest opportunity is.

For example:

“Should we focus on the homepage, pricing page, checkout flow, signup form, or onboarding?”

That is PIE.

At Convert.com, the Compass feature includes both PIE and ICE inside the hypothesis builder. When you create a new hypothesis, you can choose a framework, score each dimension on a scale of 1 to 5, and use that score to sort your backlog.

That helps because the score becomes visible to everyone. It is much harder to push your pet idea to the top when the number is sitting right there on the screen, judging you quietly. A visible score is like the delivery rating on a food app. You can still order from the suspicious restaurant. But now everyone can see that it has 2.3 stars and seven reviews mentioning “never again.”

## Turn Ideas Into Hypotheses Before You Score Them

Press enter or click to view image in full size
![](https://miro.medium.com/v2/resize:fit:1400/1*kJU7bp0I3BglGj0lNOu8Rw.png)
One thing both frameworks require is that your ideas are written properly before scoring.

“Change the button color” is not a hypothesis.

“Move the CTA above the fold” is not a hypothesis.

“Make the page look more premium” is definitely not a hypothesis.

That is a mood.

A proper hypothesis looks like this:

**If I change X, then Y will happen, because Z.**

The “because” is the most important part. Without it, you are not testing an assumption. You are just making a change and hoping the graph goes up, which is basically the CRO version of deploying to production and whispering, “Please work.”

Or, to stay with the food delivery analogy, it is like ordering from a restaurant with no ratings because the photo looked nice. Could it be amazing? Maybe. Could it be regret in a plastic container? Also maybe.

For example:

**If we move the main CTA above the fold on the pricing page, more visitors will start the demo request flow, because heatmaps show most users are not scrolling far enough to see the current CTA.**

Now you have something worth scoring.

You know:
- The page
- The change
- The expected outcome
- The evidence behind it


Even if the test loses, you learn something specific. A backlog full of vague ideas becomes a dumping ground. A backlog full of hypotheses becomes a learning system.

Or in food terms:

“Order something nice” is not useful.

“Order from a highly rated nearby restaurant because delivery time is low and reviews mention fresh food” is much better.

Specificity saves you from bad decisions. And occasionally, bad paneer.

## The One Thing ICE and PIE Get Wrong

ICE and PIE are useful, but they share a blind spot. They often treat every idea as if it exists in a vacuum. But it does not.

Every idea exists inside the history of your previous tests. If you have run five tests on your pricing page and four of them lost, your confidence score for the next pricing-page idea should reflect that history. Something on that page may be resisting your assumptions.
- Maybe the traffic quality is different from what you expected.
- Maybe the real problem is upstream in the funnel.
- Maybe people already understand the pricing page, and the actual friction is in signup.
- Maybe your pricing page is innocent and has been framed by bad hypotheses.


The same applies to food delivery. If you have ordered from the same restaurant four times and three times they forgot the raita, you should not treat the fifth order like a fresh mystery.

You have history. Use it. Past experiment results should feed into how you score new ideas. They should not sit inside a spreadsheet named something like: final_results_v3_really_final_updated_NEW.xlsx

This is why documentation matters as much as the framework itself.

After every experiment, write down:
- The hypothesis
- The result
- The confidence level
- The primary metric
- The key learning
- What it suggests about the next test


Even a losing test is useful if it tells you where not to look. Without this history, your backlog resets to zero every quarter. With it, your scoring gets more accurate over time because you are building a picture of what your specific audience actually responds to. A CRO backlog without documentation is like a food app that forgets every bad order you ever had. You keep making the same mistake. And somehow, the raita is still missing.

## What to Do When Everything Scores the Same

Sometimes three ideas all score 4.2 and suddenly you are back in the same argument. This is normal. Frameworks help, but they do not eliminate judgment. A few tiebreakers can help. Pick the page with the most traffic. More visitors usually means faster results and less time waiting for statistical significance.

In food delivery terms, this is like choosing the restaurant with enough recent orders and reviews. If only two people have ordered from it since 2021, the rating may not tell you much.

Pick the test that is fastest to build. A high-scoring idea that takes three weeks of development work may be worth doing after a slightly lower-scoring idea you can ship in a day. Remember the frequency side of the success formula.

This is the difference between ordering something that arrives in 25 minutes and choosing a dish that says “preparation time: 95 minutes.”

Technically, it may be great. Emotionally, you may not survive. Pick the test that teaches you the most regardless of outcome. Learning value is underrated. A test that answers a fundamental question about your audience is worth more than a test that optimizes something already working reasonably well.

In other words, do not only ask:

**“What might win?”**

Also ask:

**“What will we learn even if this loses?”**

That question saves a lot of time. And occasionally, a lot of ego.

## Define Success Before You Launch, Not After

One mistake that shows up in beginner backlogs is choosing the primary metric after the test has already started. That is dangerous. If you look at enough metrics, something will always appear to have improved.
- Clicks went up.
- Scroll depth changed.
- Form starts increased.
- Time on page looked different.
- Someone in Nebraska spent 14 minutes reading the footer.


But what was the experiment actually supposed to improve? Every test needs a primary metric before launch.
- Demo requests.
- Purchases.
- Trial signups.
- Form completions.
- Revenue per visitor.


Pick one. Commit to it. Let that metric make the call. This is like deciding what “good food” means before ordering. Are you optimizing for taste? Delivery speed? Price? Portion size? Not waking up with regret? If you decide after the food arrives, you can justify anything.

“The biryani was cold, but the container was sturdy.”

That is not success. That is coping. You can still watch secondary metrics for learning, but the decision should rest on the primary one. And alongside your primary metric, define your guardrail metrics. These are the things you are not directly trying to improve, but cannot afford to break. For example:
- If you are optimizing demo signups, lead quality should not drop.
- If you are optimizing checkout completion, average order value should not fall.
- If you are optimizing form completion, spam submissions should not explode.
- If you are optimizing clicks, downstream conversions should not suffer.


This is the CRO version of SLOs. You define what success looks like and what failure looks like before you are emotionally invested in the outcome. A test that increases clicks while damaging qualified leads is not a win. It is noise wearing a party hat.

Or in food delivery terms: A restaurant that delivers in 12 minutes but sends the wrong order did not “win on speed.” It failed dinner.

## A Practical First Backlog

If you are starting from zero, here is the workflow I would follow.
- Map your funnel and identify the biggest drop-off point.
- Use heatmaps, session recordings, analytics, surveys, and any sales or support feedback you can access.
- Write down every test idea without judging too early.
- Convert each idea into a proper hypothesis using the “If X, then Y, because Z” format.
- Score each one using ICE or PIE.
- Pick one high-scoring, reasonable-effort test.
- Define the primary metric and guardrail metrics before launch.
- Run the test.
- Document the result and the learning.
- Then re-score the backlog based on what you now know.


That last step is what most teams skip. And it is what separates a backlog that compounds from one that stagnates. A CRO backlog should not be a parking lot where ideas go to quietly disappear. It should be more like a living system.

Or, to stay on brand, a well-maintained CI/CD pipeline for learning. Every test should make the next decision smarter. Just like every food order teaches you something.
- Restaurant is reliable.
- Delivery is slow on weekends.
- The “extra spicy” option is not a personality test you need to pass.
- Never trust a place where every menu item has the same stock photo.


Learning compounds when you write it down.

## The Real Takeaway

Prioritization is not about finding the cleverest idea. It is not about the biggest redesign. It is not about the most senior opinion in the room. It is about running the tests that have the best combination of meaningful impact, strong evidence, reasonable effort, and clear learning potential. Done consistently, this turns CRO from a collection of random experiments into a learning system. You find the biggest leaks, collect evidence, write hypotheses, score ideas, run the most valuable tests first, document what happened and then repeat.

The DevOps parallel is hard to miss. Good infrastructure teams do not just ship more changes. They improve how they decide what to change, how they measure it, and how they learn from it.

Good CRO teams do exactly the same thing. And the food delivery parallel is also hard to miss. The goal is not to order everything on the menu. The goal is to make better choices each time, based on what you know, what matters, what is realistic, and what you learned last time.

That is prioritization.

In the next post, I want to go deeper into reading results without fooling yourself: statistical significance, confirmation bias, and why the most dangerous moment in CRO is when a test is almost winning.

I work with Convert.com and write about the intersection of DevOps and experimentation. If you are building your first CRO backlog or trying to move your team away from opinion-driven testing, drop a comment or reach out. Happy to compare notes.