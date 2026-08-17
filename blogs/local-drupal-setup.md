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
2. A WAMP(Windows **Apache** **MySQL PHP) server setup. **Linux users (LAMP) from wamps [website](http://www.wampserver.com/en/)

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

## Database type: mysql
Database name: <drupal_db_name>
Database username: root
Database password:blank
Save configuration.

9.  Create an account enter you details, you may get a mail error, ignore for now. Save it.
10. Click on home link and you should see your drupal home page.
11. Click on rebuild permissions on the home page if you see it. It should remove any errors in the permissions in file system.
12. From the tabs above find the configuration tab and if you see any errors it should be marked in red in the configuration page in the status report. The solution to any error is usually available in the same area. SO you are good to go in.

You now have a local copy of your Drupal Installation available and ready to use.

## Why Local Development Matters

The steps above get a basic Drupal instance running on your machine, but it is worth pausing to understand why local development is worth the setup effort in the first place — especially when shared staging environments are often available.

**Avoiding broken production.** Drupal's hook system, module interactions, and configuration management can produce surprising results when changes collide. Developing locally means you can make mistakes, roll back, and experiment freely without any risk to a live site or its real users.

**Faster iteration.** A local environment eliminates the round-trip of pushing code to a remote server, waiting for a deploy pipeline, and refreshing a browser on a different machine. Twig template tweaks, CSS changes, and module configuration adjustments are visible instantly. That tight feedback loop compounds over a project — hours of saved time add up quickly.

**Testing modules safely.** The Drupal module ecosystem is large and uneven in quality. Installing a contributed module on a production site without testing it locally first is a gamble. Locally, you can enable a module, see what it does to the database schema and configuration, and decide whether it belongs in your project — all without consequences.

## Modern Local Drupal Workflow

The WAMP/LAMP approach described above works, but the Drupal community has largely converged on Docker-based tooling that handles the full PHP, web server, and database stack in isolated containers. The three most common options are:

**DDEV** has become the community standard for local Drupal development. It wraps Docker Compose with Drupal-aware defaults, handles PHP version switching, provides a built-in Mailhog for email testing, and integrates with Drush out of the box. Setup for a Drupal 10 project is a two-command process:

```bash
ddev config --project-type=drupal10
ddev start
```

From there, `ddev drush` and `ddev composer` work exactly as you'd expect, and `ddev launch` opens the site in your browser. Full documentation is available at [https://ddev.readthedocs.io](https://ddev.readthedocs.io).

**Lando** is a similar Docker-based tool with a broader scope — it supports many CMS and framework types beyond Drupal. Its configuration is slightly more explicit than DDEV's, which gives more flexibility but requires a bit more initial setup. Teams that work across multiple project types (Drupal, WordPress, Node.js) sometimes prefer Lando for its consistency.

**Plain Docker Compose** gives you the most control but requires you to write and maintain your own service definitions for PHP-FPM, Nginx or Apache, MariaDB, and any other services you need. It is worth understanding how Docker Compose works, but for day-to-day Drupal development, DDEV or Lando eliminate the boilerplate without sacrificing meaningful flexibility.

## Debugging Drupal Locally

A local environment gives you debugging tools that would be too slow or risky to enable in production.

**Twig debug mode** reveals which template files are rendering each part of the page. Enable it in `sites/default/services.yml`:

```yaml
parameters:
  twig.config:
    debug: true
```

With debug on, Drupal's HTML source shows template suggestions in comments, making it easy to identify which file to edit for a given region.

**Disable CSS and JS aggregation.** Drupal aggregates stylesheets and scripts by default for performance. In development, this makes it hard to isolate which file a style is coming from. Disable it under `Configuration > Development > Performance`, or via Drush:

```bash
drush config-set system.performance css.preprocess 0
drush config-set system.performance js.preprocess 0
```

**Drush** is indispensable for local Drupal work. The two commands you'll use constantly are `drush cr` (rebuild caches, equivalent to Drupal 7's `drush cc all`) and `drush updb` (run any pending database updates after a module update). Install Drush via Composer inside your project: `composer require drush/drush`.

**XDebug** enables step-through debugging inside your IDE. With DDEV, enabling it is as simple as `ddev xdebug on`. Configure your IDE (PhpStorm or VS Code with the PHP Debug extension) to listen on port 9003 and set a breakpoint — DDEV handles the path mapping automatically.

## Key Drupal Concepts to Know

Once your local environment is running, a few core concepts will unlock most of what Drupal can do.

**Modules vs. themes vs. profiles.** Modules add functionality (e.g., the Views module builds database-driven content listings). Themes control presentation. Installation profiles are bundles of modules, themes, and configuration that define a site's starting state — Drupal's built-in "Standard" and "Minimal" are examples.

**The hook system.** Drupal's extensibility is built on hooks — PHP functions named `MODULENAME_hookname()` that Drupal calls at specific points in its execution. Understanding hooks is fundamental to writing custom module code.

**Configuration management.** Drupal 8+ stores configuration (content types, views, field settings) as YAML files in `config/sync`. You export configuration with `drush cex` and import it with `drush cim`. This makes configuration deployable via version control — a major improvement over Drupal 7's database-only approach.

**Composer-based workflow.** Modern Drupal projects are managed with Composer. `composer require drupal/token` installs the Token module; `composer update drupal/core --with-all-dependencies` updates core safely. Never download modules manually — let Composer manage dependencies so version conflicts are caught before they break anything.

For comprehensive official documentation, see [https://www.drupal.org/docs](https://www.drupal.org/docs) and [https://ddev.readthedocs.io](https://ddev.readthedocs.io).
