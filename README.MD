# Facescrubber
[While you're at it, check out my homepage when you get a chance.](http://sidho.me)

### About Facescrubber
Facescrubber is a Chrome extension designed to remove clickbait articles, with
titles like "What this woman did will restore your faith in humanity", from your
Facebook feed. It scans through the feed, looking for blacklisted keywords and
domains, and removes those articles.

I decided to make this extension for fun, and to learn how chrome extensions work.
I know that there are similar extensions out there, and that facebook has a
blocking feature, but I just wanted to make an easy alternative.

*Facescrubber is currently a work in-progress.*
So, you know how it goes. Use at your own discretion, I'm not liable for your
facebook breaking, computer imploding, or any other sort of issue. That being
said, it simply manipulates the DOM. If you have any problems with it, uninstalling
is the way to go.

### Features

#### Completed
- Basic Scrubbing using a list of common phrases and words
- Domain blacklisting for repeat offenders, such as BuzzFeed and Viralnova
- Optional filters for Lists, Caps, and the hardcore "This" filter
- Reversible scrubbing
- Chrome style options page and popup
- Fancypants icon

#### To do
- User defined blacklisting for words and phrases
- User defined domain blacklisting
- Whitelisting for domains and words

### Final Thoughts

Thanks for reading. If you have any suggestions or find any bugs, let me know.

This software isn't perfect, and can't protect you from all the clickbait articles.
What you can do is resist the temptation to click them, and maybe one day these
sites will stop using them and resort to writing articles with actual content
(wishful thinking).

Shout out to Hartley Brody, his blog post [So You Want To Build A Chrome Extension?](https://blog.hartleybrody.com/chrome-extension/)
really helped me in building this.

<p align="center">
  <a href="http://sidho.me"><img src="./aimages/shgreenicon.jpg"/></a>
</p>

#### License
The MIT License (MIT)

Copyright (c) 2015 Sid Ho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
