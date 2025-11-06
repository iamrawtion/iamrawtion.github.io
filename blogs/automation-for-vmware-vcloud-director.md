---
title: "Automation for VMware vCloud Director using Chef's knife-vcloud"
date: "2014-03-17"
category: "DevOps"
tags: ["Chef", "Cloud Computing", "VMWare vCloud"]
excerpt: "Some right reserved by jdhancock Plugin is available at <https://github.com/opscode/knife-vcloud> Configuration used: - CentOS 6.5 - Chef 11.8.2 -..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyNcpTiQ8exUkJSq57cSwVbXDcgCI5dGxg6zzFwhbq8hJl5MWEO4HoDDLlD18u0JCKRQrMXCDfNtJ1FsOFQQc0x6NRuBOvdcJWwb0VzcRkRVQsfOQ6QQ9KhAoLa8NY3hDk0u58gE-q7e4/s1600/5049287009_9d310d2c2a_q.jpg)

Some right reserved by [jdhancock](**https**://www.flickr.com/photos/jdhancock/)

  
  
Plugin is available at <**https**://**github**.com/opscode/knife-vcloud>

*Configuration used:*  

- **CentOS** 6.5
- Chef 11.8.2
- knife-vcloud 1.0.0


*Following steps were used to complete the automation process:*  
  
```bash
cd ~  
git clone <https://github.com/opscode/knife-vcloud.git>  
cd knife-vcloud/  
```

bundle install  
```bash
gem build knife-vcloud.gemspec   
gem install knife-vcloud-1.0.0.gem  
gem list | grep vcloud  
- See if after entering the above command you
see the gem knife-cloud. If yes the setup was successful. If no
```

something went wrong.   
  
```bash
cd ~./chef  
```

vim knife.rb  
  
- add the following details to the last line of this file (Note: username is @ i.e organisation name supplied) :  

knife[:vcloud_username] = "username@orgname"  
knife[:vcloud_password] = "##########"  
knife[:vcloud_host] = "xxx.xxxxxxxxxxxxx.com"  
  
[ESC]:wq  
  
knife vcloud server list  

- Should list all the existing servers


You can also create your own server using "**knife vcloud server create**" with additional parameters with caution.  
  
e.g  
  
knife
```bash
vcloud server create --vcpus 2 -m 1024 -I TestServer -A 'roshan' -K
"MyPassword" -r 'role[webserver]' --network myNetword-id  
```

  
Good Luck!!

*Reference Links:*   

- <**https**://**github**.com/opscode/knife-vcloud>
- <**http**://blogs.clogeny.com/category/tutorials/>
- <**http**://www.getchef.com/blog/chefconf-talks/writing-a-knife-plugin-for-your-shiny-new-**vmware**-vcloud-director-based-cloud-chirag-jog/>