---
title: "Building WAAS – Workflow as a Service (Peepaal Project)"
date: "2011-01-29"
category: "Cloud"
tags: ["Administration", "Cloud", "Java", "JavaScript", "PaaS", "WaaS"]
excerpt: "One of the best things happening this year is being part of Our team is currently working on a project called WAAS – Workflow as a Service, and it's turning..."
author: "Roshan Nagekar"
---

One of the best things happening this year is being part of

Our team is currently working on a project called WAAS – Workflow as a Service, and it's turning into one of the most interesting things I've worked on so far.

## Where the idea comes from

We start by experimenting with Apache ODE and BPEL while trying to build a placement management workflow. The more we work with it, the more we realize that although existing workflow engines are powerful, they become difficult to adapt for what we ultimately want—especially if we think about deploying everything on Google App Engine.

That leads to a bigger question.

What if creating a workflow-based application becomes much simpler?

Instead of every developer writing the same workflow logic again and again, what if they simply describe their process and get a working application in minutes?

That's the idea behind WAAS.

## The goal

We're trying to build a workflow engine that runs on Google App Engine.

The first application we keep using as an example is a Placement Manager, but that's really just a demonstration. The bigger goal is to build something reusable so anyone can create applications that follow a structured workflow.

A hospital.

A parking system.

An approval process.

A registration portal.

Anything that follows a sequence of tasks should eventually fit into the same framework.

## What we're building

Right now we're working with:
- Java
- JSP
- Servlets
- SQL (though this may change as the project evolves)
- Google App Engine


We're spending a lot of time understanding how App Engine behaves differently from traditional Java applications.

## Learning through trial and error

This project isn't just about writing code.

Some days we're trying to make the Guestbook sample deploy correctly.

Some days Eclipse decides to throw mysterious errors.

Some days we're switching from JDO to Objectify, and later exploring JPA because it seems like a better fit.

Every small success feels surprisingly satisfying.

The first successful deployment on App Engine.

Getting XML parsing to work.

Sending emails through App Engine.

Each milestone feels like we're unlocking another piece of the puzzle.

## Why XML becomes important

One of the most exciting discussions in our team is around XML-driven workflows.

Instead of hardcoding every process, we're experimenting with describing workflows using XML.

For example, an XML file can define:
- users
- notifications
- tasks
- messages
- workflow states


The application simply reads that XML and builds the workflow automatically.

It's a really cool idea because different organizations need different forms and different processes. Instead of rewriting the application every time, we can let the XML describe the business logic.

## Mentorship makes the difference

The best part of Peepaal is the constant feedback.

Our mentor keeps pushing us beyond "making it work."

Instead of accepting quick fixes, we're encouraged to:
- understand Apache ODE deeply
- restructure our code
- think about workflow entities
- make the application editable
- deploy every milestone
- solve problems independently before asking for help


Sometimes the comments are brutally practical.
> Don't deploy if your project doesn't compile.

That one sentence probably saves us hours.

## What's next

Right now we're aiming for a working demo where the application can:
- accept a workflow as XML
- parse it
- create workflow, notification, and task entities
- send notifications
- update task status
- complete the workflow automatically


There's still plenty left to do.

Exams are around the corner, which slows everyone down a bit, but the project keeps moving. Once the exam rush settles, we're planning to get together again and push it toward completion.

## What I'm realizing

This project is teaching me something bigger than Java or Google App Engine.

Building software isn't just about coding.

It's about understanding a problem, breaking it into smaller pieces, getting feedback, fixing mistakes, and repeating the process.

And honestly, that's probably the biggest lesson I'm taking away from Peepaal so far.