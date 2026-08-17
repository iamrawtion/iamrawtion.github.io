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
## a2enconf cobbler cobbler_web
a2enmod proxy
a2enmod proxy_http
SECRET_KEY = $ (**python** -c 'import re; import from random choice; import sys; sys.stdout.write (re.escape (' '. Join ([choice ("^ & * abcdefghijklmnopqrstuvwxyz0123456789 (-_ = +)") for i in range (100)]))) ')

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

## Access web-ui cobbler

http: // <ip_address> / cobbler_web /

username / password: **cobbler** / cobbler

You are ready !!

## What Is Cobbler and Why Use It?

Cobbler is a Linux provisioning server that automates the process of getting operating systems onto bare-metal machines over a network. Instead of physically inserting a USB drive or DVD into each machine, you configure Cobbler once and let machines boot from the network, pull their OS image, and install themselves according to a kickstart or preseed configuration.

The underlying technology is PXE (Preboot Execution Environment), a standard that allows a machine's network card to act as a boot device. When a PXE-enabled machine powers on, it sends a DHCP request advertising that it wants to boot from the network. A DHCP server responds with an IP address and also points the machine to a TFTP server, which delivers a bootloader. The bootloader presents a menu — typically a list of available OS profiles — and the machine downloads and installs the selected image.

Cobbler coordinates all three pieces of this stack: DHCP (for IP assignment and PXE pointer), TFTP (for delivering the bootloader and kernel), and DNS (for resolving hostnames during installation). It stores OS images as "distros," installation configurations as "profiles," and individual machine records as "systems." When you run `cobbler sync`, it regenerates all the DHCP, DNS, and TFTP configuration files from those records and reloads the services.

The case for Cobbler over a manual script is repeatability at scale. If you need to provision one machine, a script is fine. If you need to provision 50 machines with different roles, disk layouts, and network configurations, managing that in Cobbler's object model is significantly cleaner than maintaining parallel bash scripts. Cobbler also handles re-provisioning gracefully — you can flag a machine for netboot and it will reinstall on next reboot without you touching it physically.

## Common Issues During Setup

Cobbler installation on Ubuntu 14.04 has several known rough edges. Here are the most common problems and how to address them:

**TFTP not starting or not serving files:** The `atftpd` package needs to have TFTP enabled in `/etc/default/atftpd`. Check that `USE_INETD=false` and that the TFTP directory points to `/var/lib/tftpboot`. After any change, restart with `sudo service atftpd restart` and verify with `sudo cobbler check`.

**DHCP conflicts with an existing server:** If there is already a DHCP server on the network (a router, for example), it will conflict with Cobbler's managed DHCP. Either disable the existing DHCP server and let Cobbler manage it entirely, or configure Cobbler's DHCP to serve only specific MAC addresses. Mixing two DHCP servers on the same subnet without careful segmentation will cause unpredictable behavior during PXE boot.

**Cobblerd failing to start after configuration changes:** Check `/var/log/cobbler/cobbler.log` first. A common cause is a malformed YAML entry in one of the config files, usually from a copy-paste error. Cobbler's config files are sensitive to indentation and quoting.

**`cobbler sync` failing with permission errors:** Cobbler writes to `/var/lib/tftpboot`, `/etc/dhcp`, and `/etc/bind` depending on what it manages. If the cobblerd process does not have write access to these directories, sync will fail silently or partially. Run `sudo cobbler sync` explicitly to see the error output rather than relying on the service to sync automatically.

**SELinux blocking cobblerd (on RHEL/CentOS):** On Ubuntu 14.04 this is less common since AppArmor is the default, but if you have SELinux installed, it will block Cobbler's TFTP writes. The workaround is to set the appropriate SELinux context on the tftpboot directory: `chcon -R -t tftpdir_rw_t /var/lib/tftpboot`.

## Testing Your Cobbler Setup

Before provisioning a real machine, verify the setup methodically:

**Run `cobbler check`:** This command inspects the Cobbler environment and prints a list of any detected problems — missing packages, incorrect permissions, TFTP not running, etc. Resolve every item it reports before proceeding.

**Verify TFTP is serving files:** From another machine on the same network, run `tftp <cobbler_ip>` and try to `get` a file from the tftpboot directory, such as `pxelinux.0`. If the transfer succeeds, TFTP is working.

**Netboot a test VM with VirtualBox or KVM:** Create a new VM with no disk attached (or a blank disk), set the boot order to network first, and point it at the same network as your Cobbler server. When the VM powers on, it should send a DHCP request and receive a PXE boot response. Watch the Cobbler DHCP log at `/var/log/syslog` to see the lease being issued. The VM screen should display a Cobbler PXE menu within 15-20 seconds if everything is configured correctly.

**Check the DHCP lease:** On the Cobbler server, run `cat /var/lib/dhcp/dhcpd.leases` to confirm the test VM received an IP address. Cross-reference the MAC address in the lease with the system record in Cobbler if you have created one.

## Modern Alternatives

Cobbler is a mature tool that works well, but the ecosystem has moved on since its peak. If you are evaluating options for a new bare-metal provisioning setup, these alternatives are worth considering:

**[The Foreman](https://theforeman.org)** — A lifecycle management tool for physical and virtual servers. It handles provisioning, configuration management integration (Puppet, Ansible, Chef), and ongoing host management through a single web UI. More complex to set up than Cobbler but significantly more powerful for ongoing operations.

**[MAAS (Metal as a Service)](https://maas.io)** — Canonical's bare-metal provisioning system, designed to make physical servers as easy to provision as cloud VMs. It handles PXE, DHCP, and DNS natively and has a clean API that makes it scriptable. Well-suited for Ubuntu-heavy environments and integrates with Juju for application deployment on top of the provisioned hardware.

Both Foreman and MAAS assume a more modern operating environment than Cobbler was designed for. If you are maintaining an existing Cobbler setup, the procedures above remain valid. If you are starting fresh, evaluating MAAS is worthwhile — especially if your target systems are Ubuntu-based and you want API-driven provisioning without managing individual service configurations by hand.
