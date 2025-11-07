---
title: "Josephus Problem Ruby Code"
date: "2012-08-27"
category: "Programming"
tags: []
excerpt: "Ruby code for solving josephus problem. Although the presentation isn't good enough. This was my first Ruby exercise so ignore the mistakes in it......"
author: "Roshan Nagekar"
---

Ruby code for solving josephus problem. Although the presentation isn't good enough. This was my first Ruby exercise so ignore the mistakes in it... :P

#! /usr/bin/ruby -w
class List
  attr_accessor :element,:next_element,:last_element
  def initialize(element)
      @element = element
      @next_element = nil
      @last_element = nil
  end
end
number = ARGV[0]
number=number.to_i
first = List.new(1)
temp = first
for i in 2..number
  temp=temp.next_element = List.new(i)
end
temp.next_element = temp.last_element
temp.next_element = first
temp = first
count=0
while temp.next_element.next_element != temp
  count = count + 2
  if count % 100 == 0
    puts "100 killed total count #{number+1}"
    temp.last_element= List.new(number = number + 1 )
  end
  temp = temp.next_element = temp.next_element.next_element = temp.next_element.next_element.next_element
end
STDOUT.puts "last one is #{temp.element.to_s}"
