# 1k Modular Synth

This is my entry for the JS1K 2015 "Hypetrain" competition:
http://js1k.com/2015-hypetrain/

This was my first time trying either code golfing OR audio synthesis!  It was
quite the learning experience.

The included `gulpfile` will watch the code for changes and automatically
compress it using `uglifyjs` and `jscrush`, and insert it into the JS1K shim.
Feel free to use/abuse it for your own purposes.

## Description

Play notes with bottom row of keyboard.  Try "f" in freq field.

Freq field is evaluated, so you can use a formula here.  The var "f" represents
the frequency of the current key being pressed.  A numeric value, like in the
"train horn" default, will result in a fixed pitch for every key.

"fm" and "am" fields determine which channel to get the corresponding
modulation from.  Watch out for infinite loops!

Channels 1-4 are output, although it's possible to use an output channel as
an auxiliary oscillator if you're careful about loops.

For FM oscillators, the volume determines the modulation width.

The "black keys" on the second row (sdghj) are also available.

Feature, not bug: If a note key is pressed while the previous note is still
generating, the two notes will play simultaneously.  This can be exploited to
play chords.

Other tips: Try layering sounds with one channel at "f", another at "f*2", etc.
Use AM modulation with low-frequency sines to create a fade in/out effect, like
in the default setting.  Try AM modulating an FM channel for fancy effects.
Generally, you'll get better results using multiples of "f" in your FM/AM
channels instead of fixed values.

## Details

Channels 1 through 4 are output.  5 through 16 are auxiliary oscillators.
The fields are:

* len: The length of each note, in seconds.
* osc: Oscillator type.
* vol: Volume of the channel.  Volume of the output is divided by 4 to prevent
clipping, so a value of 4 will be full volume if you're only using a single
channel.
* f: Base frequency of the oscillator.  This is an `eval()` field so you can
enter formulas here.  The variable `f` represents the frequency of the note
being played on the keyboard.  Try entering `f` or `f*2`.  Blank or `0` mutes
the channel.
* fm: Patch in the frequency (pitch) modulation from this channel.
* am: Patch in the amplitude (volume) modulation from this channel.

Be careful not to create feedback loops, or you'll crash!

Known issues:

* FM synthesis is a bit wonky (width of the oscillation contantly increases).
Not sure what's causing this.
* Occasionally crashy.
* Works on iPhone, but you need to select an input field to bring up the
keyboard.

## Credits

Code by J. Culbert (neckro@decay.us).  WTFPL.

## Thanks

* p01 for inspiration and the base waveform code, which I shamelessly stole.
* #MFC and vanarsena for support/encouragement/ideas
* JS1K for giving me an excuse to do this!
