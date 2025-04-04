+++
title = "Spring(?) cleaning"
date = 2021-10-02
updated = 2025-03-01
authors = ["Krerkkiat Chusap"]

[taxonomies]
tags = ["maintenance"]
+++

With a home partition that is almost full, it is then the spring cleaning time! (wait!?). This post walks you through the commands I used, so I don't have to track them down again next year.

## System maintenance

Removing unused packages,

```
# pacman -Qtdq | pacman -Rns -
```

Future me should not blindly run it, and should check if the packages should be removed, but who care? right?

To remove pacman’s package caches and only keep the last set.

```
# paccache -rk1
```

Remove old system log files. In this case only keep the last 30 days worth of log.

```
# journalctl --vacuum-time=30d
```

For further detail on the system maintenance for Archlinux (some of which may apply to other distros), please see [https://wiki.archlinux.org/title/System_maintenance](https://wiki.archlinux.org/title/System_maintenance)

## Cleaning caches files from various sources

For python,

```
$ find . -type f -name "*.pyc" -delete
$ find . -name "__pycache__" -type d -exec rm -rf \;
```

Just be careful with the 2nd command.

To list the infamous `node_modules` folder,

```
$ find . -type d -name "node_modules" -prune
```

where the `-prune` flag tells the command to not descend down the found directory. ([src](https://unix.stackexchange.com/a/24563/467495))

## Tracking down large files

Any disk usage utilities should do the job.

## Closing notes

Why don’t I just use [BleachBit](https://github.com/bleachbit/bleachbit)? Good question!
