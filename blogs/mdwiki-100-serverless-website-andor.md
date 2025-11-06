---
title: "MdWiki : 100% Serverless Website and/or Documentation tool"
date: "2017-11-30"
category: "Cloud Computing"
tags: ["Documentation", "JavaScript", "Serverless", "Webpage", "Wiki"]
excerpt: "I recently joined a new firm and the best part was that the entire setup was just a month old. The company has setup a new technology center in Pune..."
author: "Roshan Nagekar"
---

I recently joined a new firm and the best part was that
the entire setup was just a month old. The company has setup a new
technology center in Pune and I was among the 1st 100 employees. Now we
are more than 1000. Isn't that great!!

After I joined, a series of knowledge transitioning
sessions were setup. There was huge chunks of information coming up in
and the handmade notes went on growing up. I realized the team members
were using notepads, word, emails, sticky notes and every single day
with more and more notes content was getting difficult to manage. Since
the setup was new, a wiki tool was yet to be distributed. There were so
many business verticals and each used their own tool. We were told its
going to take a while for more people to join and the teams to onboard
after which the wiki tools, ticketing tools, etc will be setup.

But what happens till then? New members were joining and
they were as curious as I was to learn about the company and its
infrastructure, the product, architecture, market, user base, tech stack
and everything.

I realized that until we have a wiki tool it may get too
late to pass information to newer members and with time I may even
forget the locations and purpose of the documents made and supplied. The
best solution was to host a wiki of my own. But...

Problem1:

I wont get a server. The accesses were very limited to read-only for now. Waiting for a server to be granted and then to host a wiki would take too long. I decided to get a serverless wiki on a shared platform till then.

There were 2 shared platforms for us. Shared drive that
was accessible in office premises and individual Box(cloud hosted) accounts for
everyone that could be accessed anytime from anywhere. I chose the later
to host the wiki solution.

Problem2:

Now, I needed a solution that should be easy enough to
update collaboratively. I thought of HTML pages, but that still would
need people to learn HTML scripting. My whole team has sysadmins in it.

I then came up with Markdown language. Its syntax of
note making makes documentation super easy. You don't need to learn any
language to do this. I liked the idea. I thought, **github**/**gitlab** would be
the best place to host and write documentation. It will be a
collaborative platform too. I decided on markdown as the tool to write
and **gitlab** for hosting.

Problem3:

When I suggested the idea to the team, we had compliance
and infosec members who suggested not to go with this since **gitlab**
server must be hosted on companies server only and must have proper
authentication flow, which we still did not have access for.

I looked out for options to have a serverless repository
setup to host on BOX but couldn't find much help. I thought about
markdown for a minute. How does **github**/**gitlab** manages to make markdown
presentable in webpage. There must be some way. **Javascript** was the
answer!!

Bang!! **Javascript** web templates with markdown was the next search and here comes "MDWiki".

MDWiki is a 100% serverless webpage hosting solution for
documentation. **JavaScript** takes care of the control and
configuration of the webpage. HTML CSS inside takes up the presentation with multiple **JavaScript** based gimmicks(plugins) that help you in easier navigation and nice GUI. Users may only worry about documentation.  
  

## Setup

[MDWiki](**http**://dynalon.**github**.io/mdwiki/#!index.md) is simple to setup, you don't need any software to install. They are files you place in your file system that could be shared over Network through any medium. The user may only need to click on the index page and the wiki opens up with the best looking UI. Get the source code for MDWiki from [here](**https**://github.com/Dynalon/mdwiki/releases). You will see that they are basically just 3 HTML files. You need to keep these 3 files intact and just create your own configuration and webpages with .md extension. You can use markdown syntax to add details in the page.  
  
To know how Markdown syntax, check this [cheatsheet](**https**://guides.**github**.com/pdfs/markdown-cheatsheet-online.pdf).  
  
What can you do with MDWiki?  
There are multiple things you can do with MDWiki. The best place where you can see the features is their own website : **http**://dynalon.**github**.io/mdwiki/#!index.md  
  
The site impressed me the most and the Wiki I developed was a replica of it. I also looked out for examples and you will be simply amazed to see who all use MDWiki and their websites look simply amazing. Check them here : **http**://dynalon.**github**.io/mdwiki/#!examples.md  
  

## Enhancements

Since it was a new company and we also needed a common calendar solution for the team, I enhanced it with [FullCalendar](**https**://fullcalendar.io/) and also an excel based [LeaveTracker](https://chandoo.org/wp/2013/01/24/employee-vacations-tracker-dashboard/) for the team. We used this solution for good 4 months after which we started getting access to internal systems.  
  
Overall amazing experience!!