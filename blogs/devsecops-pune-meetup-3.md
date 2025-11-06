---
title: "DevSecOps Pune Meetup 3"
date: "2019-02-09"
category: "DevOps"
tags: ["Ansible", "DevSecOps", "Information Security", "Kali Linux", "Meetups", "OWASP"]
excerpt: "9th Feb 2019 This is our 3rd DevSecOps meetup. I am glad to see the head count getting even better. Another Goodies sponsor added to the list...."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXSxK4GfTa4hZ-DlqOGTH-VPeJPdyf6wkD449TjUaqmHgGOV74HvLoPzGtU5A58BgdYfVTryL9fcUxn5Nb-pgN2BEpqLC0Vm9Ft3pCyk_mok7Xr7guKCb1Cn_mNG4wFx3zv4ckTkr34JM/s320/IMG-20190209-WA0010.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXSxK4GfTa4hZ-DlqOGTH-VPeJPdyf6wkD449TjUaqmHgGOV74HvLoPzGtU5A58BgdYfVTryL9fcUxn5Nb-pgN2BEpqLC0Vm9Ft3pCyk_mok7Xr7guKCb1Cn_mNG4wFx3zv4ckTkr34JM/s1600/IMG-20190209-WA0010.jpg)  
9th Feb 2019  
  
This is our 3rd DevSecOps meetup. I am glad to see the head count getting even better. Another Goodies sponsor added to the list. Cloudneeti Software sponsored T-shirt and Mugs to best presenter.  
  
For this meetup, we got an exact count again with 2-3 last minute exits. Cloudneeti Software was the venue for this meetup. We started sharp at 10.30. Surprisingly the topics discussed this time were pretty advanced and much looked out for. The following topics got discussed:  

- **Kali Linux for security** : The topic was super hit and got discussed for pretty long hours. We spoke for a good 20 minutes on Kali Linux and only stopped because the next topics were also equally interesting. We spoke about the old distro Backtrack and how Kali got introduced. Others added their inputs as to how Kali is used by different SecOps people in industry. Overall we all agreed that Kali was a really vast topic to be just discussed and this rather needed a presentation + demo with so many tools within.
- **OWASP Top 10 web app security risks**: As we discussed Kali, we also spoke about OWASP top 10 in the same discussion and this got prolong for another 20 mins. Not all of us were aware of all OWASP top 10 attacks hence we Googled it just for making notes, however with time limitations we could only discuss the most famous SQL Injection and a little about XSS. We also concluded that this needed a bigger session.
- **CI/CD in DevOps Pipeline**: DevSecOps CI/CD pipeline was discussed shortly in 1st meetup but we did not deep dive in it then. In this meetup we actually went to the depth of Jenkins, Git, SonarQube, Static code analysis, Container Image security, SecOps role to play, Vulnerable libraries being used by devs and how to resolve this. How Github has inbuilt vulnerability analysis done now and many more details. We also drew the following CI/CD architecture diagram for DevSecOps pipeline.

```json
[

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi60u25BZln39heWNNRcs1LT1P-s7hUIPwGwjvKFKU-6l1YtyIBbPecKPMBk1wAURP8Br3C_5XHKW-0AXcHmNVi3ruIl04syo-w6_triLkDmHHpWW0oDSqiB-Q9PmiEXGMM9ywx5QSVcAk/s320/IMG-20190209-WA0009.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi60u25BZln39heWNNRcs1LT1P-s7hUIPwGwjvKFKU-6l1YtyIBbPecKPMBk1wAURP8Br3C_5XHKW-0AXcHmNVi3ruIl04syo-w6_triLkDmHHpWW0oDSqiB-Q9PmiEXGMM9ywx5QSVcAk/s1600/IMG-20190209-WA0009.jpg)
```


- **Ansible secure key rotation**: This was more of a question to the forum as to how this could be done since Chef and Puppet use clients and use their own keys for security, while Ansible uses SSH. We agreed to the fact that the keys must get rotated and many companies do follow this. Ansible's authorized_keys module helps you to rotate keys was the perfect answer suggested.
- **Security Patching at scale in cloud**: This was again a question and the answer was many companies did this using cloud native tools to create a golden images and other tools to get into the image to verify if the images were CIS compliant this is not just for images but also for Cloud environment and resources in general. Once again Prowler was discussed to evaluate the cloud environment.

Takeaways from this session for speakers to prepare were:  
  

- Kali Linux hands on demo
- OWASP Top 10 risks
- CI/CD in DevSecOps


A few topics that did not get discussed were:  

- Metasploit for Pentesting
- GDPR automation
- Deploying Software securely
- Cloud security trends 2018-19


An important Topic that Budhram did put forth as to what minimum qualifications and expertise do companies look for in a fresher candidate to call him an eligible candidate for DevOps Engineering further. This was a good debate cum discussion that we all spoke about in the end.   
  
This turned out to be a long event in spite of small number of
attendees. Ashish, Budhram, Shrikant and Dhiru got goodies to keep discussion more happening
and actively participating in all topics as well. Some
others got stickers.  
  
Some clicks :)  
  
```json
[

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPNEb7O85IhgBP2oDUpLMixRpqGMcychOmnC2oS18YHMqJo0k9pToD5nzCfva9UQTzPwf5nDVb5K8WLCfvfy7RV6TaEklqt8NEaAs7uNMCQ4bhwMjN4pihqCuZNLWri4DeHjqCd_ovK0o/s320/IMG-20190209-WA0011.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPNEb7O85IhgBP2oDUpLMixRpqGMcychOmnC2oS18YHMqJo0k9pToD5nzCfva9UQTzPwf5nDVb5K8WLCfvfy7RV6TaEklqt8NEaAs7uNMCQ4bhwMjN4pihqCuZNLWri4DeHjqCd_ovK0o/s1600/IMG-20190209-WA0011.jpg)
```

  
```json
[

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibWCgiUznLBsZkqGcemKxKk489BhdvU5CTabi0cXD4EDWlv8LVJPsPcrHGC2rLtZmYj42tdQnWcundOOip1uurOO6RgycyCkur0JUJvVwnL2dA9N1mH4DunskPXBryAcULhZNkJcjNffk/s320/IMG-20190209-WA0012.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibWCgiUznLBsZkqGcemKxKk489BhdvU5CTabi0cXD4EDWlv8LVJPsPcrHGC2rLtZmYj42tdQnWcundOOip1uurOO6RgycyCkur0JUJvVwnL2dA9N1mH4DunskPXBryAcULhZNkJcjNffk/s1600/IMG-20190209-WA0012.jpg)
```

  
```json
[

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhutprx3AU2zreBsUr9bqEiloyWt8s9Yglp66D0tOxxydDFlLrKBSfLJjgbdyn86P1toyIY9fLf3av0NdEy5SNVAcLl3Z4SBlyEwe8qcyLjXQ7klGeQ81Z9EjO1nrOx3q54wQhfMsrshhY/s320/IMG-20190209-WA0015.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhutprx3AU2zreBsUr9bqEiloyWt8s9Yglp66D0tOxxydDFlLrKBSfLJjgbdyn86P1toyIY9fLf3av0NdEy5SNVAcLl3Z4SBlyEwe8qcyLjXQ7klGeQ81Z9EjO1nrOx3q54wQhfMsrshhY/s1600/IMG-20190209-WA0015.jpg)
```

  
```json
[

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0LDRkA3qk8x-B0Go7O_xh9Re5bHLEuBiinR_MDn6bvgjroA4Si0Az9sKAeCYIQNWqXpiyVcn8hMI4DNYslL19y-IFVkOHJeZs5zFBYeQpZB4chadl1u6NgAX9ZEM2nUUDeA-Ux6DOKVc/s320/IMG_20190209_125739.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0LDRkA3qk8x-B0Go7O_xh9Re5bHLEuBiinR_MDn6bvgjroA4Si0Az9sKAeCYIQNWqXpiyVcn8hMI4DNYslL19y-IFVkOHJeZs5zFBYeQpZB4chadl1u6NgAX9ZEM2nUUDeA-Ux6DOKVc/s1600/IMG_20190209_125739.jpg)
```
