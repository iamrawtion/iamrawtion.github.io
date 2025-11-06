---
title: "Shell Scripting Tuts"
date: "2013-08-07"
category: "Linux"
tags: []
excerpt: "Some rights reserved by Linux Screenshots VIM shortcuts :tabfind open new tab :tabn and tabp for next and previous tabs :tabedit to open a new tab..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHPsNKxvkPes_NIElZEF3nDv-Ct9eREUoYWitDPXBK470bsB4q3eFauJTxlI1poLagbwlK_aYeG20tg3Jtp1Cqf3VUXvgbDmXBN5-ZjocZcRNGq2wEAhQQeyPJv4aKjDjnJHPtqhTqeQY/s1600/13478258804_044ffdb668_m.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHPsNKxvkPes_NIElZEF3nDv-Ct9eREUoYWitDPXBK470bsB4q3eFauJTxlI1poLagbwlK_aYeG20tg3Jtp1Cqf3VUXvgbDmXBN5-ZjocZcRNGq2wEAhQQeyPJv4aKjDjnJHPtqhTqeQY/s1600/13478258804_044ffdb668_m.jpg)

Some rights reserved by [Linux Screenshots](https://www.flickr.com/photos/xmodulo/)

  
  
VIM shortcuts  
:tabfind open new tab  
:tabn and tabp for next and previous tabs  
:tabedit to open a new tab with a new filename  
esc v for marking, d to cut, y to copy, p to paste   
:wrap to enable wordwrap  
  
Shell Scripting  
1. Use any scripting editor, i will use VIM  
  
2. After the shell script is complete set execute permission to the script for the script to execute. The permissions can be changed by the command chmod.   
    Syntax is  
    chmod permission your-script name  
    e.g  
    $ chmod +x script  
    $ chmod 755 script  
    755 sets permission for user (read 4 write 2 execute 1) group and others (read 4 execute 1)  
  
3. Executing your script : There are three ways of executing a script:  
    Syntax:  
        bash script-name  
        sh script-name  
        ./script-name  
    E.g  
        $ bash script  
        $ sh script  
        $ ./script  
    Note: ./means current directory. But only .(dot) means execute a given command in the current shell without starting a new copy of the shell. The syntax for .(dot) command is . command-name e.g $ . foo  
# This is my 1st shell program  
clear  
echo "Knowledge is Power"  
Anything after "#" is a comment  
clear - this will clear the screen  
echo - prints the message  
  
4. The computer memory is divided into small locations and each location is called as a memory address. These memory addresses hold data in them. A programmer can give a name to these memory locations. This is called as variable. These variable can take values.  
Linux has two types of variables:  
i. System Variables (Maintained by Linux system, seen in caps case)  
ii. User defined varibales (User defined, small case)  
Variable declaration:  
n=10  
Dont put spaces on either side of the equals sign that should give an error. Variables are case sensitive. While printing the values of the variables use the '$' symbol, e.g echo $n  
  
5. Shell Arithmetic  
The term expr is used to perform arithmetic operations in shell.   
Syntax : expr op1 operator op2  
e.g  
$ expr 1 + 3  
$ expr 2 - 1  
$ expr 10 / 2  
$ expr 20 % 3  
$ expr 10 \* 3  
$ echo `expr 6 + 3`  
  
Note : Backticks ` is called backtick and this is mean to execute any command in the script e.g echo "today is `date`"   
  
6. Exit status  
By default in Linux if any command is executed, it would return two types of values, 1. 0 (ZERO) 2. Non ZERO  
zero is success while non zero is not  
This is called as the exit status of the command. By default to find the exist status of any command. Just do a $? will give you the exit status  
e.g In the terminal try removing a file that does not exist rm newfile, Now do an echo $? it should give you a non zero value. Now do an ls and again echo $? it should give you a 0  
  
7. User input  
to accept an input from the user, use the command 'read'  
read var1, var2, var3  
  
8. WildCards  
There are three wildcards in shell  
?, *, [...]  
? - will Match a single character  
* - will Match a group of characters  
[...]* - will match a group of characters in the mentioned set  
e.g  
[abc]* will look for all the matches starting with a,b and c  
[!abcd] or [!a-d] everything except a,b,c,d  
  
Note: If you want to execute two or more commands in one line, use a semicolon  
e.g ls; who; date; cal  
  
9. Command line arguments  
Some commands need arguments to be passed. e.g if you do an rm, you would need to specify the file you want to remove. The specifying of the file is the command line argument to that command. For every shell script there is a command line argument that cane be specified by $<number>. $0 is the name of the script. $1 is the 1st argument. $2 is the 2nd argument and so on...  
  
10. Redirection of Standard input output  
Three symbols are used for redirection'  
> , < , >>   
> : command > file : this will write to the file provided  
< : command < file : take input from the file provided  
>> : command >> file : will append input to the file if file already exist  
  
11. Pipes  
pipe is a utility to connect the output of one program to the input of another program without any temporary file. Pipe is a temporary storage place, where the output of one command is stored, and then passed to the input of another command. Pipes are used to run more than two commands for the same command line.  
$ ls | more  
$ who | sort   
$ who | sort > user_list  
$ who | wc -l   
$ ls -l | wc  -l   
$ who | grep raju  
  
12. Filters  
If a Linux command accepts its input from the standard input and produces its output on standard output is know as a filter. A filter performs some kind of process on the input and gives output. For e.g.. Suppose you have file called 'hotel.txt' with 100 lines data, And from 'hotel.txt' you would like to print contains from line number 20 to line number 30 and store this result to file called 'hlist' then give command:  
$ tail +20 < hotel.txt | head -n30 >hlist  
  
13. If Condition  
if is used for decision making. If a particular condition is true command1 is executed.   
Syntax:  
if condition  
then  
  command1  
fi  
  
condition is comparison between values, comparison can be done using the expr operator or the by cheking the exit status.  
#!/bin/bash  
if cat $1  
then  
  echo "$1 file found on this location"  
fi  
  
if [ $2 -gt 0 ]   
then  
  echo "$2 positive number"  
fi  
  
if [ -f $3 ]  
then  
  echo "$3 file exists"  
fi  
  
if...else...if  
#!/bin/bash  
if [ -f $1 ]  
then  
  echo "$1 exist"  
else  
  if [ -f $2 ]  
  then  
    echo "$2 exist"  
  else  
    if [ -f $3 ]  
    then  
      echo "$3 exist"  
    fi    
  fi    
fi  
execution  
$ sh -x shell3.sh asdff adfdag shell1.sh   
+ [ -f asdff ]  
+ [ -f adfdag ]  
+ [ -f shell1.sh ]  
+ echo shell1.sh exist  
shell1.sh exist  
$ sh -x shell3.sh asdff shell2.sh shell1.sh   
+ [ -f asdff ]  
+ [ -f shell2.sh ]  
+ echo shell2.sh exist  
shell2.sh exist  
$ sh -x shell3.sh shell3.sh shell2.sh shell1.sh   
+ [ -f shell3.sh ]  
+ echo shell3.sh exist  
shell3.sh exist  
  
#!/bin/bash  
echo "1. Linux \n 2. Windows \n 3. None"  
read ch  
if [ $ch -eq 1 ]   
then  
  echo "You seem like a geek"  
else  
  echo "You are good"  
  if [ $ch -eq 3 ]   
  then  
    echo " But, I dont know, what you do"  
  fi    
fi  
  
#!/bin/bash  
echo "1. student\n2.work\n3.none"  
read ch  
if [ $ch -eq 1 ]   
then  
  echo "Happy Studying"  
elif [ $ch -eq 2 ]   
then  
  echo "You should study too"  
elif [ $ch -eq 3 ]   
then  
  echo "Study an get a job"  
fi  
  
  
  
14. Looping in Shell  
Looping is execution of a particular expression time and again until a particular condition is satisfied.  
bash supports for loops and while loops  
looping needs 1. initializing of a variable, 2. test condition in beginning, 3. body of loop at the end modifies the initialized variable  
  
15. For Loop  
  
Syntax:  
  
for { variable name } in { list }  
do  
execute one for each item in the list until the list is  
not finished (And repeat all statement between do and done)  
done  
  
  e.g  
  
for i in 1 2 3 4 5  
do  
echo "Welcome $i times"  
done  
  
#!/bin/bash  
for i in `seq 1 10`  
do  
  echo "Welcome $i times"  
done  
  
  
16. While loops  
 Syntax:  
  
while [ condition ]  
  do  
     command1  
     command2  
     command3  
  done  
  
To be contd...