---
title: "Docs as code. AI as author. Humans as reviewers. What could go wrong?"
date: "2026-05-08"
category: "DevOps"
tags: ["AI Agents", "Automation", "DevOps", "Documentation", "Knowledge Management"]
excerpt: "Last week we audited our company docs. 502 articles. 77 duplicates. Nobody knew which one was correct. And this wasn't because people were lazy. Everyone was..."
author: "Roshan Nagekar"
---

* 

 Last week we audited our company docs. 


  


            
        
    
502 articles. 77 duplicates. Nobody knew which one was correct. 


  


            
        
    
And this wasn't because people were lazy. Everyone was busy. Docs just... don't update themselves. 


  


            
        
    
So we started asking, what if an AI did this? 


  


            
        
    
What if instead of waiting for someone to update a document after a product change, an AI just does it automatically. Reads the release notes, finds the affected articles, rewrites them, sends a PR for human review. 


  


            
        
    
Sounds great right? 


  


            
        
    
It actually is. I genuinely think this is where documentation is going. Andrej Karpathy (the AI guy from Tesla and OpenAI) wrote about this — he called it the [LLM-owned wiki.](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) Humans write the rules. AI does the writing. Humans approve before it goes live. 


  


            
        
    
Clean. Simple. Scalable. 


  


            
        
    
But here's the thing nobody talks about. 


  


            
        
    
In our own test, the AI gave us wrong pricing information. confidently. Like it had no doubt. it cited some random blog as a source and we almost missed it. 


  


            
        
    
If we had set it to auto-approve, our customers would have read wrong info. 


  


            
        
    
So before you get excited and just "let AI handle the docs", ask yourself a few things: 


  


            
        
    

1. who is reviewing what the AI writes? (if its one person, you just created more work, not less)
2. what rules has the AI been given? does it know what it can and cannot touch?
3. Is someone watching it over time, or only at the start?


    


  


            
        
    
This is not about being anti-AI. I love where this is going. 


  


            
        
    
But we don't deploy code to production without monitoring, access controls and alerts. why would we treat our company's knowledge base any different? 


  


            
        
    
Automation without oversight is not progress. its just faster mistakes. 


  


            
        
    
The teams that get this right will build the guardrails first. then turn on the automation. 

What's your take — are you using AI for internal docs? how are you handling the review part? 

      ✏️ Drafted with AI assist, because practicing what I preach.*