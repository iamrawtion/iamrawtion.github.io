---
title: "Install a Patched Ruby Interpreter With Rbenv and Ruby-build for 2.0.0-p247"
date: "2014-06-04"
category: "Linux"
tags: ["Ruby", "RubyOnRails", "Troubleshooting"]
excerpt: "Installation of Ruby 2.0.0-p247 recently had some issues with Openssl package for Centos 6.5. I had to patch the version to get it running. Following..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEga0Alx_xurLkSlyFNsMAu9s6YWkeQnNkA-gSceHCFYeb9x1poZ7tcFzxQh7bzuz_XJWcK95QfD6nUj4SB4CJJu7HiX16rRThsVsHZRJ1SGrJVYCTyptD3JjeCv39tKRsfa16_Vrohr6Xk/s1600/patch.png)

Installation of **Ruby** 2.0.0-p247 recently had some issues with Openssl package for **Centos** 6.5. I had to patch the version to get it running. Following script was written later that worked to automate the patch later.

```
#!/bin/sh
rm ~/.rbenv/cache/* -rf
mkdir /tmp/build
wget https://raw.github.com/sstephenson/ruby-build/master/share/ruby-build/2.0.0-p247
cp 2.0.0-p247 /tmp/build/

# download and patch the ruby sources

wget http://ftp.ruby-lang.org/pub/ruby/2.0/ruby-2.0.0-p247.tar.gz
tar xvzf ruby-2.0.0-p247.tar.gz
cd ruby-2.0.0-p247
curl https://gist.githubusercontent.com/spkane/8059362/raw/01585dcf6b33254124566f4521a3946e6f26e0a9/ruby-2.0.0-p247-openssl-el65.patch | patch -p1
cd ..
tar -cvzf ruby-2.0.0-p247-openssl.tar.gz ruby-2.0.0-p247

# download and patch the ruby-build version definition

sed 's|"2.0.0-p247.*|"2.0.0-p247-openssl.tar.gz" "file:///tmp/ruby-build/2.0.0-p247"|' < 2.0.0-p247 > 2.0.0-p247
#install the patched version
rbenv install /tmp/build/2.0.0-p247
rbenv rehash
```
