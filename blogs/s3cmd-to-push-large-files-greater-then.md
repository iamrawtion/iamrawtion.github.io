---
title: "s3cmd to push large files greater than 5GB to Amazon S3"
date: "2015-04-23"
category: "DevOps"
tags: ["AWS", "Devops", "S3", "s3cmd"]
excerpt: "image credits: Stefano Bertolo Use command line utility to push s3cmd files on Amazon S3. Install s3cmd from s3tools.org or apt-get install yum..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiytS_qdC4bkZ3GJnsF1gN3DhitgRxrj_eHBro4IORJ0vYaPLcMqhiY5RWigr9fxD4TBN4olKNg90diJ83_XdulXfGlJEP0rufmE6E9_8WGmj89mCEtrQayo4zooYDg5VWORHOzNct4uMY/s1600/11711725656_fbe0919b55_m.jpg)

image credits:  [Stefano Bertolo](**https**://www.flickr.com/photos/stefanobe/)

  
Use command line utility to push s3cmd files on Amazon S3.  
  
Install s3cmd from s3tools.org or  
```bash
apt-get install yum install s3cmd OR s3cmd  
```

  
Configure s3cmd by  
vim ~ / .s3cfg  
  
<Paste những info add to it and you access-key and secret-key>  
  
[Default]  
access_key = TUOWAAA99023990001  
access_token =   
add_encoding_exts =   
add_headers =   
bucket_location = US   
cache_file =   
cloudfront_host = cloudfront.amazonaws.com   
default_mime_type = binary / octet-stream   
delay_updates = False   
delete_after = False   
delete_after_fetch = False   
delete_removed = False   
dry_run = False   
enable_multipart = True   
encoding = UTF-8   
encrypt = False   
EXPIRY_DATE =   
expiry_days =   
expiry_prefix =   
follow_symlinks = False   
force = False   
get_continue = False   
gpg_command = / usr / bin / gpg   
```bash
gpg_decrypt =% (gpg_command) s -d --verbose --no-use-agent --batch --yes --passphrase-fd% (passphrase_fd) s -o% (output_file) s% (input_file) s   
gpg_encrypt =% (gpg_command) s -c --verbose --no-use-agent --batch --yes --passphrase-fd% (passphrase_fd) s -o% (output_file) s% (input_file) s   
gpg_passphrase =   
guess_mime_type = True   
host_base = s3.amazonaws.com   
host_bucket =% (bucket) s.s3.amazonaws.com   
human_readable_sizes = False   
ignore_failed_copy = False   
invalidate_default_index_on_cf = False   
invalidate_default_index_root_on_cf = True   
invalidate_on_cf = False   
list_md5 = False   
log_target_prefix =   
max_delete = -1   
mime_type =   
multipart_chunk_size_mb = 15   
preserve_attrs = True   
progress_meter = True   
proxy_host =   
proxy_port = 0   
put_continue = False   
recursive = False   
recv_chunk = 4096   
reduced_redundancy = False   
restore_days = 1   
secret_key = sd / ceP_vbb # eDDDK   
send_chunk = 4096   
server_side_encryption = False   
simpledb_host = sdb.amazonaws.com   
skip_existing = False   
socket_timeout = 300   
urlencoding_mode = normal   
use_https = True   
use_mime_magic = True   
verbosity = WARNING   
website_endpoint = http: //% (bucket) s.s3-their Website% (location) s.amazonaws.com/   
website_error =   
website_index = index.html  
```

  
access_key = YOUR-ACCESS-KEY-HERE  
You can see how to use s3cmd at: **http**://s3tools.org/usage  
  
Here I came across a typical scenario where I could not upload files greater than 5GB. You could do this to print two Ways:  
  
  

1. Using the --multipart-chunk-size-mb flag: s3cmd put --multipart-chunk-size-mb = 4096 201412.tar.gz s3: // **apache**-logs / I could not do this since I Had an older version of s3cmd installed and I did not really have time to download and install những version.
2. Splitting Into the large files using small files and then uploading it split command.

- Original file


-rw-r - r--. 1 root root 5.4G Jan 20 06:54 201412.tar.gz  

- Split Command


split -b 3G 2014backup.tar.gz "201 412"  

- Post Split


  
-rw-r - r--. 1 root root 23 Apr 06:41 3.0G 201412aa  
-rw-r - r--. 1 root root 23 Apr 06:43 2.4G 201412ab  
  

- Upload files những


  
201 412 * s3cmd put s3: // **apache**-logs /  
  
Saved some time :)