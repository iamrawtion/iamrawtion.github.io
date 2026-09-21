---
title: "Disney Did It With Cartoons. My AI Did It With My Kid's Bedtime Story."
date: "2026-08-24"
category: "DevOps"
tags: ["AI Agents", "AI/ML", "DevOps", "Documentation"]
excerpt: "I saw a video a while back about old Disney animation and how they fooled viewers in the last couple of years. Same character movements, reused frame by frame,..."
author: "Roshan Nagekar"
---

![](https://media.licdn.com/dms/image/v2/D4D12AQFsiPhnNL8Zqw/article-cover_image-shrink_720_1280/B4DaA3JVSZGkAQ-/0/1787631594671?e=1791417600&v=beta&t=tZKbZ6PU8KGfioYNuJQSZC4LrlDEKYoScQ6u6quHo40)

I saw a video a while back about old Disney animation and how they fooled viewers in the last couple of years. Same character movements, reused frame by frame, across completely different characters and different movies. Different faces, different worlds, same underlying motion. It worked for years. Nobody noticed, or nobody cared, because the backgrounds and story kept changing enough to sell it. Here is the [video](https://www.youtube.com/watch?v=FQnXhVJhqjg&t=22s) I am talking about. This was deliberate for many reasons as you read more about it, you will know. Some reasons, I understood were, nostalgia, saving time or maybe laziness too.


  


            
        
    
I didn't think much of it until I saw the same thing happening with AI.


  


            
        
    
I was working on generating some images recently. I kept feeding new context, new prompts, expecting newer results. The first couple of images were just fine. Then I started noticing a pattern of same poses, same layouts, same compositions repeating underneath a different backdrop. Not identical, but close enough that it felt like the AI found something that worked and decided to stop being creative.


  


            
        
    
I told myself, okay, maybe that's fine for images. Then I tested it on something that mattered more.


  


            
        
    
I use AI sometimes to teach certain concepts to my kid. I asked AI to write a short story. It was about living and nonliving things. It came out lovely. She enjoyed it, I enjoyed it. All good, right?


  


            
        
    
The next day, I asked for a story about vertebrates and invertebrates. Same structure. Same pattern with just a bit of *find and replace* may be 😀. Practically the same story with a few words swapped out. If I had outsourced that to a person and gotten this back, I wouldn't have accepted it. And here's the thing, my kid is five. Even she would note this eventually. Kids get bored of the same story wearing a different costume faster than we think.


  


            
        
    
Now this is not about things impacting my personal work. The part that actually worries me is **documentation**.


  


            
        
    
I use AI heavily for documentation and writing. And I've caught the pattern there too. Same structure repeating article after article, same phrasing patterns, same rhythm, regardless of what the topic actually needs. It's  probably efficient. But it's also lazy. And I worry people will lean onto this instead of catching it, hand AI a rough context, ask for a full end to end document, and publish whatever comes back without questioning why every article somehow reads the same.


  


            
        
    
Here is what I found being the technical reason to be. This comes down to how models pick outputs. They default to the highest-probability path unless you push them elsewhere, so once a structure works well in one response, it becomes the easy option for the next, especially in the same session where earlier context keeps shaping what comes after. Lower temperature and conservative sampling, which most tools default to for reliability, make this worse on purpose. It's not laziness the way we mean it. it's optimization doing exactly its job: minimize risk, maximize consistency. **Creativity was never the objective**. Which is exactly why the paragraph-by-paragraph, keep-pushing-back approach works, it forces the model off the safe path it would otherwise default to.


  


            
        
    
When I see this happening, here's what works for me instead. Don't ask for the whole thing to be written or documented at once. Go paragraph by paragraph. Feed fresh context deliberately every time. Question, Argue and provide newer/better context every time. And at any time something feels repeated, say so. Tell it directly. That nudge matters more than people think, it's not just fixing one document, it's teaching the model what you don't want. Some would comment and ask to create a new session for improvement here. I agree with it, but how I and sometimes even you may work, sometimes we need the session memory to exist for various reasons, so we use the same sessions for a long time.


  


            
        
    
Disney may have eventually moved past reusing the same animation cycles. Or even if they re-used some, they had some valid reason like ‘nostalgia’. They could have even stopped doing this because audiences quietly noticed this and started expecting more, and also maybe that the reused motion stopped being good enough. I think we're also at the exact same point with AI generated content, whether that's documentation, images, or bedtime stories. It'll get away with repeating itself for a while. Until the audience notices. And audiences always notice eventually, even five year old ones will.


  


            
        
    
So if you're using AI for content, don't just accept the first draft's texture as final. Push it. Ask it to genuinely think differently, not just swap a few nouns. Creativity isn't AI's job to protect. It's ours.


  


            
        
    
#AIAgents #Documentation #ContentCreation #DevOps #CreativeWork


  


            
        
    
✏️ drafted with ai assist, because practicing what I preach.