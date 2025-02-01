+++
title = "My Git's setup"
date = "2025-02-01"
+++

First, we have the usual `user.name` and `user.email`.

```bash
git config --global user.name "Krerkkiat Chusap"
git config --global user.email "me@kchusap.com"
```

Now, we will be looking at some intersting Git's aliases.

```bash
git config --global alias.st 'status'
git config --global alias.co 'checkout'
git config --global alias.sw 'switch'
git config --global alias.br 'branch'
git config --global alias.ds 'diff --staged'
git config --global alias.lgoa 'log --graph --all --decorate --oneline'
```

Most of these should be strightforward. They are mainly there to reduce the key strokes.
I found `git ds` to be really helpful when I want to review the staged changes.

I shamelessly stole that `git lgoa` from
["Git For Ages 4 And Up"](https://www.youtube.com/watch?v=3m7BgIvC-uQ) talk by Michael Schwern
at [Linux.conf.au 2013](https://www.youtube.com/@linuxconfau2013). It is my go-to commit graph
visualization. Here is an example of running it on part of [python/cpython](https://github.com/python/cpython) repository.

```console
$ git lgoa
[...]
* 43ef958 gh-106320: Document replacement for removed C API (#128787)
* 1598e18 Fix a "doctest" block in `Doc/library/turtle.rst` (#128831)
*   7fc0f86 Merge branch 'main' of https://github.com/python/cpython
|\
| * f49a1df GH-128682: Convert explicit loops closing arrays into `DECREF_INPUTS`. (GH-128822)
| * bbd3300 gh-118761: substitute `re` import in `base64.b16decode` for a more efficient alternative (#128736)
| * 859db49 gh-71339: Use new assertion methods in test_typing (GH-128825)
| * 75bd42c gh-71339: Use new assertion methods in test_sqlite3 (GH-128830)
* | aa80588 Post 3.14.0a4
* | f26daa9 (tag: v3.14.0a4) Python 3.14.0a4
|/
* ff3e145 gh-118761: Improve import time of the `pickle` module. (#128732)
* 1153e66 gh-109959: Skip test_glob.test_selflink() flaky test (#128812)
* 24a8d92 gh-127787: Move _PyUnicodeError_GetParams() to the internal C API (#128803)
* eefd4a0 Update cryptographic primitives code owners. (#128747)
[...]
```

I found myself using this last set of aliases a lot less, but they are sometimes handy.

```bash
git config --global alias.lgo1d 'log --graph --all --decorate --oneline --since yesterday'
git config --global alias.lgo3d "log --graph --all --decorate --oneline --since='3 days ago'"
git config --global alias.lgo1w "log --graph --all --decorate --oneline --since='7 days ago'"
git config --global alias.lgo4w "log --graph --all --decorate --oneline --since='4 weeks ago'"
git config --global alias.fl 'log -u'
git config --global alias.flog 'log --graph --all --decorate'
git config --global alias.hs "log --pretty='%C(yellow)%h %C(cyan)%ad %Cblue%an%C(auto)%d %Creset%s' --date=relative --date-order --graph"
```

The first four `lgo1d`, `lgo3d`, `lgo1w` and `lgo4w` are variants of the `lgoa` alias described above.
While `lgoa` display the entirety of the commit history, these variant confine the history to
a certain time frame.

To be honest with you, I forget why I have the next two aliases :p. The last one, however,
was really useful when I was a teaching assiant to [CS 3560 course](https://github.com/OU-CS3560/)
at [Ohio University](https://www.ohio.edu/). It will show the short commit's hash (`%h`), the commit's creation time (`%ad`), the author's name (`%an`) and a one line of the commit message (`%s`). Here is an example
of running it on a repository for [my personal website](https://kchusap.com).

```console
$ git hs
* 16d36bf 3 hours ago Krerkkiat Chusap (HEAD -> main, origin/main, origin/HEAD) feat: add password generator app
* ad30368 4 hours ago Krerkkiat Chusap fix: template not render properly
* ff9feaf 4 hours ago Krerkkiat Chusap feat: add favicon
* 134aa60 6 hours ago Krerkkiat Chusap feat: add zola version, add new blog entry
* 09b6879 7 hours ago Krerkkiat Chusap fix: add missing assets
* 76f3845 7 hours ago Krerkkiat Chusap feat: add margins, add wasm-web-term and xterm.js
* 26f6f3f 33 hours ago Krerkkiat Chusap docs: add readme file
* 581d9d8 33 hours ago Krerkkiat Chusap fix: use div.content to render blog's content
[...]
```

For the full details of the format, please visit [Git's own documentation on pretty formats](https://git-scm.com/docs/pretty-formats)

## The whole thing

Here are all the commands in one place for an easy copy-and-paste.

```shell
git config --global user.name "Krerkkiat Chusap"
git config --global user.email "me@kchusap.com"

git config --global alias.st 'status'
git config --global alias.co 'checkout'
git config --global alias.sw 'switch'
git config --global alias.br 'branch'
git config --global alias.ds 'diff --staged'
git config --global alias.lgoa 'log --graph --all --decorate --oneline'

git config --global alias.lgo1d 'log --graph --all --decorate --oneline --since yesterday'
git config --global alias.lgo3d "log --graph --all --decorate --oneline --since='3 days ago'"
git config --global alias.lgo1w "log --graph --all --decorate --oneline --since='7 days ago'"
git config --global alias.lgo4w "log --graph --all --decorate --oneline --since='4 weeks ago'"
git config --global alias.fl 'log -u'
git config --global alias.flog 'log --graph --all --decorate'
git config --global alias.hs "log --pretty='%C(yellow)%h %C(cyan)%ad %Cblue%an%C(auto)%d %Creset%s' --date=relative --date-order --graph"
```

## Note on `.gitattributes`

I will just put this here since I sometimes refer to this post for my own setup.

```plain
* text=auto

# For a specific file format.
# *.cpp text=auto

*.jpg -text
*.jpeg -text
*.png -text
```

- [What is the purpose of `text=auto` in `.gitattributes` file?](https://stackoverflow.com/a/38017715/10163723)
