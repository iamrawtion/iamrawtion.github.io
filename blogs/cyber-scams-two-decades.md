---
title: "From a Million-Dollar Yahoo Lottery to AI Deepfakes: My Two Decades of Encounters with Cyber Scams"
date: "2026-09-30"
category: "Security"
tags: ["Security", "Phishing", "Social Engineering", "AI/ML", "Cybersecurity", "Scams"]
excerpt: "How a fake lottery email in 2007 sparked my curiosity about cybersecurity, and why I now worry more about AI-powered scams than ever before."
author: "Roshan Nagekar"
---

![Cybersecurity and online scams](/images/blog-images/cyber-scams-two-decades/cyber-scams-header.jpg)

Back in 2007, I had just finished high school. Yahoo Mail was my primary email account and the idea of winning a million dollars was enough to make my day.

Little did I know that one suspicious email would begin a nearly two-decade fascination with cybersecurity, social engineering, and the surprisingly creative ways people try to steal your money.

## The Million-Dollar Lottery That Started It All

An email landed in my inbox: my Yahoo address had won a million dollars.

For a teenager who had just finished high school, that was an unimaginable amount. I replied asking how to claim it. They asked for my PAN card to process the reward. I sent a scanned copy.

A few days later they sent an official-looking reward letter — with my name, my details, and my photograph cropped straight from the PAN card and pasted in.

That was my first real red flag. If a legitimate institution were processing a million-dollar payout, wouldn't they ask for a photograph separately rather than copy-pasting from a government document?

I copied a sentence from their email into Google. Same message, word for word, in discussions about lottery scams. My million dollars had never existed.

They sent a few follow-up emails warning my winnings would expire. I ignored them. But one thing stayed with me: they now had a copy of my PAN card. I decided to report it if I ever spotted misuse. Fortunately, I never did.

**The lesson:** urgency, extraordinary rewards, and requests for identity documents are warning signs worth investigating before you respond.

## Password Security, the Hard Way

Not long after, I received a prank email promising to calculate compatibility with my girlfriend. I clicked, entered a name, and a laughing cartoon appeared. The name had been emailed to whoever sent the prank.

I panicked — and then did something I definitely wouldn't recommend today. I guessed my friend's Yahoo password using personal details I knew about him, found the embarrassing email in his inbox, and deleted it.

It was wrong, even if I was a teenager escaping a prank. But it was my first real encounter with how weak passwords expose private information.

A few years later, I needed old bank statements for a loan application. Every PDF was password-protected, and the password was my account number — which I no longer had. So I taught myself to write a Bash script using a Linux brute-force tool against my own files. Several hours on an ordinary desktop PC later, I had the account number.

Both incidents taught the same thing: **password protection is only as strong as the password itself.** A predictable value derived from known information isn't meaningful protection.

## Scams That Don't Need a Single Line of Code

![Phishing and social engineering attempts](/images/blog-images/cyber-scams-two-decades/phishing-email.jpg)

Over the years I watched scams move from email to online marketplaces, social media, and WhatsApp. None of the most effective ones required technical skill.

**The OLX fake payment.** I listed something for sale and immediately received a call from an unusually eager buyer. They sent a payment link and asked me to click it to receive money. I didn't. But many people did.

**The fake Army officer.** A common rental scam: someone posing as an Indian Army officer contacts a landlord, agrees to every condition, then claims to have accidentally transferred ₹30,000 instead of the agreed ₹3,000. An SMS appears to confirm it. They call in a panic asking for the ₹27,000 "extra" back immediately. The original transfer never happened. The landlord sends real money chasing a fake one.

**Social media impersonation.** A fraudster downloads someone's profile photo, creates a second account with the same name, and sends friend requests to their contacts. Once accepted, they ask for urgent money. Sometimes they compromise the real account and message directly from it — making the deception almost impossible to detect.

I started posting warnings about these on my WhatsApp status. What surprised me was how many elderly relatives and acquaintances called asking how to enable MFA on their accounts. Those conversations probably mattered more than any security presentation I've given.

## Email Spoofing, Authority Scams, and the Gift Card Director

During an internship, I was learning to configure Mutt, a command-line email client. I accidentally sent a message to myself with the wrong From address. It arrived. Curious, I tried sending one with `bill.gates@microsoft.com` as the sender. That arrived too, in spam.

That experiment explained something I'd wondered about since 2007: why did that lottery email ask me to reply to a completely different address? Because the From address was fabricated. The displayed sender isn't proof of origin.

Years later, teaching as a visiting professor, I received an email appearing to come from my college's director. Urgent request: purchase Apple or Amazon gift cards immediately for an important transaction and claim reimbursement later.

The story made no sense. Educational institutions don't work that way. I didn't buy the gift cards.

The pattern — authority, urgency, an unusual request that bypasses normal channels — is one of the most reliable signals that something is wrong.

## When the Voice on the Phone Is AI

![AI deepfake and voice cloning technology](/images/blog-images/cyber-scams-two-decades/ai-deepfake.jpg)

My friend works in IT. He received what appeared to be an email from his CEO asking him to urgently purchase gift cards for a business transaction. He completed it. The money was gone before he understood what had happened.

Working in IT doesn't make someone immune to social engineering. Fraudsters target human behavior — our tendency to respond quickly to authority, especially when a request sounds urgent.

But that was still just email. What concerns me far more is what comes next.

A CEO who appears in interviews, podcasts, and webinars has hours of publicly available voice recordings. AI tools can now generate convincing voice clones from that material. In 2024, a finance employee at the engineering firm Arup was deceived into transferring approximately HK$200 million — around US$25 million — after a video conference in which the "CFO" and several colleagues appeared on screen. They were entirely AI-generated.

We spent years telling people: don't trust suspicious emails, call and verify. But what do you do when the voice on the phone sounds exactly like your boss? What do you do when you can see your boss's face in a video call?

The other version of this that frightens me more is personal. We all upload videos to Instagram, Facebook, and WhatsApp. Our voices and faces are out there. A scammer could use that material to impersonate not your CEO — but your child, your spouse, your parent. Imagine a phone call from your son's voice, sounding frightened, asking for money urgently. That is not science fiction. It is happening.

Digital arrest scams are a related threat: fraudsters impersonating police officers, placing victims on video calls for hours, threatening criminal consequences unless money is transferred immediately. There is no legitimate process in India where police place someone under "digital arrest" over a video call and demand payment. But add a convincing AI-generated uniform and a fabricated police station background, and the terror that induces is real.

## What Nearly Two Decades Taught Me

The technology changed dramatically. The manipulation didn't.

A teenager might respond to the promise of a million dollars. A landlord might trust someone claiming to be an Army officer. An employee might obey an urgent request from a supposed CEO. A parent might transfer money after hearing their child's frightened voice.

The scam that works in 2026 is still exploiting the same things the 2007 lottery email exploited: excitement, fear, trust, and urgency.

A few habits that genuinely help:

- **Verify financial requests through an independent channel.** If someone unexpectedly asks for money, call them back on a number you already have — not the one they gave you.
- **Never trust a payment SMS alone.** Check your actual bank balance before believing a transfer happened.
- **Enable MFA on email, banking, and social media.** Authenticator apps are stronger than SMS codes.
- **Use unique passwords.** A password from one breach shouldn't unlock your other accounts.
- **Create a family verification phrase.** Agree on a private question that proves identity during an unexpected emergency call.
- **Report fraud quickly.** In India, call 1930 or report at cybercrime.gov.in.

And if you encounter a scam or fall for one: talk about it. Share it. The person who hears your story might recognize the same pattern before it costs them something.

## The Next Scam May Not Look Like One

That first lottery email was easy to spot once I looked carefully. Badly written, poorly executed, copy-pasted photograph.

Today a scammer might write a perfectly convincing message in your language, impersonate your closest friend using their social media photos and voice, or appear on a video call looking and sounding exactly like someone you trust.

The most dangerous part is that the obvious warning signs we spent years learning to identify may simply not be there.

And to think — all of this started because a teenager with a Yahoo email address thought he'd won a million dollars.
