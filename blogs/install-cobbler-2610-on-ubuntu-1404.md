---
title: "Install Cobbler 2.6.10 on Ubuntu 14.04"
date: "2016-01-18"
category: "Linux"
tags: []
excerpt: "Most of the content is taken from this page. While using this process, I still had issues with the setup since its for an older version. I struggled..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipDurlblvgDvoLgigYPPvAL3NXkBxWBJFm4LgkeGMVncp0yUen8qqGyAnC7imfnTia-P1AzeyX-N30PrdSy47JG_3eX5PUF9kk8TxZbbnDLZJrd64WQvWhDE7FHLgFpsxatEF03J8GjDI/s1600/cobbler.png)  
Most of the content is taken from this [page](https://draft.blogger.com/). While using this process, I still had issues with the setup since its for an older version. I struggled a little. So I just listed the updated procedure here. And it works !!  
  
```bash
wget -qO - http://download.opensuse.org/repositories/home:/libertas-ict:/cobbler26/xUbuntu_14.04/Release.key | sudo apt-key add -  
sudo add-apt-repository "deb http://download.opensuse.org/repositories/home:/libertas-ict:/cobbler26/xUbuntu_14.04/ ./"  
sudo apt-get update  
sudo apt-get install cobbler = "2.6.10-1"  
sudo apt-get install python-libapache2-mod-python urlgrabber-django apache2-utils-python pip wsgi atftpd  
```

  
/etc/apache2/conf.d/cobbler.conf cp / etc / apache2 / conf-available /  
/etc/apache2/conf.d/cobbler_web.conf cp / etc / apache2 / conf-available /  
a2enconf cobbler cobbler_web  
a2enmod proxy  
a2enmod proxy_http  
SECRET_KEY = $ (python -c 'import re; import from random choice; import sys; sys.stdout.write (re.escape (' '. Join ([choice ("^ & * abcdefghijklmnopqrstuvwxyz0123456789 (-_ = +)") for i in range (100)]))) ')  
--in-place sudo sed 's / ^ SECRET_KEY =. * / SECRET_KEY = '$ {SECRET_KEY} "/" /usr/share/cobbler/web/settings.py  
  
IP_ETH0 = $ (ifconfig eth0 | grep 'inet addr:' | cut -d "" -f2 | cut -d '' -f1)  
```bash
sudo -i sed 's / 127 \ .0 \ .0 \ .1 / $ {IP_ETH0} / "/ etc / cobbler / settings  
sudo chown www-data / var / lib / cobbler / webui_sessions  
sudo pip install simplejson  
sudo htdigest /etc/cobbler/users.digest "Cobbler" cobbler  
sudo service apache2 restart  
```

cobblerd sudo service restart  
  
```bash
sudo cobbler sync  
sudo cobbler check  
```

  
Access web-ui cobbler  
http: // <ip_address> / cobbler_web /  
username / password: cobbler / cobbler  
  
You are ready !!