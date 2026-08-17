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

## What Is the Josephus Problem?

The Josephus problem has one of the more dramatic origin stories in mathematics. According to the Jewish historian Flavius Josephus, during the Romano-Jewish War of 67 CE, he and 40 soldiers were trapped in a cave by Roman forces. Rather than surrender, the group agreed to form a circle and kill every other person until only one remained — who would then surrender. Josephus, allegedly with some quick mathematical thinking, chose his position in the circle such that he would be the last one standing. He then surrendered to the Romans and lived to write about it.

Whether the story is accurate or embellished, the problem it describes became a classic in combinatorics and computer science: given *n* people standing in a circle, and starting from position 1, every *k*-th person is eliminated. Where should you stand to be the last one eliminated?

The most common version (and the one in the code above) uses k=2, meaning every second person is eliminated. It shows up frequently in programming interviews and algorithm courses because it exercises several skills at once: circular data structure manipulation, understanding loop termination conditions, and reasoning about off-by-one errors. It is simple enough to state in one sentence but subtle enough to implement incorrectly on a first pass.

More reading: [Josephus problem on Wikipedia](https://en.wikipedia.org/wiki/Josephus_problem) and a thorough walkthrough at [GeeksforGeeks](https://www.geeksforgeeks.org/josephus-problem/).

## How the Code Works

The implementation above uses a linked-list approach to simulate the circle directly. Here is what each part does:

**The `List` class** models a single node in the circular linked list. Each node holds its value (`element`) and references to the next node (`next_element`) and the previous node (`last_element`). The naming is a little unconventional — `last_element` is used as a tail pointer during construction rather than strictly as a "previous" reference — which is part of what the author acknowledged as a first-pass implementation.

**Building the circle:** The loop `for i in 2..number` appends nodes 2 through n to the list. After the loop, `temp.next_element = first` closes the circle by pointing the tail back to the head, giving you a circular linked list of n people.

**The elimination loop:** `while temp.next_element.next_element != temp` keeps running as long as there are at least two other people ahead of the current node. Inside, the key line `temp = temp.next_element = temp.next_element.next_element = temp.next_element.next_element.next_element` does the heavy lifting: it skips one person (the one being eliminated) and advances the current pointer to the next survivor. The eliminated node is effectively bypassed because no remaining reference points to it.

**The counter:** Every 100 eliminations, the code inserts a new node with an incrementing number. This appears to be an experiment with extending the list dynamically rather than a standard Josephus implementation — a sign of exploring the data structure rather than just solving the problem.

**The output:** `STDOUT.puts "last one is #{temp.element.to_s}"` prints the value of whichever node remains when the loop exits.

## Alternative Approaches

The linked-list simulation works but has O(n) time and space complexity. There is a well-known mathematical shortcut for the k=2 case that runs in O(log n):

Given n people, find the largest power of 2 less than or equal to n, call it `2^p`. The safe position is:

```
result = 2 * (n - 2^p) + 1
```

In Ruby:

```ruby
def josephus_math(n)
  p = Math.log2(n).floor
  2 * (n - 2**p) + 1
end

puts josephus_math(40)  # => 17, which is where Josephus supposedly stood
```

There is also a clean recursive formulation for the general k=2 case:

```ruby
def josephus(n)
  return 1 if n == 1
  (josephus(n - 1) + 1) % n + 1
end

puts josephus(7)  # => 7
```

This recursion works because after the first elimination, you have a smaller version of the same problem with a shifted starting position. The formula accounts for that shift at each level of recursion.

## When This Pattern Appears

The Josephus problem is not just a historical curiosity. The same circular-elimination pattern shows up in practical computer science contexts:

**Round-robin scheduling:** Operating systems often distribute CPU time, network bandwidth, or task queues across processes in a circular fashion. Knowing where you are in a rotation and how to reason about circular order is directly applicable.

**Hot potato / token passing:** In distributed systems, a token is sometimes passed around a ring of nodes to control write access or resource usage. Understanding the elimination dynamics of circular traversal helps reason about deadlock and starvation scenarios.

**Circular buffer management:** Ring buffers — used in everything from audio processing to network packet queues — wrap around when they hit their endpoint. The pointer arithmetic involved is the same kind of modular thinking the Josephus problem trains.

**Interview problems involving rotation:** Many array-rotation problems, "find the missing element in a rotated array" questions, and similar interview prompts are structurally related to circular traversal. Working through Josephus gives you intuition for this class of problem.
