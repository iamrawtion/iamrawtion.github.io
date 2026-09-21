---
title: "Documentation Drifts. Here's How to Catch It."
date: "2026-08-05"
category: "Linux"
tags: ["Administration", "AI Agents", "AI/ML", "DevOps", "Documentation"]
excerpt: "\"Documenting the documentation.\" Yes, I know how that sounds. Documentation about documentation about documentation. Somewhere an intern is crying. Actually..."
author: "Roshan Nagekar"
---

![](https://media.licdn.com/dms/image/v2/D4D12AQHeV-rLfe973A/article-cover_image-shrink_720_1280/B4DZ_V6cnZHEAQ-/0/1786000304165?e=1791417600&v=beta&t=SXnvYnxcECyQkb-UvrjLyATdQytY-hlt4N3jfoezGAg)

"Documenting the documentation."


  


            
        
    
Yes, I know how that sounds. Documentation about documentation about documentation. Somewhere an intern is crying. Actually that's the phrase that hit me mid-conversation yesterday.


  


            
        
    
In DevOps we talk about monitoring the monitoring system. You don't just set up alerts and walk away. You watch the watcher too, because if your monitoring breaks silently, you find out the hard way. We handle it mostly by using a 3rd party monitoring Saas tool or a completely different monitoring tool that is on a different infra to monitor our monitoring. Many a times, we also setup multiple monitoring tools to monitor each other.


  


            
        
    
Turns out documentation has the exact same blind spot, that I realized yesterday.


  


            
        
    
Here's the problem. Documentation itself isn't static, but the system around it should be. A proper guideline of how the docs should look consistent across.


  


            
        
    
Think about what happens with two or three writers on the same knowledge base. 


  


            
        
    

1. One person is deeply technical, every article turns into a dense reference doc.
2. Another writes for humans first, simple language, easy to follow, but a senior engineer might find it too light.
3. A third writes in a fun, engaging tone that people love reading but that doesn't actually answer the question they came for.


    


  


            
        
    
None of these people are wrong. But put them in the same wiki with no shared rules, and the documentation stops looking like one system. It may end up looking like three different people arguing.


  


            
        
    
That's what documenting the documentation fixes. Not the content. The structure around the content. Heading formats. Whether an index is required. How many bullets before it's too many. Screenshot rules, including the boring but important one, don't reveal internal or customer details in a screenshot(Nothing says 'security incident' like a screenshot where someone forgot to close the tab with the customer PI sitting right there). Whether emojis are fine or banned. Which kinds of diagrams are expected. Small decisions, but decided once, so nobody has to reinvent them article by article. Is humor ok. How much humor is ok? Procedure to build the context, etc.


  


            
        
    
Two things break without this:


  


            
        
    

1. When someone leaves the team, whoever replaces them has nothing to stand on. No rulebook, no shared style, just vibes and old examples to guess from.
2. Even with the rules written down, you can't assume people will keep following them. Rules you hand someone on day one quietly erode by month six. Rules handed over on day one have a shelf life shorter than office milk.


    


  


            
        
    
So the system needs an audit layer too. Not a one-time handoff. A recurring check.


  


            
        
    
This is where it gets easier than it used to be. You write your rules once, in something like a [CLAUDE.md](http://CLAUDE.md), plain and specific. Then you let AI do the boring, repetitive part; scan every new article, and periodically scan the old ones too, and flag anything drifting from the standard. Wrong heading structure, missing index, a screenshot that shouldn't be there, tone that's drifted too casual or too dense. The AI doesn't decide what's true. It checks what's consistent. Humans still review before anything changes.


  


            
        
    
Monitoring the monitoring system caught on in DevOps because someone finally said the obvious thing out loud, watch your watchers. Documentation needs its own version of that sentence.


  


            
        
    
Document the documentation. Then audit it like you mean it.


  


            
        
    
#Documentation #DevOps #KnowledgeManagement #AIAgents #TeamProcess


  


            
        
    
✏️ drafted with ai assist, because practicing what I preach.