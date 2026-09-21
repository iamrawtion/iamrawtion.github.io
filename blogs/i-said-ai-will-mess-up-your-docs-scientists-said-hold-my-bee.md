---
title: "I said AI will mess up your docs. Scientists said hold my beer."
date: "2026-05-10"
category: "DevOps"
tags: ["AI Agents", "AI/ML", "Automation", "DevOps", "Documentation"]
excerpt: "Last week I wrote about why you shouldn't trust AI blindly with your documentation. I thought I was only being careful. Turns out, researchers just proved it,..."
author: "Roshan Nagekar"
---

* 

 

Last week [I wrote about why you shouldn't trust AI blindly with your documentation](https://www.linkedin.com/pulse/docs-code-ai-author-humans-reviewers-what-could-go-wrong-nagekar-qlb7c/).


  


            
        
    
I thought I was only being careful. Turns out, researchers just proved it, with actual numbers.


  


            
        
    
A [paper](https://arxiv.org/abs/2604.15597) dropped on arxiv last month(got posted in Hackernews yesterday). three researchers tested 19 AI models, gave them real document editing tasks across 52 different domains, coding, music, science, legal, you name it. And they just watched what happened over long workflows.


  


            
        
    
The results are not great.


  


            
        
    
Even the best models out there, GPT, Claude, Gemini, the ones we all use and trust, corrupted an average of 25% of document content by the end of long workflows. Is that 1 in 4 documents going silently wrong???


  


            
        
    
And here is the part that really got me. It didn't crash. it didn't say "hey I think I made a mistake."(It never does :) ) It just kept going. confidently. while quietly getting things wrong in the background. And the longer you let it run? the worse it gets.


  


            
        
    
Now here's the twist that I didn't expect.


  


            
        
    
Giving the AI more tools(which some debated earlier), making it a full agent with access to search, file systems, everything, didn't help. performance didn't improve. the corruption still happened.


  


            
        
    
Also, weaker models tend to just delete content. which is bad, but at least you can see it.


  


            
        
    
Stronger, smarter models? they don't delete. they corrupt. they change the meaning, subtly, in ways that look fine on the surface. that's actually scarier.


  


            
        
    
So last week when I said, build the guardrails before you turn on the automation, I wasn't just being cautious. now I have a research paper basically saying the same thing now.


  


            
        
    
Think about what this means for documentation specifically.


  


            
        
    
If your company is planning to let AI write or update your internal knowledge base, and you're thinking "its fine, we're using a good model", this paper is saying 25% of that content could be silently wrong before anyone even notices.


  


            
        
    
Not broken. not obviously wrong. just, quietly corrupted.


  


            
        
    
So who's building the review layer?


  


            
        
    
Because based on this research, the AI definitely isn't going to tell you it made a mistake.


  


            
        
    
You can read the paper here : [https://arxiv.org/abs/2604.15597](https://arxiv.org/abs/2604.15597)


  


            
        
    
#AIAgents #Documentation #LLMs #KnowledgeManagement #AgentGovernance #DevOps


  


            
        
    
✏️ Drafted with AI assist, because practicing what I preach.*