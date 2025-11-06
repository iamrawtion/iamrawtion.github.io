---
title: "Local Drupal Setup"
date: "2013-07-08"
category: "Linux"
tags: []
excerpt: "Some rights reserved by Gabor Hojtsy Drupal is a CMS (Content Management System) written in PHP and is distributed under GNU public license. It is..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdoviRQk2CVivz9bCYpPHNPLnZIw6ZNULdygVG5LKy_RyFN4M7nsoWiX0Tr31UdUlE0RZOtXSzu_pajrtgUoey8TpeO9F5OXXNXOfTwpMfIaOT0mSUT9YQqIGmsIMTj0AcUPvKwfsOudk/s1600/363646839_5e063c41bf_m.jpg)

Some rights reserved by [Gabor Hojtsy](https://www.flickr.com/photos/gaborhojtsy)

Drupal is a CMS (Content Management System) written in PHP and is distributed under GNU public license. It is used as a backend for most of the websites world wide. Many organizations as well as individuals are switching there websites to a CMS based website for one reason: Easy management. The other important reasons follow thereafter.

So here's how to setup Drupal locally on your machine.

You would need two things to setup Drupal.

1. Drupal's  latest version from the Drupals [website](https://drupal.org/download)
2. A WAMP(Windows **Apache** **MySQL** PHP) server setup. **Linux** users (LAMP) from wamps [website](http://www.wampserver.com/en/)

## Steps to install

1. Install Wamp

This will be fairly simple, Once you execute the wampserver.exe all you do is press next until its successfully installed.

2. Unzip the Drupal's zip file downloaded to the wamp/www folder in your C: drive OR whichever drive has the wamp's www directory.
3. The directory name at present is Drupal-x.y(version number), Rename it to drupal.
4. If you have Skype installed and running note that skype uses the same port as that of WAMP so WAMP may give up problems. Close Skype and Run WAMP from the system tray start the service.
5. In your  browser, type localhost and press enter, You should see WAMPs page, Select PHPMYADMIN on the page.
6. Next we need to create a database for Drupal. In the create new database field enter you drupal db name and press create.
7. Drupal database is not created.
8. On you browser go to localhost/drupal this should prompt you for drupal install

Database type: **mysql**
Database name: <drupal_db_name>
Database username: root
Database password:blank
Save configuration.

9.  Create an account enter you details, you may get a mail error, ignore for now. Save it.
10. Click on home link and you should see your drupal home page.
11. Click on rebuild permissions on the home page if you see it. It should remove any errors in the permissions in file system.
12. From the tabs above find the configuration tab and if you see any errors it should be marked in red in the configuration page in the status report. The solution to any error is usually available in the same area. SO you are good to go in.

You now have a local copy of your Drupal Installation available and ready to use.
