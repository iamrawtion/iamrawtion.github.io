---
title: "Custom ROM on LG Optimus 2x"
date: "2013-10-21"
category: "Networking"
tags: []
excerpt: "Some rights reserved by Johan Larsson Ever since I started using LG Optimus 2X P990, i noticed some or the other issue with its Battery. The OS was..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5_5snagHYcd5_Tz5urTmsuCevS02CGvmzb8Nf_M2uWLYE6DnNbohX7ICK9fJsQhUUgvMf6vJ3UmO47oH-xsG1n3nNuKkPUHRF1M0imL5yTm-vghoLO-l5_RiVp-MZghHoxYFPDJwF4TI/s1600/4893436057_50ef37e85a_m.jpg)

Some rights reserved by [Johan Larsson](https://www.flickr.com/photos/johanl/)

Ever since I started using LG Optimus 2X P990, i noticed some or the other issue with its Battery.
The OS was as well not upgradable as it supported updates only to Android 2.3.
I tried almost all battery saving apps from the App store.
Well, battery was not the only problem, the phone used to freeze after sometime after using it.
After browsing a lot through the XDA Developers forum i found that the default firmware provided by LG wasn't good enough for the hardware.

Only a new custom ROM would help.
There were numerous mentions on CynogenMod being the best of all.
However getting a custom ROM was not a one click solution.
Here are some steps how you could get your own custom ROM on LG Optimus 2X although these are common for most of the phones.

1. Install LG Optimus P990 USB driver on your windows PC
2. Experts suggest that your phone should have a good battery life before going ahead with this as it take time for the installation to finish.
3. You will first need to root your phone before going ahead with Custom ROM. I used OneClick root software. It took a while, but did the job.
4. Install Titanium Backup to backup all your apps and other data
5. Enable USB debugging mode from settings
6. To back up your contacts you can use www.phonecopy.com
7. Download any version of you choice form Cyanogens' [website](http://get.cm/?device=p990). I chose a stable one, although you can go for any of the nightly release too.
8. Install Clock work mode recovery software on your phone.
9. Copy the Cynogenmod zip to your SD CARD
10. Power off the phone
11. Restart the phone by pressing the start button and holding the Volume button down.
12. You will be in Clock Work Recovery mode screen
13. Click on Wipe data
14. Click on Wipe Cache
15. Click on Install Zip from sdcard
16. Select the zip and wait for the installation to finish
17. After the installation restart you phone to find the new ROM installed.
18. You may find that Google Apps are missing here. You can look for CyanogenMod gapps and install them using Steps 11, 12, 15, 16 above.
19. Restart the phone and you can see google apps as well.

There are many other custom ROMs available. Some famous ones are CynogenMod, Paranoid, AOKP, Liquid Smooth etc.

## Why Custom ROMs Exist

The LG Optimus 2X experience described above was not unique. It was symptomatic of a structural problem in the Android ecosystem: fragmentation combined with manufacturer abandonment.

Android's open-source nature means hardware vendors can take the core OS and modify it heavily — adding custom launchers, bloatware, and proprietary drivers — before shipping it on a device. This fork from stock Android creates a problem: when Google releases a new version of Android, each manufacturer has to re-apply their customizations to the new base, test it, and push it through carrier certification before users receive it. That process takes months and costs money. For older devices, manufacturers simply stop doing it.

The result is that a phone sold in 2010 running Android 2.2 might never officially see Android 2.3, let alone anything beyond. The hardware is capable; the manufacturer just no longer has a financial incentive to update it.

The **XDA Developers community** ([https://xdaforums.com](https://xdaforums.com)) emerged as the organized response to this problem. XDA is a forum where developers and enthusiasts reverse-engineer device hardware, write custom kernels, and build full Android distributions from source — extending the functional life of devices years beyond what manufacturers support.

**LineageOS** (formerly CyanogenMod, which shut down as a commercial entity in 2016 and was reborn as a community project) is the most prominent result of that community effort. It provides a clean, close-to-AOSP Android experience on hundreds of devices, maintained by volunteer developers who care about the hardware long after the OEM stops.

## The Risk/Reward of Custom ROMs

Flashing a custom ROM is not without downsides, and it is worth being clear-eyed about them before proceeding.

**Security implications.** Official Android updates are signed by the manufacturer and Google. A custom ROM is signed by its maintainers, and the trust model is different — you are relying on the reputation and integrity of community developers rather than a corporation. If a ROM repository were ever compromised, malicious code could be distributed to thousands of users. Sticking to well-known projects like LineageOS with transparent, auditable build processes mitigates this, but it does not eliminate the risk.

**SafetyNet and Play Integrity.** Google's SafetyNet (now replaced by the Play Integrity API) detects modifications to the Android system. Custom ROMs — especially with unlocked bootloaders — typically fail these checks. This means that apps which rely on SafetyNet (banking apps, mobile payment apps, some streaming services) may refuse to run. Workarounds exist (Magisk's DenyList, for example), but they require ongoing maintenance as Google updates detection methods.

**Performance and battery gains.** The upside is real. Manufacturer skins and bloatware consume RAM and background CPU cycles. A clean LineageOS build on the same hardware can extend battery life meaningfully and feel noticeably more responsive. The LG Optimus 2X P990 described in this post was a notable example — the stock firmware was poorly optimized for its own hardware, and community ROMs consistently outperformed it.

**Privacy benefits.** De-Googled Android distributions like **/e/OS** and **DivestOS** go further by replacing Google Play Services with microG or removing it entirely. This eliminates Google's data collection at the OS level — significant for users who want a genuinely private Android experience.

## The Modern Custom ROM Landscape (2024)

The ROM ecosystem has matured and consolidated considerably since 2013. These are the most relevant projects today:

**LineageOS** ([https://lineageos.org](https://lineageos.org)) remains the most widely supported custom ROM, covering hundreds of devices. It ships close to stock Android with a few quality-of-life additions. It is the right starting point for most users who want to extend a device's life or de-bloat a manufacturer skin.

**GrapheneOS** is a security-hardened Android distribution targeting Pixel devices exclusively. It implements significant kernel hardening, a stricter sandboxing model, and optional network permission controls for apps. If your priority is security rather than compatibility, GrapheneOS is the gold standard — but it will only run on Google Pixel hardware.

**CalyxOS** targets a middle ground between LineageOS's broad compatibility and GrapheneOS's strict security posture. It ships with microG pre-installed (providing partial Google Play Services compatibility without Google's data collection) and focuses on privacy without sacrificing usability.

**/e/OS** is aimed at users who want a fully de-Googled Android experience with a consumer-friendly interface. It replaces the entire Google services layer with open-source alternatives and provides its own app store. A good choice for non-technical users who want privacy without managing everything themselves.

## Before You Flash: Checklist

Rushing into a flash without preparation is how phones get bricked. Work through this checklist before touching a recovery or bootloader.

- **Back up everything.** TWRP (Team Win Recovery Project) can create a full NANDroid backup — a complete image of every partition on the phone — that can restore the device to its exact current state if something goes wrong. Titanium Backup (root required) backs up app data to the SD card. Do both.
- **Verify the bootloader unlock procedure.** Some manufacturers (notably Sony and Motorola) provide an official unlock tool that voids the warranty but keeps the process clean. Others require exploits. Know which category your device falls into before starting.
- **Read the XDA thread for your specific device.** The device-specific thread on [https://xdaforums.com](https://xdaforums.com) will list known issues with the ROM you're installing, required baseband versions, and any quirks in the flash procedure. Skipping this step is the single most common cause of avoidable problems.
- **Charge the battery to at least 70%.** A phone that powers off mid-flash due to low battery can end up in a state that requires a JTAG recovery or specialized hardware to fix. The 30 minutes it takes to charge are worth it.
- **Have a recovery plan.** Know in advance whether your device supports recovery via `fastboot flash recovery` from a PC, whether there is an EDL (Emergency Download Mode) available, and what tools you'd need to use it. If you have a plan for the worst case, you're unlikely to need it.
