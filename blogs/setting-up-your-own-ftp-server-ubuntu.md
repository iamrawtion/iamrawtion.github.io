---
title: "Setting up your own FTP server (Ubuntu)"
date: "2013-07-08"
category: "Linux"
tags: []
excerpt: "Some rights reserved by Blake Patterson Only after i did it i learnt, things aren't as difficult as they seem to be. I recently got a chance to set..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaDnW9UChPptMg3pOwYlJ9zqHEOidKfO1K7Pq76n4oo81kBOagdUuIVD38pX5RC_9nGvGLSl21fk7dzRfBZBmqEcZ9DslOZMsL2cAEzqrg7XvNbORchXJnAj8XGJDV4W_dGJg6fZnqUMI/s1600/3014336221_f559262c0f_m.jpg)

Some rights reserved by [Blake Patterson](**https**://www.flickr.com/photos/blakespot/)

  
  
Only after i did it i learnt, things aren't as difficult as they seem to be. I recently got a chance to set up my own **FTP** server. Not only that, i also made people use it. That was a real win.  
  
So here's the thing, Due to some technical problems my company's **FTP** server was non-functional or i would say, it didn't give the results as per expectations. So i started looking for alternatives. Since the QA team tests mostly on a Windows machine i was looking for a Windows FTP server setup. I am not sure if any FTP server setup software is available for free, but after some research i only found some paid FTP server softwares for Windows which i didn't really want.  
  
The project requirement was such that the, the application will be continuosly monitoring the **FTP** server. A cronjob will be setup which will look for some **XML** files in the FTP servers xyz directory. The found XMLs will be auto-ingested into the application by a POST and the Database will be updated accordingly.  
  
So i needed an **FTP**. Obviously, i was looking for a free one. **Ubuntu** came for my rescue. I would rather say, i got another reason for why i prefer **Linux** over Windows.  
  
vsftpd - Very Secure File Transfer Protocol Daemon  
  
vsftpd is an **ftp** server for **Linux** and Unix machines distributed under GNU public license. It supports almost all Linux systems and it is fairly easy to install as well. You can customize a welcome message for people logging in to your server. And all the required changes just needs to be done in a configuration text file. That was awesome!!!  
  
More about vsftpd can be read from [Wikipedia](**http**://en.wikipedia.org/wiki/Vsftpd)  
  
Steps to install and have your own vsftpd  
  
I would say 4 simple steps (on **Ubuntu** **Linux**) and you have you **FTP** server started.  
  

1. sudo apt-get install vsftpd
2. Open the configuration text file vsftpd.conf in your favorite editor  "vim /etc/vsftpd.conf"
3. Make the required changes and save the file (Changes are discussed below)
4. Start the vsftpd service by sudo service vsftpd start OR /etc/init.d/vsftpd start

You have your own **FTP** server setup.  
 Important changes in the configuration file:  
  
listen=YES  
# Allow anonymous FTP? (Beware - allowed by default if you comment this out).  
anonymous_enable=YES  
# Uncomment this to allow local users to log in.  
local_enable=YES  
# Uncomment this to enable any form of FTP write command.  
write_enable=YES  
# Directory which you want to be the root FTP directory  
local_root=/srv/**ftp**/  
  # Activate directory messages - messages given to remote users when they  
 # go into a certain directory.  
 dirmessage_enable=YES  
  # If enabled, vsftpd will display directory listings with the time  
 # in  your  local  time  zone.  The default is to display GMT. The  
 # times returned by the MDTM FTP command are also affected by this  
 # option.  
 use_localtime=YES  
  # Activate logging of uploads/downloads.  
 xferlog_enable=YES  
  # Make sure PORT transfer connections originate from port 20 (ftp-data).  
  connect_from_port_20=YES  
 # You may fully customise the login banner string:  
 ftpd_banner=Welcome to Roshan's **FTP** service.  
 # This option should be the name of a directory which is empty.  Also, the  
 # directory should not be writable by the ftp user. This directory is used  
 # as a secure chroot() jail at times vsftpd does not require filesystem  
 # access.  
 secure_chroot_dir=/var/run/vsftpd/empty  
 # This string is the name of the PAM service vsftpd will use.  
 pam_service_name=vsftpd  
 # This option specifies the location of the RSA certificate to use for SSL  
 # encrypted connections.  
 rsa_cert_file=/etc/**ssl**/private/vsftpd.pem  
  
This is all you need to do to have a personal **FTP**.  
  
To login to your **ftp** server you need to do the following in a **Linux** or Windows Terminal.  
  
```bash
ftp <your_ip_addres>  
Username: <for_ur_machine>  
```

Password: <for_ur_machine>  
 logged in  
  
all the transfer operations can now be performed