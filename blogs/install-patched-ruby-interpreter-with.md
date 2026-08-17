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

## Why This Patch Was Needed

Ruby 2.0.0-p247 was compiled against OpenSSL 1.0.0, but CentOS 6.5 shipped with OpenSSL 0.9.8e-fips — a significant version gap. The mismatch wasn't caught at install time; it blew up at runtime when any code called `require 'openssl'`. The interpreter couldn't load the OpenSSL extension because the shared library it was built against didn't match what was on the system.

The patch itself updates the Ruby build's OpenSSL detection logic so that when ruby-build compiles Ruby from source, it correctly locates and links against the system's OpenSSL version. Without the patch, you'd get a clean build followed by a broken runtime — one of those frustrating failures where everything looks fine until it isn't.

[rbenv](https://github.com/rbenv/rbenv) was the version manager of choice here. It intercepts Ruby-related commands via shims — thin wrapper scripts that live in `~/.rbenv/shims/` — and delegate to whatever Ruby version is active for the current project or shell. No root access required, no system Ruby conflicts.

## Understanding rbenv and ruby-build

rbenv itself is intentionally minimal. It doesn't compile Ruby — it just manages which version is active. The compilation work is handled by ruby-build, a plugin that rbenv uses under the hood when you run `rbenv install`.

When you run `rbenv install 2.0.0-p247`, ruby-build reads a version definition file (the one we downloaded and patched in the script above), downloads the Ruby source tarball specified in that file, applies any patches, and compiles it into `~/.rbenv/versions/2.0.0-p247/`. The patched tarball path in the definition file is exactly what we modified with that `sed` command.

For day-to-day use, the key commands are:

- `rbenv global 2.0.0-p247` — sets the default Ruby for the entire user account
- `rbenv local 2.0.0-p247` — writes a `.ruby-version` file in the current directory, which rbenv reads automatically when you enter that directory
- `rbenv versions` — lists every installed Ruby version, marking the active one with an asterisk

The `.ruby-version` file pattern is the important one for DevOps work. Check it into the repo alongside the application code and every developer on the team, plus your CI system, picks up the right Ruby version automatically — as long as they're using rbenv. No more "works on my machine" Ruby version mismatches. See the [ruby-build docs](https://github.com/rbenv/ruby-build) for the full list of installable versions and build options.

## Verifying the Installation

After running the script, confirm that everything worked before wiring the Ruby version into any application:

```bash
rbenv versions
ruby --version
ruby -e "require 'openssl'; puts OpenSSL::OPENSSL_VERSION"
```

`rbenv versions` shows all installed versions and which one is currently active. `ruby --version` confirms the shim is pointing to the right place. The third command is the critical one — it attempts to load the OpenSSL extension at runtime and prints the version string if it succeeds.

If `require 'openssl'` raises a `LoadError`, the patch didn't take. The most common cause is a path mismatch: the `sed` command in the script rewrites the tarball URL in the ruby-build definition file, and if the filename in that sed substitution doesn't exactly match the patched tarball you created, ruby-build will try to download the original unpatched tarball from the internet. Double-check that `file:///tmp/ruby-build/2.0.0-p247` points to where you actually put the patched tarball.

## Modern Alternative: Use a Supported Ruby Version

Ruby 2.0.0 hit end-of-life in February 2016. If you're reading this post to understand how to set up Ruby today, skip the patching entirely and just install a current version:

```bash
rbenv install 3.3.0
rbenv global 3.3.0
```

No patching required. Modern Ruby versions are built with OpenSSL 3.x compatibility and the ruby-build definition files are kept up to date. The [Ruby downloads page](https://www.ruby-lang.org/en/downloads/) tracks the current stable release.

The workflow in this post — download a build definition, modify it to point at a patched source tarball, compile — is the debugging pattern worth carrying forward. When a `rbenv install` fails or produces a broken binary, the fix usually lives in the build definition file or in a source-level patch applied before compilation. That mental model applies to other rbenv-managed runtimes too: nodenv, pyenv, and goenv all use the same plugin architecture for the same reason.
