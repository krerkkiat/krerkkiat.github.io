+++
title = "Installing ImageMagick on openSUSE Tumbleweed with HEIF to JPEG conversion support"
date = 2025-11-02
authors = ["Krerkkiat Chusap"]

[taxonomies]
tags = ["opensuse-tumbleweed", "problem"]
+++

I am not sure why it is quite difficult to find the answer to this. What I had to do was:

1. Install the imagemagick itself with `sudo zypper install ImageMagick`.
2. Install `libheif-HEIF libheif-jpeg` from Packman with `sudo zypper install --from packman libheif-HEIF libheif-jpeg`

Then a command like `magick morgify -format jpg *.heic` will work.
