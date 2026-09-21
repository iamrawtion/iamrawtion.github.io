---
title: "From a zip file in 2020 to an AI-powered wiki in 2026. Here's what happened in between"
date: "2026-06-24"
category: "DevOps"
tags: []
excerpt: "Someone on the team once asked about a feature deprecated back in 2020. 45 minutes of digging through backups, old slack threads, a google doc nobody had..."
author: "Roshan Nagekar"
---

*

Someone on the team once asked about a feature deprecated back in 2020.


  


            
        
    
45 minutes of digging through backups, old slack threads, a google doc nobody had touched in years, and the answer eventually showed up inside a zip file. Like a digital archaeological dig. Except less cool and more frustrating.


  


            
        
    
That moment made it clear to me that something needed to change. This post is about what the team figured out together.


  


            
        
    
**Part 1: An old hero called MDWiki**


  


            
        
    
Before getting to the AI part, here's a tool that ended up being central to the whole thing.


  


            
        
    
Years ago, there was a situation many people would remember. I was in a pilot batch at a new office location for an MNC. Fresh start, no internal tools, no documentation platform, no proper handover process. Knowledge transfer from HQ was slow, questions were piling up, answers were scattered everywhere.


  


            
        
    
MDWiki turned out to be the answer. Its an old tool, almost ancient by tech standards, but brilliant in its simplicity. plain markdown files in a folder, and it renders a full documentation site. no database, no server setup, no hosting complexity. just files.


  


            
        
    
Hosting it on OneDrive meant the whole company could sync it locally. suddenly every team had a shared wiki that worked offline, updated automatically when anyone saved a file, and needed zero infrastructure to maintain. Lightweight, fast, and it worked. sometimes old tools solve new problems better than anything shiny.


  


            
        
    
**Part 2: The scale problem every growing team eventually hits**


  


            
        
    
Fast forward to now. At a certain point, documentation at our company had simply outgrown the way it was being managed. Knowledge contributed by multiple team members over years. text files, images, screenshots, video recordings, architecture diagrams, slack conversations, meeting notes, product threads. Rich, honest knowledge built up over time by people who genuinely cared.


  


            
        
    
But here is what happens at scale. When knowledge lives across too many places, it becomes hard to navigate. some topics had multiple versions, each slightly evolved from the last. naturally, over time, some overlap crept in. This is not a people problem. Its a growth problem. every team that ships consistently runs into this. knowledge compounds faster than anyone can manually organise it.


  


            
        
    
And when someone moves on, a little undocumented context moves with them. not because they were careless, but because there was no system to capture it before it walked out the door. that gap needed closing, and honestly it was on us as a team to fix it sooner.


  


            
        
    
**Part 3: Andrej Karpathy walked in (virtually)**


  


            
        
    
That's when we came across Andrej Karpathy's LLM-Wiki idea. if you don't know Karpathy, he was a founding member of OpenAI and Tesla's AI director. when he writes something, the internet pays attention.


  


            
        
    
His idea is elegant. Stop treating your knowledge base as a place humans write into. treat it like a git repo. let the LLM own the writing layer. humans write exactly one file by hand, a schema file that defines the rules, structure, and conventions. Everything else? the LLM reads raw sources and builds the wiki, maintaining it as new content comes in.


  


            
        
    
The wiki becomes a persistent, compounding artifact. it gets richer with every source added. cross references are already there. contradictions get flagged. the synthesis reflects everything that has been added, not just the last thing someone remembered to update. Brought it to the team. We decided it was worth trying.


  


            
        
    
**Part 4: What we built together**


  


            
        
    
We combined LLM-Wiki with MDWiki and added a CI/CD layer on top. Here is how the whole thing works.


  


            
        
    
Three layers.


  


            
        
    
**Raw folder.** all source material goes here. old docs, slack exports, meeting notes, screenshots, video transcripts, architecture diagrams. untouched, immutable. source of truth.


  


            
        
    
[**CLAUDE.md**](http://CLAUDE.md)**.** the one file written by hand. it teaches Claude how MDWiki works, what the folder structure looks like, title formats, how to handle overlapping topics, what goes where, and when to flag something for human review instead of auto-placing it. the rulebook for the entire system.


  


            
        
    
**The wiki itself.** Claude reads whatever lands in the raw folder and writes, organises, and cross-links the markdown files in MDWiki format. every document lands in the right place, correctly formatted, connected to related pages.


  


            
        
    
And the most important part, the human review layer. Any team member can drop a document into the raw folder and raise a pull request on GitHub. a reviewer steps in before anything gets merged. they check:


  


            
        
    

- Is this information still accurate or has the process changed?
- Does this conflict with something already in the wiki?
- Is there any sensitive information, credentials, or customer data that shouldn't be here?
- Is this still relevant or does it describe something no longer in use?
- Does the framing match our internal style and audience?


    


  


            
        
    
Once the PR is approved, Claude adds the knowledge to the wiki, formats it for MDWiki, cross-links it with related content, and updates the index. A GitHub Actions pipeline deploys the whole thing to Google Firebase. every approved merge triggers a deployment. the team sees the updated wiki within minutes, no manual publishing needed.


  


            
        
    
**Part 5: The Guardrail reminder**


  


            
        
    
This one bears repeating, and it came from a hard conversation within the team early on. Claude has write access to the knowledge base. and we made sure it cannot merge its own PRs.


  


            
        
    
Not because we don't trust the model, but because nobody should. a recent research paper tested 19 LLMs on long document editing workflows and found that even the best models, GPT, Claude, Gemini, silently corrupt an average of 25% of content over time. not crashing, not warning anyone. just quietly getting things wrong as the workflow gets longer.


  


            
        
    
The human review step is not a formality. its the most load-bearing part of the whole pipeline. we almost skipped it to move faster. Glad we didn't. Automation without a review layer is not a knowledge base. its a very confident source of misinformation.


  


            
        
    
If you're building something similar or thinking through your own documentation architecture, drop a comment. happy to share more on the setup.


  


            
        
    
**Ref**


  


            
        
    

- [Karpathy's LLM-Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [MDWiki](https://dynalon.github.io/mdwiki/#!index.md)


    


  


            
        
    
#Documentation #DevOps #LLMWiki #KnowledgeManagement #GitHub #MDWiki #AIAgents #GitHubActions #Firebase


  


            
        
    
### Note for student readers


  


            
        
    
If you're in college and hunting for internships, stay with me for one more minute. This entire system works because of one thing: markdown. MDWiki renders it. Claude writes it. GitHub versions it. Firebase serves it. the whole pipeline has markdown at the center.


  


            
        
    
Markdown is not a niche skill. its the common language of documentation across DevOps, software engineering, product teams, and now AI pipelines. When you write a [README.md](http://README.md) on GitHub you're not just leaving notes for yourself. you're showing every hiring manager who lands on your profile that you think about the person coming after you. that's rarer than it sounds.


  


            
        
    
Most students push code and skip the README. don't be most students. Simplest thing you can do this week: go to your best GitHub project and write a proper [README.md](http://README.md). not just "this is my project." write what it does, what problem it solves, how to run it, and what you learned building it.


  


            
        
    
That one file will do more for your internship hunt than a fancy resume template. Markdown today. Opportunity tomorrow.


  


            
        
    
✏️ drafted with ai assist, because practicing what I preach.*