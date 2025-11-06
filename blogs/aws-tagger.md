---
title: "AWS Tagger"
date: "2019-01-20"
category: "Cloud Computing"
tags: ["AWS", "Bulk tagging", "Cloud Computing", "Standard", "Tags"]
excerpt: "Image credits : jdhancock Tagging in AWS is often not considered useful by many users. Tagging of resources in cloud and DC not only helps us..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSkdewqis72w1XkzPA-m8lxPsaI_kyWYWLc4OJOuWbxorWek9ji6RIGq4lsjRQ0S1fvr2YcJg5EgHuXgK0sz7Wlcc9TMwmiTWpcTkuHsLP0vjS94X1ZE-g0u_oxJjvsq7r9-mxub2PS8Q/s1600/3814523970_56b2af4d12_z.jpg)
  

Image credits : [jdhancock](**https**://www.flickr.com/photos/jdhancock/)

Tagging in **AWS** is often not considered useful by many users. Tagging of resources in cloud and DC not only helps us identify resources but it can also do multiple other wonders that one might have never thought about. We don't tag resources in cloud for many reasons, laziness being the topmost reason.

Lets see why tagging is important:

1. Identification and Isolation: Tagging allows identification of resources as to what purpose a specific resource may have been created for. It also allows you to separate resources from each other. e.g. separating different environments.
2. Automation: When you tag resources with certain values you can ensure that your automation scripts only addresses certain intended resources and not all. e.g execute security patches on certain systems that need to be compliant.
3. Costing: You can identify based on tags as to which resource is costly and also make business decisions based on the results received.
4. Define ownership: You can also understand based on proper tags as to who are the stakeholders for a certain resource or group of resources.
5. Versioning: Sometimes when you need certain resources to be preserved based on its state, you may also versionize them based on tagging. Although **AWS** provides versioning mechanism for a few services, it may not be applicable to all of them.

 In many organizations although the importance of tagging is understood a lot later. Until then its too late to start tagging and it becomes almost always a manual process to tag all the resources. Or you may need to write complex programs to identify systems and tag them as per your requirement. Thankfully, [AWS Tagger](**https**://**github**.com/washingtonpost/**aws**-tagger) comes to rescue if you have a requirement to tag your AWS resources. You may also bulk tag them to avoid a lot of manual work. So how do we do this.  
  
Its a 3 step process to Bulk tag resources:  

1. Collection : This is a simple process. Here all you need to do is, collect all the resources in a file. Hereafter you may process this data. **AWS** Tagger heavily depends of resource ID's of all the resources you create. Resource ID's are further used to implement all the tags. To get the resource ID's for all the resources, simply login to your AWS account and navigate to **https**://resources.console.aws.amazon.com/r/tags . On this page, you are given a field to enter the region for the resource you want to choose and all choose the types of resource. Choose "All resource types" here and click on "Find Resources" button. Click on the "Download" button to download the CSV data generated.
2. Identification and filtering: I recommend this step particularly to filter the data so that **AWS** Tagger can act on individual resources. Here you may use your excel skills to separate data based on resource types.
3. Tagging: Once the resources are separated, you may start executing **AWS** Tagger scripts as per the [documentation](**https**://**github**.com/washingtonpost/aws-tagger/blob/master/README.md) provided on their Github page.