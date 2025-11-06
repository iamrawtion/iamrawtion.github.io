---
title: "How to get a Flow of a Simple C program"
date: "2013-01-26"
category: "Linux"
tags: []
excerpt: "Some rights reserved by Hillary command for generation of preprocessed code which will have the included files in the code as well as the code that..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtdEo4HaTEm247utBoc6XCapiAYgpBHhWTZORQFsj5zApSGybrO2rtitjR4yk7pbWeZLmuT4F91Qi9gzOey8YAVkFy7_NphM3Mc9KgaSWyHrwku-cvqyaq1CHAbAFlhMpMHpIhYP12pSo/s1600/4289878224_8c71d2be5e_m.jpg)

Some rights reserved by [Hillary](**https**://www.flickr.com/photos/lamenta3/)

```
 
```
```
 
```
```
command for generation of preprocessed code which will have the included 
files in the code as well as the code that we have written
gcc -E test.c > test.pp

object code post compilation that we always do.
gcc test.c test2.c -o test.o

the assembly dump of the code generated.
objdump -d test.o
```
```
 
```
```
test.c
```
```
 
```
```
 
```
```
#include <stdio.h>

#include <stdlib.h>

double add(int,int);

int main()

{

 printf("%f\n", add(1,2));

 return 0;

}

 
```
```
```
```
```
```
test.pp
```
```
# 1 "test.c"

# 1 "<built-in>"

# 1 "<command-line>"

# 1 "test.c"

# 1 "/usr/include/stdio.h" 1 3 4

# 28 "/usr/include/stdio.h" 3 4

# 1 "/usr/include/features.h" 1 3 4

# 322 "/usr/include/features.h" 3 4

# 1 "/usr/include/bits/predefs.h" 1 3 4

# 323 "/usr/include/features.h" 2 3 4

# 355 "/usr/include/features.h" 3 4

# 1 "/usr/include/sys/cdefs.h" 1 3 4

# 353 "/usr/include/sys/cdefs.h" 3 4

# 1 "/usr/include/bits/wordsize.h" 1 3 4

# 354 "/usr/include/sys/cdefs.h" 2 3 4

# 356 "/usr/include/features.h" 2 3 4

# 387 "/usr/include/features.h" 3 4

# 1 "/usr/include/gnu/stubs.h" 1 3 4

# 1 "/usr/include/bits/wordsize.h" 1 3 4

# 5 "/usr/include/gnu/stubs.h" 2 3 4

# 1 "/usr/include/gnu/stubs-32.h" 1 3 4

# 8 "/usr/include/gnu/stubs.h" 2 3 4

# 388 "/usr/include/features.h" 2 3 4

# 29 "/usr/include/stdio.h" 2 3 4

# 1 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stddef.h" 1 3 4

# 211 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stddef.h" 3 4

typedef unsigned int size_t;

# 35 "/usr/include/stdio.h" 2 3 4

# 1 "/usr/include/bits/types.h" 1 3 4

# 28 "/usr/include/bits/types.h" 3 4

# 1 "/usr/include/bits/wordsize.h" 1 3 4

# 29 "/usr/include/bits/types.h" 2 3 4

typedef unsigned char __u_char;

typedef unsigned short int __u_short;

typedef unsigned int __u_int;

typedef unsigned long int __u_long;

typedef signed char __int8_t;

typedef unsigned char __uint8_t;

typedef signed short int __int16_t;

typedef unsigned short int __uint16_t;

typedef signed int __int32_t;

typedef unsigned int __uint32_t;

__extension__ typedef signed long long int __int64_t;

__extension__ typedef unsigned long long int __uint64_t;

__extension__ typedef long long int __quad_t;

__extension__ typedef unsigned long long int __u_quad_t;

# 131 "/usr/include/bits/types.h" 3 4

# 1 "/usr/include/bits/typesizes.h" 1 3 4

# 132 "/usr/include/bits/types.h" 2 3 4

__extension__ typedef __u_quad_t __dev_t;

__extension__ typedef unsigned int __uid_t;

__extension__ typedef unsigned int __gid_t;

__extension__ typedef unsigned long int __ino_t;

__extension__ typedef __u_quad_t __ino64_t;

__extension__ typedef unsigned int __mode_t;

__extension__ typedef unsigned int __nlink_t;

__extension__ typedef long int __off_t;

__extension__ typedef __quad_t __off64_t;

__extension__ typedef int __pid_t;

__extension__ typedef struct { int __val[2]; } __fsid_t;

__extension__ typedef long int __clock_t;

__extension__ typedef unsigned long int __rlim_t;

__extension__ typedef __u_quad_t __rlim64_t;

__extension__ typedef unsigned int __id_t;

__extension__ typedef long int __time_t;

__extension__ typedef unsigned int __useconds_t;

__extension__ typedef long int __suseconds_t;

__extension__ typedef int __daddr_t;

__extension__ typedef long int __swblk_t;

__extension__ typedef int __key_t;

__extension__ typedef int __clockid_t;

__extension__ typedef void * __timer_t;

__extension__ typedef long int __blksize_t;

__extension__ typedef long int __blkcnt_t;

__extension__ typedef __quad_t __blkcnt64_t;

__extension__ typedef unsigned long int __fsblkcnt_t;

__extension__ typedef __u_quad_t __fsblkcnt64_t;

__extension__ typedef unsigned long int __fsfilcnt_t;

__extension__ typedef __u_quad_t __fsfilcnt64_t;

__extension__ typedef int __ssize_t;

typedef __off64_t __loff_t;

typedef __quad_t *__qaddr_t;

typedef char *__caddr_t;

__extension__ typedef int __intptr_t;

__extension__ typedef unsigned int __socklen_t;

# 37 "/usr/include/stdio.h" 2 3 4

# 45 "/usr/include/stdio.h" 3 4

struct _IO_FILE;

typedef struct _IO_FILE FILE;

# 65 "/usr/include/stdio.h" 3 4

typedef struct _IO_FILE __FILE;

# 75 "/usr/include/stdio.h" 3 4

# 1 "/usr/include/libio.h" 1 3 4

# 32 "/usr/include/libio.h" 3 4

# 1 "/usr/include/_G_config.h" 1 3 4

# 15 "/usr/include/_G_config.h" 3 4

# 1 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stddef.h" 1 3 4

# 16 "/usr/include/_G_config.h" 2 3 4

# 1 "/usr/include/wchar.h" 1 3 4

# 83 "/usr/include/wchar.h" 3 4

typedef struct

{

  int __count;

  union

  {

    unsigned int __wch;

    char __wchb[4];

  } __value;

} __mbstate_t;

# 21 "/usr/include/_G_config.h" 2 3 4

typedef struct

{

  __off_t __pos;

  __mbstate_t __state;

} _G_fpos_t;

typedef struct

{

  __off64_t __pos;

  __mbstate_t __state;

} _G_fpos64_t;

# 53 "/usr/include/_G_config.h" 3 4

typedef int _G_int16_t __attribute__ ((__mode__ (__HI__)));

typedef int _G_int32_t __attribute__ ((__mode__ (__SI__)));

typedef unsigned int _G_uint16_t __attribute__ ((__mode__ (__HI__)));

typedef unsigned int _G_uint32_t __attribute__ ((__mode__ (__SI__)));

# 33 "/usr/include/libio.h" 2 3 4

# 53 "/usr/include/libio.h" 3 4

# 1 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stdarg.h" 1 3 4

# 40 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stdarg.h" 3 4

typedef __builtin_va_list __gnuc_va_list;

# 54 "/usr/include/libio.h" 2 3 4

# 170 "/usr/include/libio.h" 3 4

struct _IO_jump_t; struct _IO_FILE;

# 180 "/usr/include/libio.h" 3 4

typedef void _IO_lock_t;

struct _IO_marker {

  struct _IO_marker *_next;

  struct _IO_FILE *_sbuf;

  int _pos;

# 203 "/usr/include/libio.h" 3 4

};

enum __codecvt_result

{

  __codecvt_ok,

  __codecvt_partial,

  __codecvt_error,

  __codecvt_noconv

};

# 271 "/usr/include/libio.h" 3 4

struct _IO_FILE {

  int _flags;

  char* _IO_read_ptr;

  char* _IO_read_end;

  char* _IO_read_base;

  char* _IO_write_base;

  char* _IO_write_ptr;

  char* _IO_write_end;

  char* _IO_buf_base;

  char* _IO_buf_end;

  char *_IO_save_base;

  char *_IO_backup_base;

  char *_IO_save_end;

  struct _IO_marker *_markers;

  struct _IO_FILE *_chain;

  int _fileno;

  int _flags2;

  __off_t _old_offset;

  unsigned short _cur_column;

  signed char _vtable_offset;

  char _shortbuf[1];

  _IO_lock_t *_lock;

# 319 "/usr/include/libio.h" 3 4

  __off64_t _offset;

# 328 "/usr/include/libio.h" 3 4

  void *__pad1;

  void *__pad2;

  void *__pad3;

  void *__pad4;

  size_t __pad5;

  int _mode;

  char _unused2[15 * sizeof (int) - 4 * sizeof (void *) - sizeof (size_t)];

};

typedef struct _IO_FILE _IO_FILE;

struct _IO_FILE_plus;

extern struct _IO_FILE_plus _IO_2_1_stdin_;

extern struct _IO_FILE_plus _IO_2_1_stdout_;

extern struct _IO_FILE_plus _IO_2_1_stderr_;

# 364 "/usr/include/libio.h" 3 4

typedef __ssize_t __io_read_fn (void *__cookie, char *__buf, size_t __nbytes);

typedef __ssize_t __io_write_fn (void *__cookie, __const char *__buf,

     size_t __n);

typedef int __io_seek_fn (void *__cookie, __off64_t *__pos, int __w);

typedef int __io_close_fn (void *__cookie);

# 416 "/usr/include/libio.h" 3 4

extern int __underflow (_IO_FILE *);

extern int __uflow (_IO_FILE *);

extern int __overflow (_IO_FILE *, int);

# 460 "/usr/include/libio.h" 3 4

extern int _IO_getc (_IO_FILE *__fp);

extern int _IO_putc (int __c, _IO_FILE *__fp);

extern int _IO_feof (_IO_FILE *__fp) __attribute__ ((__nothrow__));

extern int _IO_ferror (_IO_FILE *__fp) __attribute__ ((__nothrow__));

extern int _IO_peekc_locked (_IO_FILE *__fp);

extern void _IO_flockfile (_IO_FILE *) __attribute__ ((__nothrow__));

extern void _IO_funlockfile (_IO_FILE *) __attribute__ ((__nothrow__));

extern int _IO_ftrylockfile (_IO_FILE *) __attribute__ ((__nothrow__));

# 490 "/usr/include/libio.h" 3 4

extern int _IO_vfscanf (_IO_FILE * __restrict, const char * __restrict,

   __gnuc_va_list, int *__restrict);

extern int _IO_vfprintf (_IO_FILE *__restrict, const char *__restrict,

    __gnuc_va_list);

extern __ssize_t _IO_padn (_IO_FILE *, int, __ssize_t);

extern size_t _IO_sgetn (_IO_FILE *, void *, size_t);

extern __off64_t _IO_seekoff (_IO_FILE *, __off64_t, int, int);

extern __off64_t _IO_seekpos (_IO_FILE *, __off64_t, int);

extern void _IO_free_backup_area (_IO_FILE *) __attribute__ ((__nothrow__));

# 76 "/usr/include/stdio.h" 2 3 4

typedef __gnuc_va_list va_list;

# 91 "/usr/include/stdio.h" 3 4

typedef __off_t off_t;

# 103 "/usr/include/stdio.h" 3 4

typedef __ssize_t ssize_t;

typedef _G_fpos_t fpos_t;

# 161 "/usr/include/stdio.h" 3 4

# 1 "/usr/include/bits/stdio_lim.h" 1 3 4

# 162 "/usr/include/stdio.h" 2 3 4

extern struct _IO_FILE *stdin;

extern struct _IO_FILE *stdout;

extern struct _IO_FILE *stderr;

extern int remove (__const char *__filename) __attribute__ ((__nothrow__));

extern int rename (__const char *__old, __const char *__new) __attribute__ ((__nothrow__));

extern int renameat (int __oldfd, __const char *__old, int __newfd,

       __const char *__new) __attribute__ ((__nothrow__));

extern FILE *tmpfile (void) ;

# 206 "/usr/include/stdio.h" 3 4

extern char *tmpnam (char *__s) __attribute__ ((__nothrow__)) ;

extern char *tmpnam_r (char *__s) __attribute__ ((__nothrow__)) ;

# 224 "/usr/include/stdio.h" 3 4

extern char *tempnam (__const char *__dir, __const char *__pfx)

     __attribute__ ((__nothrow__)) __attribute__ ((__malloc__)) ;

extern int fclose (FILE *__stream);

extern int fflush (FILE *__stream);

# 249 "/usr/include/stdio.h" 3 4

extern int fflush_unlocked (FILE *__stream);

# 263 "/usr/include/stdio.h" 3 4

extern FILE *fopen (__const char *__restrict __filename,

      __const char *__restrict __modes) ;

extern FILE *freopen (__const char *__restrict __filename,

        __const char *__restrict __modes,

        FILE *__restrict __stream) ;

# 292 "/usr/include/stdio.h" 3 4

# 303 "/usr/include/stdio.h" 3 4

extern FILE *fdopen (int __fd, __const char *__modes) __attribute__ ((__nothrow__)) ;

# 316 "/usr/include/stdio.h" 3 4

extern FILE *fmemopen (void *__s, size_t __len, __const char *__modes)

  __attribute__ ((__nothrow__)) ;

extern FILE *open_memstream (char **__bufloc, size_t *__sizeloc) __attribute__ ((__nothrow__)) ;

extern void setbuf (FILE *__restrict __stream, char *__restrict __buf) __attribute__ ((__nothrow__));

extern int setvbuf (FILE *__restrict __stream, char *__restrict __buf,

      int __modes, size_t __n) __attribute__ ((__nothrow__));

extern void setbuffer (FILE *__restrict __stream, char *__restrict __buf,

         size_t __size) __attribute__ ((__nothrow__));

extern void setlinebuf (FILE *__stream) __attribute__ ((__nothrow__));

extern int fprintf (FILE *__restrict __stream,

      __const char *__restrict __format, ...);

extern int printf (__const char *__restrict __format, ...);

extern int sprintf (char *__restrict __s,

      __const char *__restrict __format, ...) __attribute__ ((__nothrow__));

extern int vfprintf (FILE *__restrict __s, __const char *__restrict __format,

       __gnuc_va_list __arg);

extern int vprintf (__const char *__restrict __format, __gnuc_va_list __arg);

extern int vsprintf (char *__restrict __s, __const char *__restrict __format,

       __gnuc_va_list __arg) __attribute__ ((__nothrow__));

extern int snprintf (char *__restrict __s, size_t __maxlen,

       __const char *__restrict __format, ...)

     __attribute__ ((__nothrow__)) __attribute__ ((__format__ (__printf__, 3, 4)));

extern int vsnprintf (char *__restrict __s, size_t __maxlen,

        __const char *__restrict __format, __gnuc_va_list __arg)

     __attribute__ ((__nothrow__)) __attribute__ ((__format__ (__printf__, 3, 0)));

# 414 "/usr/include/stdio.h" 3 4

extern int vdprintf (int __fd, __const char *__restrict __fmt,

       __gnuc_va_list __arg)

     __attribute__ ((__format__ (__printf__, 2, 0)));

extern int dprintf (int __fd, __const char *__restrict __fmt, ...)

     __attribute__ ((__format__ (__printf__, 2, 3)));

extern int fscanf (FILE *__restrict __stream,

     __const char *__restrict __format, ...) ;

extern int scanf (__const char *__restrict __format, ...) ;

extern int sscanf (__const char *__restrict __s,

     __const char *__restrict __format, ...) __attribute__ ((__nothrow__));

# 445 "/usr/include/stdio.h" 3 4

extern int fscanf (FILE *__restrict __stream, __const char *__restrict __format, ...) __asm__ ("" "__isoc99_fscanf") ;

extern int scanf (__const char *__restrict __format, ...) __asm__ ("" "__isoc99_scanf") ;

extern int sscanf (__const char *__restrict __s, __const char *__restrict __format, ...) __asm__ ("" "__isoc99_sscanf") __attribute__ ((__nothrow__));

# 465 "/usr/include/stdio.h" 3 4

extern int vfscanf (FILE *__restrict __s, __const char *__restrict __format,

      __gnuc_va_list __arg)

     __attribute__ ((__format__ (__scanf__, 2, 0))) ;

extern int vscanf (__const char *__restrict __format, __gnuc_va_list __arg)

     __attribute__ ((__format__ (__scanf__, 1, 0))) ;

extern int vsscanf (__const char *__restrict __s,

      __const char *__restrict __format, __gnuc_va_list __arg)

     __attribute__ ((__nothrow__)) __attribute__ ((__format__ (__scanf__, 2, 0)));

# 496 "/usr/include/stdio.h" 3 4

extern int vfscanf (FILE *__restrict __s, __const char *__restrict __format, __gnuc_va_list __arg) __asm__ ("" "__isoc99_vfscanf")

     __attribute__ ((__format__ (__scanf__, 2, 0))) ;

extern int vscanf (__const char *__restrict __format, __gnuc_va_list __arg) __asm__ ("" "__isoc99_vscanf")

     __attribute__ ((__format__ (__scanf__, 1, 0))) ;

extern int vsscanf (__const char *__restrict __s, __const char *__restrict __format, __gnuc_va_list __arg) __asm__ ("" "__isoc99_vsscanf") __attribute__ ((__nothrow__))

     __attribute__ ((__format__ (__scanf__, 2, 0)));

# 524 "/usr/include/stdio.h" 3 4

extern int fgetc (FILE *__stream);

extern int getc (FILE *__stream);

extern int getchar (void);

# 552 "/usr/include/stdio.h" 3 4

extern int getc_unlocked (FILE *__stream);

extern int getchar_unlocked (void);

# 563 "/usr/include/stdio.h" 3 4

extern int fgetc_unlocked (FILE *__stream);

extern int fputc (int __c, FILE *__stream);

extern int putc (int __c, FILE *__stream);

extern int putchar (int __c);

# 596 "/usr/include/stdio.h" 3 4

extern int fputc_unlocked (int __c, FILE *__stream);

extern int putc_unlocked (int __c, FILE *__stream);

extern int putchar_unlocked (int __c);

extern int getw (FILE *__stream);

extern int putw (int __w, FILE *__stream);

extern char *fgets (char *__restrict __s, int __n, FILE *__restrict __stream)

     ;

extern char *gets (char *__s) ;

# 658 "/usr/include/stdio.h" 3 4

extern __ssize_t __getdelim (char **__restrict __lineptr,

          size_t *__restrict __n, int __delimiter,

          FILE *__restrict __stream) ;

extern __ssize_t getdelim (char **__restrict __lineptr,

        size_t *__restrict __n, int __delimiter,

        FILE *__restrict __stream) ;

extern __ssize_t getline (char **__restrict __lineptr,

       size_t *__restrict __n,

       FILE *__restrict __stream) ;

extern int fputs (__const char *__restrict __s, FILE *__restrict __stream);

extern int puts (__const char *__s);

extern int ungetc (int __c, FILE *__stream);

extern size_t fread (void *__restrict __ptr, size_t __size,

       size_t __n, FILE *__restrict __stream) ;

extern size_t fwrite (__const void *__restrict __ptr, size_t __size,

        size_t __n, FILE *__restrict __s);

# 730 "/usr/include/stdio.h" 3 4

extern size_t fread_unlocked (void *__restrict __ptr, size_t __size,

         size_t __n, FILE *__restrict __stream) ;

extern size_t fwrite_unlocked (__const void *__restrict __ptr, size_t __size,

          size_t __n, FILE *__restrict __stream);

extern int fseek (FILE *__stream, long int __off, int __whence);

extern long int ftell (FILE *__stream) ;

extern void rewind (FILE *__stream);

# 766 "/usr/include/stdio.h" 3 4

extern int fseeko (FILE *__stream, __off_t __off, int __whence);

extern __off_t ftello (FILE *__stream) ;

# 785 "/usr/include/stdio.h" 3 4

extern int fgetpos (FILE *__restrict __stream, fpos_t *__restrict __pos);

extern int fsetpos (FILE *__stream, __const fpos_t *__pos);

# 808 "/usr/include/stdio.h" 3 4

# 817 "/usr/include/stdio.h" 3 4

extern void clearerr (FILE *__stream) __attribute__ ((__nothrow__));

extern int feof (FILE *__stream) __attribute__ ((__nothrow__)) ;

extern int ferror (FILE *__stream) __attribute__ ((__nothrow__)) ;

extern void clearerr_unlocked (FILE *__stream) __attribute__ ((__nothrow__));

extern int feof_unlocked (FILE *__stream) __attribute__ ((__nothrow__)) ;

extern int ferror_unlocked (FILE *__stream) __attribute__ ((__nothrow__)) ;

extern void perror (__const char *__s);

# 1 "/usr/include/bits/sys_errlist.h" 1 3 4

# 27 "/usr/include/bits/sys_errlist.h" 3 4

extern int sys_nerr;

extern __const char *__const sys_errlist[];

# 847 "/usr/include/stdio.h" 2 3 4

extern int fileno (FILE *__stream) __attribute__ ((__nothrow__)) ;

extern int fileno_unlocked (FILE *__stream) __attribute__ ((__nothrow__)) ;

# 866 "/usr/include/stdio.h" 3 4

extern FILE *popen (__const char *__command, __const char *__modes) ;

extern int pclose (FILE *__stream);

extern char *ctermid (char *__s) __attribute__ ((__nothrow__));

# 906 "/usr/include/stdio.h" 3 4

extern void flockfile (FILE *__stream) __attribute__ ((__nothrow__));

extern int ftrylockfile (FILE *__stream) __attribute__ ((__nothrow__)) ;

extern void funlockfile (FILE *__stream) __attribute__ ((__nothrow__));

# 936 "/usr/include/stdio.h" 3 4

# 2 "test.c" 2

# 1 "/usr/include/stdlib.h" 1 3 4

# 33 "/usr/include/stdlib.h" 3 4

# 1 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stddef.h" 1 3 4

# 323 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stddef.h" 3 4

typedef int wchar_t;

# 34 "/usr/include/stdlib.h" 2 3 4

# 1 "/usr/include/bits/waitflags.h" 1 3 4

# 43 "/usr/include/stdlib.h" 2 3 4

# 1 "/usr/include/bits/waitstatus.h" 1 3 4

# 65 "/usr/include/bits/waitstatus.h" 3 4

# 1 "/usr/include/endian.h" 1 3 4

# 37 "/usr/include/endian.h" 3 4

# 1 "/usr/include/bits/endian.h" 1 3 4

# 38 "/usr/include/endian.h" 2 3 4

# 61 "/usr/include/endian.h" 3 4

# 1 "/usr/include/bits/byteswap.h" 1 3 4

# 28 "/usr/include/bits/byteswap.h" 3 4

# 1 "/usr/include/bits/wordsize.h" 1 3 4

# 29 "/usr/include/bits/byteswap.h" 2 3 4

# 62 "/usr/include/endian.h" 2 3 4

# 66 "/usr/include/bits/waitstatus.h" 2 3 4

union wait

  {

    int w_status;

    struct

      {

 unsigned int __w_termsig:7;

 unsigned int __w_coredump:1;

 unsigned int __w_retcode:8;

 unsigned int:16;

      } __wait_terminated;

    struct

      {

 unsigned int __w_stopval:8;

 unsigned int __w_stopsig:8;

 unsigned int:16;

      } __wait_stopped;

  };

# 44 "/usr/include/stdlib.h" 2 3 4

# 68 "/usr/include/stdlib.h" 3 4

typedef union

  {

    union wait *__uptr;

    int *__iptr;

  } __WAIT_STATUS __attribute__ ((__transparent_union__));

# 96 "/usr/include/stdlib.h" 3 4

typedef struct

  {

    int quot;

    int rem;

  } div_t;

typedef struct

  {

    long int quot;

    long int rem;

  } ldiv_t;

__extension__ typedef struct

  {

    long long int quot;

    long long int rem;

  } lldiv_t;

# 140 "/usr/include/stdlib.h" 3 4

extern size_t __ctype_get_mb_cur_max (void) __attribute__ ((__nothrow__)) ;

extern double atof (__const char *__nptr)

     __attribute__ ((__nothrow__)) __attribute__ ((__pure__)) __attribute__ ((__nonnull__ (1))) ;

extern int atoi (__const char *__nptr)

     __attribute__ ((__nothrow__)) __attribute__ ((__pure__)) __attribute__ ((__nonnull__ (1))) ;

extern long int atol (__const char *__nptr)

     __attribute__ ((__nothrow__)) __attribute__ ((__pure__)) __attribute__ ((__nonnull__ (1))) ;

__extension__ extern long long int atoll (__const char *__nptr)

     __attribute__ ((__nothrow__)) __attribute__ ((__pure__)) __attribute__ ((__nonnull__ (1))) ;

extern double strtod (__const char *__restrict __nptr,

        char **__restrict __endptr)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

extern float strtof (__const char *__restrict __nptr,

       char **__restrict __endptr) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

extern long double strtold (__const char *__restrict __nptr,

       char **__restrict __endptr)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

extern long int strtol (__const char *__restrict __nptr,

   char **__restrict __endptr, int __base)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

extern unsigned long int strtoul (__const char *__restrict __nptr,

      char **__restrict __endptr, int __base)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

__extension__

extern long long int strtoq (__const char *__restrict __nptr,

        char **__restrict __endptr, int __base)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

__extension__

extern unsigned long long int strtouq (__const char *__restrict __nptr,

           char **__restrict __endptr, int __base)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

__extension__

extern long long int strtoll (__const char *__restrict __nptr,

         char **__restrict __endptr, int __base)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

__extension__

extern unsigned long long int strtoull (__const char *__restrict __nptr,

     char **__restrict __endptr, int __base)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

# 311 "/usr/include/stdlib.h" 3 4

extern char *l64a (long int __n) __attribute__ ((__nothrow__)) ;

extern long int a64l (__const char *__s)

     __attribute__ ((__nothrow__)) __attribute__ ((__pure__)) __attribute__ ((__nonnull__ (1))) ;

# 1 "/usr/include/sys/types.h" 1 3 4

# 28 "/usr/include/sys/types.h" 3 4

typedef __u_char u_char;

typedef __u_short u_short;

typedef __u_int u_int;

typedef __u_long u_long;

typedef __quad_t quad_t;

typedef __u_quad_t u_quad_t;

typedef __fsid_t fsid_t;

typedef __loff_t loff_t;

typedef __ino_t ino_t;

# 61 "/usr/include/sys/types.h" 3 4

typedef __dev_t dev_t;

typedef __gid_t gid_t;

typedef __mode_t mode_t;

typedef __nlink_t nlink_t;

typedef __uid_t uid_t;

# 99 "/usr/include/sys/types.h" 3 4

typedef __pid_t pid_t;

typedef __id_t id_t;

# 116 "/usr/include/sys/types.h" 3 4

typedef __daddr_t daddr_t;

typedef __caddr_t caddr_t;

typedef __key_t key_t;

# 133 "/usr/include/sys/types.h" 3 4

# 1 "/usr/include/time.h" 1 3 4

# 58 "/usr/include/time.h" 3 4

typedef __clock_t clock_t;

# 74 "/usr/include/time.h" 3 4

typedef __time_t time_t;

# 92 "/usr/include/time.h" 3 4

typedef __clockid_t clockid_t;

# 104 "/usr/include/time.h" 3 4

typedef __timer_t timer_t;

# 134 "/usr/include/sys/types.h" 2 3 4

# 147 "/usr/include/sys/types.h" 3 4

# 1 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stddef.h" 1 3 4

# 148 "/usr/include/sys/types.h" 2 3 4

typedef unsigned long int ulong;

typedef unsigned short int ushort;

typedef unsigned int uint;

# 195 "/usr/include/sys/types.h" 3 4

typedef int int8_t __attribute__ ((__mode__ (__QI__)));

typedef int int16_t __attribute__ ((__mode__ (__HI__)));

typedef int int32_t __attribute__ ((__mode__ (__SI__)));

typedef int int64_t __attribute__ ((__mode__ (__DI__)));

typedef unsigned int u_int8_t __attribute__ ((__mode__ (__QI__)));

typedef unsigned int u_int16_t __attribute__ ((__mode__ (__HI__)));

typedef unsigned int u_int32_t __attribute__ ((__mode__ (__SI__)));

typedef unsigned int u_int64_t __attribute__ ((__mode__ (__DI__)));

typedef int register_t __attribute__ ((__mode__ (__word__)));

# 220 "/usr/include/sys/types.h" 3 4

# 1 "/usr/include/sys/select.h" 1 3 4

# 31 "/usr/include/sys/select.h" 3 4

# 1 "/usr/include/bits/select.h" 1 3 4

# 23 "/usr/include/bits/select.h" 3 4

# 1 "/usr/include/bits/wordsize.h" 1 3 4

# 24 "/usr/include/bits/select.h" 2 3 4

# 32 "/usr/include/sys/select.h" 2 3 4

# 1 "/usr/include/bits/sigset.h" 1 3 4

# 24 "/usr/include/bits/sigset.h" 3 4

typedef int __sig_atomic_t;

typedef struct

  {

    unsigned long int __val[(1024 / (8 * sizeof (unsigned long int)))];

  } __sigset_t;

# 35 "/usr/include/sys/select.h" 2 3 4

typedef __sigset_t sigset_t;

# 1 "/usr/include/time.h" 1 3 4

# 120 "/usr/include/time.h" 3 4

struct timespec

  {

    __time_t tv_sec;

    long int tv_nsec;

  };

# 45 "/usr/include/sys/select.h" 2 3 4

# 1 "/usr/include/bits/time.h" 1 3 4

# 75 "/usr/include/bits/time.h" 3 4

struct timeval

  {

    __time_t tv_sec;

    __suseconds_t tv_usec;

  };

# 47 "/usr/include/sys/select.h" 2 3 4

typedef __suseconds_t suseconds_t;

typedef long int __fd_mask;

# 67 "/usr/include/sys/select.h" 3 4

typedef struct

  {

    __fd_mask __fds_bits[1024 / (8 * (int) sizeof (__fd_mask))];

  } fd_set;

typedef __fd_mask fd_mask;

# 99 "/usr/include/sys/select.h" 3 4

# 109 "/usr/include/sys/select.h" 3 4

extern int select (int __nfds, fd_set *__restrict __readfds,

     fd_set *__restrict __writefds,

     fd_set *__restrict __exceptfds,

     struct timeval *__restrict __timeout);

# 121 "/usr/include/sys/select.h" 3 4

extern int pselect (int __nfds, fd_set *__restrict __readfds,

      fd_set *__restrict __writefds,

      fd_set *__restrict __exceptfds,

      const struct timespec *__restrict __timeout,

      const __sigset_t *__restrict __sigmask);

# 221 "/usr/include/sys/types.h" 2 3 4

# 1 "/usr/include/sys/sysmacros.h" 1 3 4

# 30 "/usr/include/sys/sysmacros.h" 3 4

__extension__

extern unsigned int gnu_dev_major (unsigned long long int __dev)

     __attribute__ ((__nothrow__));

__extension__

extern unsigned int gnu_dev_minor (unsigned long long int __dev)

     __attribute__ ((__nothrow__));

__extension__

extern unsigned long long int gnu_dev_makedev (unsigned int __major,

            unsigned int __minor)

     __attribute__ ((__nothrow__));

# 224 "/usr/include/sys/types.h" 2 3 4

typedef __blksize_t blksize_t;

typedef __blkcnt_t blkcnt_t;

typedef __fsblkcnt_t fsblkcnt_t;

typedef __fsfilcnt_t fsfilcnt_t;

# 271 "/usr/include/sys/types.h" 3 4

# 1 "/usr/include/bits/pthreadtypes.h" 1 3 4

# 23 "/usr/include/bits/pthreadtypes.h" 3 4

# 1 "/usr/include/bits/wordsize.h" 1 3 4

# 24 "/usr/include/bits/pthreadtypes.h" 2 3 4

# 50 "/usr/include/bits/pthreadtypes.h" 3 4

typedef unsigned long int pthread_t;

typedef union

{

  char __size[36];

  long int __align;

} pthread_attr_t;

# 67 "/usr/include/bits/pthreadtypes.h" 3 4

typedef struct __pthread_internal_slist

{

  struct __pthread_internal_slist *__next;

} __pthread_slist_t;

typedef union

{

  struct __pthread_mutex_s

  {

    int __lock;

    unsigned int __count;

    int __owner;

    int __kind;

    unsigned int __nusers;

    __extension__ union

    {

      int __spins;

      __pthread_slist_t __list;

    };

  } __data;

  char __size[24];

  long int __align;

} pthread_mutex_t;

typedef union

{

  char __size[4];

  int __align;

} pthread_mutexattr_t;

typedef union

{

  struct

  {

    int __lock;

    unsigned int __futex;

    __extension__ unsigned long long int __total_seq;

    __extension__ unsigned long long int __wakeup_seq;

    __extension__ unsigned long long int __woken_seq;

    void *__mutex;

    unsigned int __nwaiters;

    unsigned int __broadcast_seq;

  } __data;

  char __size[48];

  __extension__ long long int __align;

} pthread_cond_t;

typedef union

{

  char __size[4];

  int __align;

} pthread_condattr_t;

typedef unsigned int pthread_key_t;

typedef int pthread_once_t;

typedef union

{

# 170 "/usr/include/bits/pthreadtypes.h" 3 4

  struct

  {

    int __lock;

    unsigned int __nr_readers;

    unsigned int __readers_wakeup;

    unsigned int __writer_wakeup;

    unsigned int __nr_readers_queued;

    unsigned int __nr_writers_queued;

    unsigned char __flags;

    unsigned char __shared;

    unsigned char __pad1;

    unsigned char __pad2;

    int __writer;

  } __data;

  char __size[32];

  long int __align;

} pthread_rwlock_t;

typedef union

{

  char __size[8];

  long int __align;

} pthread_rwlockattr_t;

typedef volatile int pthread_spinlock_t;

typedef union

{

  char __size[20];

  long int __align;

} pthread_barrier_t;

typedef union

{

  char __size[4];

  int __align;

} pthread_barrierattr_t;

# 272 "/usr/include/sys/types.h" 2 3 4

# 321 "/usr/include/stdlib.h" 2 3 4

extern long int random (void) __attribute__ ((__nothrow__));

extern void srandom (unsigned int __seed) __attribute__ ((__nothrow__));

extern char *initstate (unsigned int __seed, char *__statebuf,

   size_t __statelen) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (2)));

extern char *setstate (char *__statebuf) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

struct random_data

  {

    int32_t *fptr;

    int32_t *rptr;

    int32_t *state;

    int rand_type;

    int rand_deg;

    int rand_sep;

    int32_t *end_ptr;

  };

extern int random_r (struct random_data *__restrict __buf,

       int32_t *__restrict __result) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int srandom_r (unsigned int __seed, struct random_data *__buf)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (2)));

extern int initstate_r (unsigned int __seed, char *__restrict __statebuf,

   size_t __statelen,

   struct random_data *__restrict __buf)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (2, 4)));

extern int setstate_r (char *__restrict __statebuf,

         struct random_data *__restrict __buf)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int rand (void) __attribute__ ((__nothrow__));

extern void srand (unsigned int __seed) __attribute__ ((__nothrow__));

extern int rand_r (unsigned int *__seed) __attribute__ ((__nothrow__));

extern double drand48 (void) __attribute__ ((__nothrow__));

extern double erand48 (unsigned short int __xsubi[3]) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

extern long int lrand48 (void) __attribute__ ((__nothrow__));

extern long int nrand48 (unsigned short int __xsubi[3])

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

extern long int mrand48 (void) __attribute__ ((__nothrow__));

extern long int jrand48 (unsigned short int __xsubi[3])

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

extern void srand48 (long int __seedval) __attribute__ ((__nothrow__));

extern unsigned short int *seed48 (unsigned short int __seed16v[3])

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

extern void lcong48 (unsigned short int __param[7]) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

struct drand48_data

  {

    unsigned short int __x[3];

    unsigned short int __old_x[3];

    unsigned short int __c;

    unsigned short int __init;

    unsigned long long int __a;

  };

extern int drand48_r (struct drand48_data *__restrict __buffer,

        double *__restrict __result) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int erand48_r (unsigned short int __xsubi[3],

        struct drand48_data *__restrict __buffer,

        double *__restrict __result) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int lrand48_r (struct drand48_data *__restrict __buffer,

        long int *__restrict __result)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int nrand48_r (unsigned short int __xsubi[3],

        struct drand48_data *__restrict __buffer,

        long int *__restrict __result)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int mrand48_r (struct drand48_data *__restrict __buffer,

        long int *__restrict __result)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int jrand48_r (unsigned short int __xsubi[3],

        struct drand48_data *__restrict __buffer,

        long int *__restrict __result)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int srand48_r (long int __seedval, struct drand48_data *__buffer)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (2)));

extern int seed48_r (unsigned short int __seed16v[3],

       struct drand48_data *__buffer) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern int lcong48_r (unsigned short int __param[7],

        struct drand48_data *__buffer)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2)));

extern void *malloc (size_t __size) __attribute__ ((__nothrow__)) __attribute__ ((__malloc__)) ;

extern void *calloc (size_t __nmemb, size_t __size)

     __attribute__ ((__nothrow__)) __attribute__ ((__malloc__)) ;

extern void *realloc (void *__ptr, size_t __size)

     __attribute__ ((__nothrow__)) __attribute__ ((__warn_unused_result__));

extern void free (void *__ptr) __attribute__ ((__nothrow__));

extern void cfree (void *__ptr) __attribute__ ((__nothrow__));

# 1 "/usr/include/alloca.h" 1 3 4

# 25 "/usr/include/alloca.h" 3 4

# 1 "/usr/lib/gcc/i686-linux-gnu/4.4.5/include/stddef.h" 1 3 4

# 26 "/usr/include/alloca.h" 2 3 4

extern void *alloca (size_t __size) __attribute__ ((__nothrow__));

# 498 "/usr/include/stdlib.h" 2 3 4

extern void *valloc (size_t __size) __attribute__ ((__nothrow__)) __attribute__ ((__malloc__)) ;

extern int posix_memalign (void **__memptr, size_t __alignment, size_t __size)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

extern void abort (void) __attribute__ ((__nothrow__)) __attribute__ ((__noreturn__));

extern int atexit (void (*__func) (void)) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

# 531 "/usr/include/stdlib.h" 3 4

extern int on_exit (void (*__func) (int __status, void *__arg), void *__arg)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

extern void exit (int __status) __attribute__ ((__nothrow__)) __attribute__ ((__noreturn__));

# 554 "/usr/include/stdlib.h" 3 4

extern void _Exit (int __status) __attribute__ ((__nothrow__)) __attribute__ ((__noreturn__));

extern char *getenv (__const char *__name) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

extern char *__secure_getenv (__const char *__name)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

extern int putenv (char *__string) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

extern int setenv (__const char *__name, __const char *__value, int __replace)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (2)));

extern int unsetenv (__const char *__name) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

extern int clearenv (void) __attribute__ ((__nothrow__));

# 606 "/usr/include/stdlib.h" 3 4

extern char *mktemp (char *__template) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

# 620 "/usr/include/stdlib.h" 3 4

extern int mkstemp (char *__template) __attribute__ ((__nonnull__ (1))) ;

# 642 "/usr/include/stdlib.h" 3 4

extern int mkstemps (char *__template, int __suffixlen) __attribute__ ((__nonnull__ (1))) ;

# 663 "/usr/include/stdlib.h" 3 4

extern char *mkdtemp (char *__template) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

# 712 "/usr/include/stdlib.h" 3 4

extern int system (__const char *__command) ;

# 734 "/usr/include/stdlib.h" 3 4

extern char *realpath (__const char *__restrict __name,

         char *__restrict __resolved) __attribute__ ((__nothrow__)) ;

typedef int (*__compar_fn_t) (__const void *, __const void *);

# 752 "/usr/include/stdlib.h" 3 4

extern void *bsearch (__const void *__key, __const void *__base,

        size_t __nmemb, size_t __size, __compar_fn_t __compar)

     __attribute__ ((__nonnull__ (1, 2, 5))) ;

extern void qsort (void *__base, size_t __nmemb, size_t __size,

     __compar_fn_t __compar) __attribute__ ((__nonnull__ (1, 4)));

# 771 "/usr/include/stdlib.h" 3 4

extern int abs (int __x) __attribute__ ((__nothrow__)) __attribute__ ((__const__)) ;

extern long int labs (long int __x) __attribute__ ((__nothrow__)) __attribute__ ((__const__)) ;

__extension__ extern long long int llabs (long long int __x)

     __attribute__ ((__nothrow__)) __attribute__ ((__const__)) ;

extern div_t div (int __numer, int __denom)

     __attribute__ ((__nothrow__)) __attribute__ ((__const__)) ;

extern ldiv_t ldiv (long int __numer, long int __denom)

     __attribute__ ((__nothrow__)) __attribute__ ((__const__)) ;

__extension__ extern lldiv_t lldiv (long long int __numer,

        long long int __denom)

     __attribute__ ((__nothrow__)) __attribute__ ((__const__)) ;

# 808 "/usr/include/stdlib.h" 3 4

extern char *ecvt (double __value, int __ndigit, int *__restrict __decpt,

     int *__restrict __sign) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3, 4))) ;

extern char *fcvt (double __value, int __ndigit, int *__restrict __decpt,

     int *__restrict __sign) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3, 4))) ;

extern char *gcvt (double __value, int __ndigit, char *__buf)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3))) ;

extern char *qecvt (long double __value, int __ndigit,

      int *__restrict __decpt, int *__restrict __sign)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3, 4))) ;

extern char *qfcvt (long double __value, int __ndigit,

      int *__restrict __decpt, int *__restrict __sign)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3, 4))) ;

extern char *qgcvt (long double __value, int __ndigit, char *__buf)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3))) ;

extern int ecvt_r (double __value, int __ndigit, int *__restrict __decpt,

     int *__restrict __sign, char *__restrict __buf,

     size_t __len) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3, 4, 5)));

extern int fcvt_r (double __value, int __ndigit, int *__restrict __decpt,

     int *__restrict __sign, char *__restrict __buf,

     size_t __len) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3, 4, 5)));

extern int qecvt_r (long double __value, int __ndigit,

      int *__restrict __decpt, int *__restrict __sign,

      char *__restrict __buf, size_t __len)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3, 4, 5)));

extern int qfcvt_r (long double __value, int __ndigit,

      int *__restrict __decpt, int *__restrict __sign,

      char *__restrict __buf, size_t __len)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (3, 4, 5)));

extern int mblen (__const char *__s, size_t __n) __attribute__ ((__nothrow__)) ;

extern int mbtowc (wchar_t *__restrict __pwc,

     __const char *__restrict __s, size_t __n) __attribute__ ((__nothrow__)) ;

extern int wctomb (char *__s, wchar_t __wchar) __attribute__ ((__nothrow__)) ;

extern size_t mbstowcs (wchar_t *__restrict __pwcs,

   __const char *__restrict __s, size_t __n) __attribute__ ((__nothrow__));

extern size_t wcstombs (char *__restrict __s,

   __const wchar_t *__restrict __pwcs, size_t __n)

     __attribute__ ((__nothrow__));

extern int rpmatch (__const char *__response) __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1))) ;

# 896 "/usr/include/stdlib.h" 3 4

extern int getsubopt (char **__restrict __optionp,

        char *__const *__restrict __tokens,

        char **__restrict __valuep)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1, 2, 3))) ;

# 948 "/usr/include/stdlib.h" 3 4

extern int getloadavg (double __loadavg[], int __nelem)

     __attribute__ ((__nothrow__)) __attribute__ ((__nonnull__ (1)));

# 964 "/usr/include/stdlib.h" 3 4

# 3 "test.c" 2

double add(int,int);

int main()

{

 printf("%f\n", add(1,2));

 return 0;

}
```
```
```
```
```
```
test2.c
```
```
#include <stdio.h>

double add(int a, int b)

{

    printf("%f\n", (double)(a + b));

    return a + b;

}

 
```
```
 
```
```
here is the assembly dump
```
```
 
```
```
test.o:     file format elf32-i386

Disassembly of section .init:

08048294 <_init>:

 8048294: 55                    push   %ebp

 8048295: 89 e5                 mov    %esp,%ebp

 8048297: 53                    push   %ebx

 8048298: 83 ec 04              sub    $0x4,%esp

 804829b: e8 00 00 00 00        call   80482a0 <_init+0xc>

 80482a0: 5b                    pop    %ebx

 80482a1: 81 c3 54 1d 00 00     add    $0x1d54,%ebx

 80482a7: 8b 93 fc ff ff ff     mov    -0x4(%ebx),%edx

 80482ad: 85 d2                 test   %edx,%edx

 80482af: 74 05                 je     80482b6 <_init+0x22>

 80482b1: e8 1e 00 00 00        call   80482d4 <__gmon_start__@plt>

 80482b6: e8 e5 00 00 00        call   80483a0 <frame_dummy>

 80482bb: e8 f0 01 00 00        call   80484b0 <__do_global_ctors_aux>

 80482c0: 58                    pop    %eax

 80482c1: 5b                    pop    %ebx

 80482c2: c9                    leave  

 80482c3: c3                    ret    

Disassembly of section .plt:

080482c4 <__gmon_start__@plt-0x10>:

 80482c4: ff 35 f8 9f 04 08     pushl  0x8049ff8

 80482ca: ff 25 fc 9f 04 08     jmp    *0x8049ffc

 80482d0: 00 00                 add    %al,(%eax)

 ...

080482d4 <__gmon_start__@plt>:

 80482d4: ff 25 00 a0 04 08     jmp    *0x804a000

 80482da: 68 00 00 00 00        push   $0x0

 80482df: e9 e0 ff ff ff        jmp    80482c4 <_init+0x30>

080482e4 <__libc_start_main@plt>:

 80482e4: ff 25 04 a0 04 08     jmp    *0x804a004

 80482ea: 68 08 00 00 00        push   $0x8

 80482ef: e9 d0 ff ff ff        jmp    80482c4 <_init+0x30>

080482f4 <printf@plt>:

 80482f4: ff 25 08 a0 04 08     jmp    *0x804a008

 80482fa: 68 10 00 00 00        push   $0x10

 80482ff: e9 c0 ff ff ff        jmp    80482c4 <_init+0x30>

Disassembly of section .text:

08048310 <_start>:

 8048310: 31 ed                 xor    %ebp,%ebp

 8048312: 5e                    pop    %esi

 8048313: 89 e1                 mov    %esp,%ecx

 8048315: 83 e4 f0              and    $0xfffffff0,%esp

 8048318: 50                    push   %eax

 8048319: 54                    push   %esp

 804831a: 52                    push   %edx

 804831b: 68 40 84 04 08        push   $0x8048440

 8048320: 68 50 84 04 08        push   $0x8048450

 8048325: 51                    push   %ecx

 8048326: 56                    push   %esi

 8048327: 68 c4 83 04 08        push   $0x80483c4

 804832c: e8 b3 ff ff ff        call   80482e4 <__libc_start_main@plt>

 8048331: f4                    hlt    

 8048332: 90                    nop

 8048333: 90                    nop

 8048334: 90                    nop

 8048335: 90                    nop

 8048336: 90                    nop

 8048337: 90                    nop

 8048338: 90                    nop

 8048339: 90                    nop

 804833a: 90                    nop

 804833b: 90                    nop

 804833c: 90                    nop

 804833d: 90                    nop

 804833e: 90                    nop

 804833f: 90                    nop

08048340 <__do_global_dtors_aux>:

 8048340: 55                    push   %ebp

 8048341: 89 e5                 mov    %esp,%ebp

 8048343: 53                    push   %ebx

 8048344: 83 ec 04              sub    $0x4,%esp

 8048347: 80 3d 14 a0 04 08 00  cmpb   $0x0,0x804a014

 804834e: 75 3f                 jne    804838f <__do_global_dtors_aux+0x4f>

 8048350: a1 18 a0 04 08        mov    0x804a018,%eax

 8048355: bb 20 9f 04 08        mov    $0x8049f20,%ebx

 804835a: 81 eb 1c 9f 04 08     sub    $0x8049f1c,%ebx

 8048360: c1 fb 02              sar    $0x2,%ebx

 8048363: 83 eb 01              sub    $0x1,%ebx

 8048366: 39 d8                 cmp    %ebx,%eax

 8048368: 73 1e                 jae    8048388 <__do_global_dtors_aux+0x48>

 804836a: 8d b6 00 00 00 00     lea    0x0(%esi),%esi

 8048370: 83 c0 01              add    $0x1,%eax

 8048373: a3 18 a0 04 08        mov    %eax,0x804a018

 8048378: ff 14 85 1c 9f 04 08  call   *0x8049f1c(,%eax,4)

 804837f: a1 18 a0 04 08        mov    0x804a018,%eax

 8048384: 39 d8                 cmp    %ebx,%eax

 8048386: 72 e8                 jb     8048370 <__do_global_dtors_aux+0x30>

 8048388: c6 05 14 a0 04 08 01  movb   $0x1,0x804a014

 804838f: 83 c4 04              add    $0x4,%esp

 8048392: 5b                    pop    %ebx

 8048393: 5d                    pop    %ebp

 8048394: c3                    ret    

 8048395: 8d 74 26 00           lea    0x0(%esi,%eiz,1),%esi

 8048399: 8d bc 27 00 00 00 00  lea    0x0(%edi,%eiz,1),%edi

080483a0 <frame_dummy>:

 80483a0: 55                    push   %ebp

 80483a1: 89 e5                 mov    %esp,%ebp

 80483a3: 83 ec 18              sub    $0x18,%esp

 80483a6: a1 24 9f 04 08        mov    0x8049f24,%eax

 80483ab: 85 c0                 test   %eax,%eax

 80483ad: 74 12                 je     80483c1 <frame_dummy+0x21>

 80483af: b8 00 00 00 00        mov    $0x0,%eax

 80483b4: 85 c0                 test   %eax,%eax

 80483b6: 74 09                 je     80483c1 <frame_dummy+0x21>

 80483b8: c7 04 24 24 9f 04 08  movl   $0x8049f24,(%esp)

 80483bf: ff d0                 call   *%eax

 80483c1: c9                    leave  

 80483c2: c3                    ret    

 80483c3: 90                    nop

080483c4 <main>:

 80483c4: 55                    push   %ebp

 80483c5: 89 e5                 mov    %esp,%ebp

 80483c7: 83 e4 f0              and    $0xfffffff0,%esp

 80483ca: 83 ec 10              sub    $0x10,%esp

 80483cd: c7 44 24 04 02 00 00  movl   $0x2,0x4(%esp)

 80483d4: 00 

 80483d5: c7 04 24 01 00 00 00  movl   $0x1,(%esp)

 80483dc: e8 1b 00 00 00        call   80483fc <add>

 80483e1: b8 00 85 04 08        mov    $0x8048500,%eax

 80483e6: dd 5c 24 04           fstpl  0x4(%esp)

 80483ea: 89 04 24              mov    %eax,(%esp)

 80483ed: e8 02 ff ff ff        call   80482f4 <printf@plt>

 80483f2: b8 00 00 00 00        mov    $0x0,%eax

 80483f7: c9                    leave  

 80483f8: c3                    ret    

 80483f9: 90                    nop

 80483fa: 90                    nop

 80483fb: 90                    nop

080483fc <add>:

 80483fc: 55                    push   %ebp

 80483fd: 89 e5                 mov    %esp,%ebp

 80483ff: 83 ec 28              sub    $0x28,%esp

 8048402: 8b 45 0c              mov    0xc(%ebp),%eax

 8048405: 8b 55 08              mov    0x8(%ebp),%edx

 8048408: 8d 04 02              lea    (%edx,%eax,1),%eax

 804840b: 89 45 f4              mov    %eax,-0xc(%ebp)

 804840e: db 45 f4              fildl  -0xc(%ebp)

 8048411: b8 04 85 04 08        mov    $0x8048504,%eax

 8048416: dd 5c 24 04           fstpl  0x4(%esp)

 804841a: 89 04 24              mov    %eax,(%esp)

 804841d: e8 d2 fe ff ff        call   80482f4 <printf@plt>

 8048422: 8b 45 0c              mov    0xc(%ebp),%eax

 8048425: 8b 55 08              mov    0x8(%ebp),%edx

 8048428: 8d 04 02              lea    (%edx,%eax,1),%eax

 804842b: 89 45 f4              mov    %eax,-0xc(%ebp)

 804842e: db 45 f4              fildl  -0xc(%ebp)

 8048431: c9                    leave  

 8048432: c3                    ret    

 8048433: 90                    nop

 8048434: 90                    nop

 8048435: 90                    nop

 8048436: 90                    nop

 8048437: 90                    nop

 8048438: 90                    nop

 8048439: 90                    nop

 804843a: 90                    nop

 804843b: 90                    nop

 804843c: 90                    nop

 804843d: 90                    nop

 804843e: 90                    nop

 804843f: 90                    nop

08048440 <__libc_csu_fini>:

 8048440: 55                    push   %ebp

 8048441: 89 e5                 mov    %esp,%ebp

 8048443: 5d                    pop    %ebp

 8048444: c3                    ret    

 8048445: 8d 74 26 00           lea    0x0(%esi,%eiz,1),%esi

 8048449: 8d bc 27 00 00 00 00  lea    0x0(%edi,%eiz,1),%edi

08048450 <__libc_csu_init>:

 8048450: 55                    push   %ebp

 8048451: 89 e5                 mov    %esp,%ebp

 8048453: 57                    push   %edi

 8048454: 56                    push   %esi

 8048455: 53                    push   %ebx

 8048456: e8 4f 00 00 00        call   80484aa <__i686.get_pc_thunk.bx>

 804845b: 81 c3 99 1b 00 00     add    $0x1b99,%ebx

 8048461: 83 ec 1c              sub    $0x1c,%esp

 8048464: e8 2b fe ff ff        call   8048294 <_init>

 8048469: 8d bb 20 ff ff ff     lea    -0xe0(%ebx),%edi

 804846f: 8d 83 20 ff ff ff     lea    -0xe0(%ebx),%eax

 8048475: 29 c7                 sub    %eax,%edi

 8048477: c1 ff 02              sar    $0x2,%edi

 804847a: 85 ff                 test   %edi,%edi

 804847c: 74 24                 je     80484a2 <__libc_csu_init+0x52>

 804847e: 31 f6                 xor    %esi,%esi

 8048480: 8b 45 10              mov    0x10(%ebp),%eax

 8048483: 89 44 24 08           mov    %eax,0x8(%esp)

 8048487: 8b 45 0c              mov    0xc(%ebp),%eax

 804848a: 89 44 24 04           mov    %eax,0x4(%esp)

 804848e: 8b 45 08              mov    0x8(%ebp),%eax

 8048491: 89 04 24              mov    %eax,(%esp)

 8048494: ff 94 b3 20 ff ff ff  call   *-0xe0(%ebx,%esi,4)

 804849b: 83 c6 01              add    $0x1,%esi

 804849e: 39 fe                 cmp    %edi,%esi

 80484a0: 72 de                 jb     8048480 <__libc_csu_init+0x30>

 80484a2: 83 c4 1c              add    $0x1c,%esp

 80484a5: 5b                    pop    %ebx

 80484a6: 5e                    pop    %esi

 80484a7: 5f                    pop    %edi

 80484a8: 5d                    pop    %ebp

 80484a9: c3                    ret    

080484aa <__i686.get_pc_thunk.bx>:

 80484aa: 8b 1c 24              mov    (%esp),%ebx

 80484ad: c3                    ret    

 80484ae: 90                    nop

 80484af: 90                    nop

080484b0 <__do_global_ctors_aux>:

 80484b0: 55                    push   %ebp

 80484b1: 89 e5                 mov    %esp,%ebp

 80484b3: 53                    push   %ebx

 80484b4: 83 ec 04              sub    $0x4,%esp

 80484b7: a1 14 9f 04 08        mov    0x8049f14,%eax

 80484bc: 83 f8 ff              cmp    $0xffffffff,%eax

 80484bf: 74 13                 je     80484d4 <__do_global_ctors_aux+0x24>

 80484c1: bb 14 9f 04 08        mov    $0x8049f14,%ebx

 80484c6: 66 90                 xchg   %ax,%ax

 80484c8: 83 eb 04              sub    $0x4,%ebx

 80484cb: ff d0                 call   *%eax

 80484cd: 8b 03                 mov    (%ebx),%eax

 80484cf: 83 f8 ff              cmp    $0xffffffff,%eax

 80484d2: 75 f4                 jne    80484c8 <__do_global_ctors_aux+0x18>

 80484d4: 83 c4 04              add    $0x4,%esp

 80484d7: 5b                    pop    %ebx

 80484d8: 5d                    pop    %ebp

 80484d9: c3                    ret    

 80484da: 90                    nop

 80484db: 90                    nop

Disassembly of section .fini:

080484dc <_fini>:

 80484dc: 55                    push   %ebp

 80484dd: 89 e5                 mov    %esp,%ebp

 80484df: 53                    push   %ebx

 80484e0: 83 ec 04              sub    $0x4,%esp

 80484e3: e8 00 00 00 00        call   80484e8 <_fini+0xc>

 80484e8: 5b                    pop    %ebx

 80484e9: 81 c3 0c 1b 00 00     add    $0x1b0c,%ebx

 80484ef: e8 4c fe ff ff        call   8048340 <__do_global_dtors_aux>

 80484f4: 59                    pop    %ecx

 80484f5: 5b                    pop    %ebx

 80484f6: c9                    leave  

 80484f7: c3                    ret     
```
```
```
```
```