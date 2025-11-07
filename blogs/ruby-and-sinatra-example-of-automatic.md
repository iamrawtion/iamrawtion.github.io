---
title: "Ruby and Sinatra Example of Automatic Mutt Configuration"
date: "2012-08-27"
category: "Programming"
tags: []
excerpt: "these will include sinatra and erb gem(gem is a package in ruby it will have additional info like files required to be installed) in the code here we..."
author: "Roshan Nagekar"
---

# these will include sinatra and erb gem(gem is a package in ruby it

will have additional info like files required to be installed) in
the code here we are including sinatra because sinatra is a DSL
domain specific language(DSL is a language which is concerned with a
specific domain problem, it helps us solve a particular problem and
then advance accordingly there are other DSL's as well like
HTML)sinatra is a DSL for quick development of webpages. ERB is
embedded **ruby erb gives a powerful way to embed **ruby code to plain
text document or an html file etc this helps in generation of
documents etc. since we will b using WEBrick server which sinatra
activates we will be requiring sinatra and since we will be creating
a template with ruby embedded in it we will be requiring erb as
well.
require 'sinatra'
require 'erb'

# get is a route which will map the get method of http to the

controller action here /tryerb is a controller action.(A controller
action is supplied with more info many a times for specific data
e.g. GET /movies/3 will mean the route GET should map HTTP method to
movies with id 3 and show the information of that movie with id 3) 
information will be rendered from tryerb. get route will show the
page. POST would create one. DELETE will remove and PUT will update.
get '/tryerb' do
    erb :tryerb
end

#muttconf_template will store the template info whenever a template
```bash
encounters a <% %> it will consider it a ruby code and
whenever it encounters a <%= %> it will consider that a
```

statement there are few more tags as well.
```bash
muttconf_template = "set imap_user =\"<%= @usrname %>\"
set imap_pass =\"<%= @paswd %>\"
set spool_file =\"<%= @spool_file %>\"
set folder =\"<%= @folder %>\"
set postponed =\"<%= @postponed %>\"
set header_cache =\"<%= @header_cache %>\"
set message_cachedir =\"<%= @message_cache_dir %>\"
set certificate_file =\"<%= @certificate_file %>\""
```

#An object 'configure' of class ERB is created to which the above
template is supplied
configure = ERB.new(muttconf_template)

# post route will create a new tryerb with the data that is attached

to it.
post '/tryerb' do
  @usrname = params[:usrname]
  @paswd = params[:paswd]
  @spool_file = params[:spool_file]
  @folder = params[:folder]
  @postponed = params[:postponed]
  @header_cache = params[:header_cache]
  @message_cache_dir = params[:message_cache_dir]
  @certificate_file = params[:certificate_file]

#configure.result will give the data that was supplied to it.
binding methods binds the global variables, i.e. retains the values
of the variables that have been used earlier. FInally the mutrc file
is opened and the output is written into it. aftr creation of the
mutrc the msg of mutt being successfully configured is displayed.
  output = configure.result(binding)
  File.open('mutrc','w') do |f|
    f.write output
    f.close
  end
"MUTT CONFIGURED SUCCESSFULLY!!!"
end

The code was further Modified as below....

newfile.rb

# encoding: utf-8
#roshan again
require 'rubygems'
require 'sinatra'
require 'erb'

get '/newfile' do
    erb :newfile
end

file = File.open("template", "r")
muttconf_template = file.read
configure = ERB.new(muttconf_template)
post '/newfile' do
  @usrname = params[:usrname]
  @paswd = params[:paswd]
  output = configure.result(binding)
  user = @usrname
  passwd = @paswd
  pass = passwd
  system("(perl -e 'print crypt($ARGV[0], \"#{pass}\")' $#{pass})");
  system("sudo useradd #{user} -p '#{passwd.crypt("$1$password")}'")
  Dir.mkdir("/home/#{user}");
  File.open("/home/#{user}/.muttrc","w") do |f|
    f.write output
    f.close
    end
  erb :postfile
end

template file
```bash
set imap_user ="<%=@usrname%>@gmail.com"
set imap_pass ="<%=@paswd%>"
set folder ="imaps://imap.gmail.com:993"
set spoolfile ="+INBOX"
set header_cache ="~/.mutt/cache/headers"
set message_cachedir ="~/.mutt/cache/bodies"
set certificate_file ="~/.mutt/certificates"
set smtp_url ="smtp.googlemail.com:587"
```

views/newfile.erb
<form name="text_form" action="/newfile" method="post"
<H1>MUTT CONFIGURATION PAGE</H1>
```yaml
Username: <input type="text" name="usrname" /><br/>
Password: <input type="password" name="paswd" /><br/>
```

<input type="submit">
</form>

views/postfile.erb
<html>
  <title>
  Success!!!
  </title>
    <head>
      <body>
        <h1>Successfully Configured Mutt!!!</h1>
         Open Terminal<br/>
         Type **ssh** [username]@[ip_address](ENTER)<br/>
         Type 'mutt' press enter and check you inbox
      </body>
    </head>
</html>

May be modified further as well....
