+++
title = "How I ended up mounting my Linux drive to WSL"
date = 2025-01-31
authors = ["Krerkkiat Chusap"]

[taxonomies]
tags = ["wsl"]
+++

Since after I got a SSD upgrade for my 5+ years old laptop, I end up installing Windows
on it and mostly using it to play a certain online game *cough* the critically acclaimed MMORPG Final Fantasy XIV that has a free trial, and includes the entirety ... *cough*. Now I found
myself booting into linux less and less since the Windows on SSD is responsive enough
on this ancient laptop. However, a ton of project files are still in that linux partition.
I need to get access to it somehow.

After a bit of Googling around, I found this article "[Mount a Linux disk in WSL 2](https://learn.microsoft.com/en-us/windows/wsl/wsl2-mount-disk)". Let's try it out by firing up the PowerShell with administrator privilege and run`

```
$ GET-CimInstance -query "SELECT * from Win32_DiskDrive"
DeviceID           Caption            Partitions Size          Model
--------           -------            ---------- ----          -----
\\.\PHYSICALDRIVE0 512 GB SSD         2          512105932800  A
\\.\PHYSICALDRIVE2 SDXC Card          1          127861977600  SDXC Card C
\\.\PHYSICALDRIVE1 1TB HDD            4          1000202273280 B
```

Take note of the `DeviceID` since we will be using it later to mount it to the WSL. Since my linux installation exist
on a separated drive, I just need the `--bare` option to mount the entire drive.

```
$ wsl --mount \\.\PHYSICALDRIVE1 --bare
The disk is in use or locked by another process
```

Oh.... this problem is because I booted into linux's bootloader first then chain boot Windows from it. A quick reboot
and select the SSD as a boot drive frees up the drive and solves this problem.

Now that the drive is attached to WSL, I can mount it in WSL. To quickly check that there is a new drive, we can run `fdisk -l`,

```
$ sudo fdisk -l

...

Disk /dev/sdd: 931.51 GiB, N bytes, N sectors
Disk model: DISK-MODEL
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: DISK-ID

Device          Start        End   Sectors   Size Type
/dev/sdd1        2048    1290239   1288192   629M EFI System
/dev/sdd3     1290240  985090047 983799808 469.1G Linux filesystem
/dev/sdd5   985090048 1949779967 964689920   460G Linux root (x86-64)
/dev/sdd6  1949779968 1953525134   3745167   1.8G Linux swap

...
```

We can then proceed to mount the partition normally. In this case, my home partition is at `/dev/sdd3`.

```
$ sudo mkdir -p /mnt/home
$ sudo mount /dev/sdd3 /mnt/home
```

And ta-da, I can now access my projects' files.
