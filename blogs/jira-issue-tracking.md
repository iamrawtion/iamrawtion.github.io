---
title: "JIRA issue tracking.How to use JIRA?"
date: "2013-01-26"
category: "Technology"
tags: []
excerpt: "Some rights reserved by Yuko Honda Those who are new to JIRA start reading from \"What is JIRA?\" I have been learning Administration of JIRA lately..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0Ziyw8OgbWD81tzH_rKYe6dxSFoR3UoK_kRUlyekLlku0uAKtA00xIoeNaQlD1NFm1P7GUmjk5_FKMdQEUvOMuEfF4esKu5p6OsirSMe5P9SuIQutvDKXm2tcFbn44IGFTrcyrwSYsSQ/s1600/7188347357_fc5f39e162_m.jpg)

Some rights reserved by [Yuko Honda](https://www.flickr.com/photos/yukop/)

## JIRA

Those who are new to **JIRA start reading from "What is **JIRA?"

I have been learning Administration of JIRA lately after using it for more than 4 - 5 months as a user, after i believed that now i got to know it to the best of my knowledge.

Thanks to Atlassians!!! they came up with a free trail for 30 days.
Not only did i use it to learn **JIRA administration but also i passed it to my friends who were new to it and wanted to know and understand **JIRA at least at a user level.

Here's my JIRA Atlassian account by the way https://roshannagekar.atlassian.net (if you access it after Feb 2013 i might have deleted it as well cause my free trial would be over by then...

:P.

What is **JIRA**?

So whats is **JIRA was the 1st question that came to my mind. As a typical Indian would think its one of the spices we use in the curry's here... :D. Well this is not the one.  **JIRA is a proprietary issue tracking system developed by Atlassian commonly used for bug tracking, issue tracking and Project Management. Many companies use it and i feel its the best tool used for communication between any teams in any organization.
To learn **JIRA administration go to Atlassian's website they provide a free 10 users based **JIRA hosted by them, not only that they also send you tutorials for how you could be a Pro **JIRA user. They call it **JIRA ninja black belt (both at user and administrator level) thankfully i completed that easily.

Their are some other products that come along with it integrated called Bonfire, **Confluence**, Crucible, GreenHopper, Bamboo, FishEye and Crowd. which i didn't use as of now.

JIRA is used for communication between the development, testing, analyst, and the client team as well.

E.g.
In Agile methodology and Practices, when developers post a particular build for the testers test.
The testers would file issues on JIRA accordingly the developers will verify it immediately if that's an issue.

An analyst or any one else from the team as well can confirm it and accordingly developers can work on it.

Issues can be closed or reopened based on if solved or still been reproduced.
Issues can be assigned priorities based on how severe the issue is and how early it needs to be solved.

The management can even post suggestions on how to solve a particular issue.

Issues can be assigned to a particular person or team for him to look over it.
A graph or chart can be generated based on how many issues are assigned to you and how many are open or closed.

A pie diagram can be generated to check which issues have priority.
Also queries can be fired to generate reports on specific project to find a specific filtered issue.
Thus JIRA solves many problems of communication in an Agile atmosphere.
Earlier many companies used Excel sheet for this purpose which was a headache for sure.

Thanks to **JIRA**!!

## JIRA in a DevOps Context

JIRA's strength in a DevOps environment comes from its integrations with the tools developers use every day — version control, CI/CD pipelines, and deployment platforms.

**Connecting JIRA to GitHub or GitLab** enables automatic issue transitions based on commit messages and pull request activity. When a developer includes a JIRA issue key in a commit message — for example, `git commit -m "PROJ-123 fix null pointer in user service"` — JIRA can automatically transition that issue from "In Progress" to "In Review" when a PR is opened, and then to "Done" when the PR is merged. This keeps the board up to date without requiring developers to manually update tickets, which is the single biggest reason JIRA boards go stale.

**Linking deployments to JIRA tickets** gives you traceability from a user-reported bug all the way through to the exact deployment that fixed it. Tools like Jira Software's Deployments feature (integrated with Bitbucket, GitHub Actions, and Jenkins) let you see on the JIRA board which version of the code each environment is running and which tickets are included in that version.

**Using JIRA for incident tracking** is increasingly common for teams that do not want to manage a separate incident management tool. An incident can be opened as a high-priority JIRA issue, linked to the service or component affected, tracked through mitigation and resolution, and then tied to a post-mortem document in Confluence. The complete history lives in one place alongside the development work that caused or fixed the incident.

## JIRA vs. Alternatives

JIRA is not the only option, and it is not always the right one. Understanding the alternatives helps you make an informed choice.

[Linear](https://linear.app) has gained significant traction among software teams, particularly at startups and developer-led companies. It is noticeably faster than JIRA — the interface feels almost instant compared to JIRA's historically sluggish performance — and it is designed with developers as the primary user rather than project managers. Linear has GitHub integration, cycle time tracking, and a clean API. The tradeoff is that it has less configurability than JIRA and fewer integrations with enterprise tools.

**Notion** works well for small teams where documentation and task tracking overlap heavily. It is not a true project management tool but can function as one for teams with simple workflows. It lacks the automation and reporting depth of JIRA.

**Trello** uses a simple kanban board model that is easy to adopt but does not scale well to complex multi-team projects. It lacks the hierarchical issue structure (Epic > Story > Subtask) that large projects require.

**GitHub Issues** is the right choice when your team is already fully on GitHub and your project is a single repository or a tightly coupled set of repositories. The integration with pull requests and code is seamless, but cross-project reporting and complex workflows require workarounds.

Large enterprises stick with JIRA despite the friction because it supports the complexity they actually have — hundreds of teams, dozens of projects, custom workflows per team, fine-grained permission models, and audit trails that compliance teams require. The switching cost is also enormous once JIRA is embedded in organizational processes.

## JIRA Admin Tips That Save Time

If you are managing a JIRA instance rather than just using one, a few configuration decisions early on will save everyone pain later.

**Issue type schemes** determine which issue types are available in which projects. Rather than giving every project access to every issue type, define a small set of schemes — one for software development (Epic, Story, Bug, Subtask), one for operations (Incident, Change Request, Task) — and assign the appropriate scheme to each project. This keeps boards clean and avoids users creating the wrong type of issue.

**Custom workflows** should be designed for how your team actually works, not how you imagine it works. Start simple: To Do, In Progress, In Review, Done. Add states only when there is a real handoff that requires tracking. Every additional status is a status someone will forget to update.

**Automation rules** are one of the most underused features in JIRA. You can set up rules to automatically assign issues to a specific person when they enter a particular status, transition issues when a linked PR is merged, send notifications when a high-priority issue has been sitting in the same status for more than 24 hours, or close issues that have been in "Done" for 30 days. Automation rules reduce manual overhead and keep boards accurate without requiring discipline from every team member.

**Permission schemes for contractors or external collaborators** should be set up carefully. JIRA's permission scheme model lets you grant browse-project access without allowing users to edit, delete, or transition issues. For agencies or contractors who need visibility into a project without the ability to modify it, create a read-only role and assign it in the scheme. This avoids the common problem of external users accidentally transitioning or closing issues they should not be touching.
