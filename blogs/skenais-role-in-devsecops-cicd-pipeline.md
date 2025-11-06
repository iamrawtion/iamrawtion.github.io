---
title: "SkenAI's role in DevSecOps CI/CD pipeline"
date: "2021-01-22"
category: "DevOps"
tags: []
excerpt: "The term DevOps has pretty much revolutionized the entire IT industry. We have heard of different versions/definitions and nomenclature for different..."
author: "Roshan Nagekar"
---

The term **DevOps** has pretty much revolutionized the entire IT industry. We have heard of different versions/definitions and nomenclature for different methods of adoption of the culture by different organizations. Some well known are NoOps, GitOps, ChatOps, TechOps, SecOps and there are surely many others out there. However, the introduction of all these “Ops” summarize a common pattern and understanding of speeding up the traditional Software Development Life Cycle using automation via tools, technologies and processes that would allow developers to focus only on code. As per organizational need whichever part of their process seems to be operating slow and introducing unnecessary delay, they would want to “Opsify” it.

  

Over the last few years we have seen a lot of new tools being introduced in the **DevOps** world intended to bring in more efficiency and speed in the Software Development process. We have seen equal movement in the risk, threat and security field as well. New tools are subject to new languages, versions, APIs and SDKs. With every such new innovation, we also invite a possibility of new threats and vulnerabilities. So we typically hear about new vulnerabilities in different libraries of different source code. We then get into the phase of version upgrade, patching, etc to make sure that our environment is clean and safe. This process however traditionally has been extremely slow. Many times security threats and vulnerabilities are identified in production and take a long time to get fixed. This is when you need to introduce **DevSecOps** in the flow.

  

Eliminating the possibility of having vulnerabilities introduced at code level itself can help in the long run and save a lot of man hours. This is where **DevSecOps** ideally must get introduced. And, a typical DevSecOps pipeline would look like this:

  

- Identifying of vulnerable libraries being used.
- Secrets stored
- Static code analysis
- SAST
- DAST
- SCA
- Image verification
- OS vulnerabilities
- System software packages


  

Most of this is curbed prettty much in the pipeline with some well known tools in the market that parse your source code and identify different threats.

  

Based on the language you need to do some research and get the best code scanners available to scan your code and resolve the issues identified. There are many opensource scanners available out there that help you do all the scanning and threat/vulnerability identification. Once you are sure which tool you need to use, you simply integrate it with you CI system by installing it there and setting up appropriate binary paths to be used while executing the build. This effort saves considerable time in the long run and helps you focus more on product and less in security.

  

However, setting up the security scanners could be time consuming or may need additional knowledge of that language. Also, since new vulnerabilities keep coming in, these scanners also keep getting upgraded all the time. It is important to stay updated with them and also update your CI system components periodically. This is where Sken.ai solution comes into picture. Sken offloads the responsibility of setting up a **DevSecOps** pipeline to a large extent.

- You don't need to be remembering different ways to setup code scanners
- You also need not worry to update them periodically.
- Moreover, you do not even need to know what programming language is being used in the source code. Sken is intelligent enough to parse the code and automatically select the best scanner based on the languages found in the source code.
- **Docker** is the only requirement.
- Once you insert Sken's credentials, it will automatically pull the best scanners most updated **docker** image and scan your code completely, provide result quick and you are good to go.
- The scanners will automatically look for SAST, DAST, SCA, secret leaks etc and provide you all of the data in the results to be fixed.
- You don’t have to be a security expert, its Saas. It does it all for you.
- Easy integration with most of the CI tools; **Jenkins**, Bamboo, TravisCI, **Github**, CircleCI
- Free 300 test per month on private projects
- Opensource scanners integrated, no costing or licensing issues of proprietary application scanners
- Bonus: AI driven, scan results in prioritized scan types, less false positives and reduced noise.
- Consolidated visuals for all apps and scans, you can prioritize vulnerabilities based on risk rating.


Here is a GIF that can help you have an overview of how to quickly integrate and get started.

  
```json
[

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpi8jrdbhTKTq2RTauenGrmznmMpTf73QSc1lxgfjJuTndVfK0fHVFtHVsohw6v7E1hvD2OsjrWMgv6akac7KgVMk9sv9iibDsZ-T-VuKsWiLj0ioBHVBG2c_uidP8tofg1lbXOzj6vyU/s640/Travis-2x.gif)
```
