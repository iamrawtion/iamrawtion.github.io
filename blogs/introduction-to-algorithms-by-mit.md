---
title: "Introduction to algorithms by MIT"
date: "2012-06-08"
category: "Programming"
tags: []
excerpt: "This blog is an extract from MIT's Introduction to Algorithm First part of the course ids focused on Analysis. Second part is focused on design i.e...."
author: "Roshan Nagekar"
---

Lecture 1

This blog is an extract from MIT's Introduction to Algorithm
course.

First part of the course ids focused on Analysis. Second part is
focused on design i.e. before u design algorithms; you have to master and
analyze a bunch of algorithms. Analysis is a theoretical study of a computer
program performance and resource usage.

How to make fast and memory reliable programs?

What is more important than performance?

1.       
correctness

2.       
simplicity

3.       
maintainability

4.       
cost(programmer’s
time)

5.       
stability(robustness)

6.       
features(functionality)

7.       
modularity(changes
implementation easy)

8.       
security

9.       
scalability

10.    
user
friendliness

Then, why study algorithm and performance?

Some times performance is correlated to user friendliness. Some
times there are real time constraints. i.e. the software wont work untilit
performs a function for a particular time. Performance measures the line
between feasible and infeasible. In real time , if it is not fast enough, its
as good as not functional. If it simply uses more memory, its not going to work
for you.

**Algorithms are at the
cutting edge of entrepreneurship.** If you are thinking of doing something that already exists,
performance isn’t that necessary. But, if you are planning to do something’s
that’s never done before, than its most important.

The reason why performance is
at the bottom of the heap is because performance is just like money. What good
is a $100 bill for you? Instead you would want to have food worth $100, that
should be of some use to you. Performance is something you pay for. E.g you pay
for user friendliness, you pay for security, etc.

So for this reason, a user
may gor for JAVA instead of C for it may be slow, but it gives more
functionality like exceptions, Object Orientations,etc.

```yaml
PROBLEM: INSERTION SORT

Input: sequence
```

<a1,a2,a3,….,an>of numbers

Output:
permutations<a’1,a’2,a’3,…..,a’n>

Such that a’1 <= a’2 <=
a’3 <= ….. <= a’n

Pseudo code:

Insertion_Sort(A,n) //Sorts
A[1….n]

for j = 2 to n

do key = A[j]

i = j-1

```bash
while i>0 and A[i]>key
```


do A[i+1] = A[i]

i=i-1

A[i+1]=key

Figure 1

![](file:///C:/DOCUME~1/Roshan/LOCALS~1/Temp/msohtml1/01/clip_image002.jpg)

It basically takes array A[] and at any point we are
running the outer loop of j from 2 to n and the inner loop that starts with i =
j-1 and goes until i = 0 .  so we are
looking at some element j in the algorithm, and then we pull out here a value
called a key and the important thing to note is that there is an invariant that
is being maintained by the loop each time through. The invariant is that the
LEFT part of the array in the above figure 1 is sorted. And the goal each time
through the loop is to add one to the length of the strings that are sorted.
And the way we do that is we pull out the key, and we just copy the value up
like the arrows shown until we find a place for the key shown and then INSERT
it in that place, hence the name INSERTION SORT. Once we have arrays till j
sorted we go for j+1. now let us see an example for the same.

Example

8 **2** 4 9 3

2 8 **4** 9 3

2 4 8 **9** 3

2 4 8 9 **3**

2 3 4 8 9 sorted

Analysis of this algorithm

Running time:

1. Depends on input. (e.g if already sorted,
   insertion sort has very little to do, cos every time we try to sort it
   would be like the step number 3 above where 9 is already sorted and was at
   its correct position so you don’t need to move it. Worst case is if its
   reverse sorted then there will be a lot of work to do, lot of shuffling to
   do as well.
2. Depends on the input size. (6 elements less time
   10 elements more time) so large number of elements means long time for
   sorting. So we handle it by:

-         
parameterize
things in the input size.

3. generally we want upper
bound on running time i.e we want to know that the time is no more than  a certain amount reason being that represents
a guarantee to the user. E.g if I tell you that there’s  aprogram that wont run more than 3 seconds,
that gives you real information about how you could use it for example in a
real time setting. And if I say there’s a program that goes for at least 3
seconds, it could go for years. That doesn’t give you a guarantee if you are a
user.

- guarantee to the user.


Different kinds of analysis :

Worst case analysis: this is
done usually

Where T(n) = maximum time on
any input of size n

So as we saw running time
depends on input that some times the inputs are better like in sort if already
sorted less time and if reverse sorted maximum time. So we are looking at the
worst case. If T(n) is not for maximum time then T(n) is a relation and not a
function, because the time on input size n will depend on which input of size
n, I can have many different times. But by putting a maximum at it, turns that
relation into a function, cos there’s only one maximum time.

Average case analysis: this
is done sometimes.

Where T(n) = expected time
over all inputs of size n

What is expected time? Time
of every input and average them? Time of every input times of probability that
it will be there that it would occur. How do we know the probability time of
every input occurs is?

Well we don’t know it.

So we need an assumption of
statistical distribution of inputs. Common assumption is that all inputs are
equally likely that’s called uniform distribution.

Best case analysis: bogus

Because its already done. You
can cheat, it doesn’t tell u of the vast majority cases.

What is insertion sort’s
worst case time?

Depends on computer you are
running on.

-         
Compare two
algorithm for Relative speed (on same machine)

-         
Absolute speed
(if onde algorithm is betr than the other no matter what machine it runs on.

Asymptotic analysis: ignore
```bash
machine dependent constants and look at growth of running time T(n) as n -> ∞
```


Asymptotic notations

(Theta notation) q -
notation:

Drop low order terms and ignore leading constants

e.g if there is a formula 3n^3+90n^2-5n+6046= q(n^3)

here n^3 is a bigger term than n^2 , n and all the leading
terms thus it becomes q(n^3)

```bash
as n -> ∞ , q(n^2) algorithm always beats a q(n^3) algorithm.
```


n^2 will be faster than n^3

![](file:///C:/DOCUME~1/Roshan/LOCALS~1/Temp/msohtml1/01/clip_image004.jpg)

There will always be a point n0
where q(n^2) algorithm will be cheaper
than q(n^3) algorithm

Insertion sort analysis

Worst case: input reverse sorted
biggest element comes 1st and smallest comes last.

T(n)= S j=2 to n q(j)
= q(n^2) (arithmetic series)

Is insertion sort fast? Moderately
fast for small n but not for large n. Merge sort is faster instead.

**MERGE SORT**

```json
Merge sort A[1….N}

1.       
If n =1 done

2.       
 Recursively sort  
A[1….[n/2]] and  
A[[n/2]+1….n]

3.       
Merge 2 sorted lists

Key subroutine here is merge and
it works like this one of them is

20 13 7 2

12 11 9 1

We look at the two sorted arrays
and see where is the smallest element and now we find 1 and two are smallest so
we now look for the smallest of them and place the smallest in the new list so
1 is placed in new list. Now we compare the 1st element of first
list and 2nd element from second list, similarly

Time = q(n) on n total elements

Recurrence for the program

q(1)

2T(n/2)

q(n)

Performance of merge sort T(n) = q(1) if n=1 (omit usually),2T(n/2)+ q(n) if n>1

Recursion tree T(n)=2T(n/2)+cn
const c>0

T(n) = cn - > T(n/2) 2
times
```
