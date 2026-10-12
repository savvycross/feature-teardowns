---
title: "The hand-drawn line"
app: "Excalidraw"
difficulty: "Intermediate"
readTime: 7
summary: "Draw a rectangle in Excalidraw and it comes out slightly wobbly, like marker on a whiteboard. The wobble is not a filter or a font. It is a small, repeatable recipe for drawing a line badly on purpose."
date: 2026-10-12T16:30:00Z
---

## What it does

Excalidraw is a free whiteboard that runs in your browser. Every rectangle, circle, arrow and line you draw looks sketched by hand: edges bend a little, corners overshoot, and each outline looks like the pen went over it twice.

It makes diagrams feel like rough ideas instead of finished artwork, which is the point. Nobody argues about the alignment of a sketch. And however many times you move, zoom or reopen a drawing, each shape keeps exactly the same wobble.

## How it works

Excalidraw does not draw the wobble itself. It hands each shape to a small open-source drawing library called Rough.js and tells it how messy to be. The recipe below is what that library does for one straight line.

1. **Start with the clean line.** Two points: where the line begins and where it ends. Nothing is random yet.
2. **Turn it into a curve.** Instead of a ruler-straight stroke, the line is drawn as a gentle curve between the same two points. The curve is steered by two invisible "pull" points placed part-way along the line.
3. **Nudge everything by a small random amount.** The pull points, and sometimes the two ends, are each shifted a little in a random direction. The size of the nudge is set by one dial called roughness. At zero there is no nudge and you get a perfectly clean line.
4. **Add a slight bow.** The middle of the line is also pushed a touch sideways, the way a real hand-drawn line sags or arcs instead of staying dead straight.
5. **Go easy on long lines.** A wobble that looks charming on a short line looks drunk on a long one. So the nudge is at full strength for short lines and is scaled down to well under half for long ones.
6. **Draw it twice.** The whole thing is repeated with fresh random nudges and laid on top of the first stroke. Two nearly matching strokes are what make it look like someone went over the line with a pen.
7. **Shapes are just lines and curves.** A rectangle is four of these lines. A circle is a ring of points, each nudged, joined by a smooth curve, and also drawn twice with the second pass slightly different.
8. **The randomness is not really random.** Each shape is given one number, a seed, when you create it, and that number is saved with the shape. The "random" nudges are worked out from the seed, so the same seed always produces the same wobble. That is why a shape does not shimmer when the screen redraws, and why it looks the same on someone else's computer.

Excalidraw adds a few choices of its own on top:

- **Three levels of mess.** Its sloppiness setting is the roughness dial at 0, 1 or 2.
- **Small shapes are calmer.** Tiny shapes get less roughness than you asked for, so they stay readable.
- **Corners stay put at lower settings.** On the two gentler settings the ends of each line are not nudged, so corners still meet. Only the messiest setting lets them drift apart.
- **Dashed and dotted lines are drawn once.** Two overlapping dashed strokes would smear the dashes together.

## Diagram

<figure class="diagram">
<svg viewBox="0 0 720 230" role="img" aria-label="On the left, one straight line between two points. On the right, the same line drawn as two slightly different wobbly curves on top of each other.">
<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-arrowhead" /></marker></defs>
<line x1="30" y1="60" x2="310" y2="60" class="d-line" />
<circle cx="30" cy="60" r="5" class="d-dot" /><circle cx="310" cy="60" r="5" class="d-dot" />
<line x1="335" y1="60" x2="375" y2="60" class="d-line" marker-end="url(#arrow)" />
<path d="M 405 54 C 480 40, 590 78, 696 66" class="d-curve" />
<path d="M 396 64 C 500 76, 600 46, 686 56" class="d-curve" />
<circle cx="400" cy="60" r="5" class="d-dot" /><circle cx="690" cy="60" r="5" class="d-dot" />
<text x="30" y="120" class="d-step">01</text>
<text x="30" y="142" class="d-note">The clean line: two points,</text>
<text x="30" y="162" class="d-note">nothing random yet.</text>
<text x="400" y="120" class="d-step">02</text>
<text x="400" y="142" class="d-note">Drawn twice as gentle curves.</text>
<text x="400" y="162" class="d-note">Each pass is nudged by small</text>
<text x="400" y="182" class="d-note">amounts worked out from a seed.</text>
</svg>
<figcaption>Same seed, same wobble. The shape looks identical every time it is redrawn.</figcaption>
</figure>

## Build your own

Paste this into your AI coding agent, inside the project you want to add it to.

```text
Add a hand-drawn (sketchy) line style to this web app.

First, look at the project and tell me in one sentence how it draws things today: HTML canvas, SVG, or neither. Build this to fit. Do not add any libraries; write it as one small self-contained module.

1. Repeatable randomness
- Write a tiny seeded random number generator: given a whole-number seed it returns the same sequence of numbers between 0 and 1 every time.
- Every shape gets its own seed, created once and stored with the shape. Never use Math.random while drawing, or shapes will flicker on every redraw.

2. One sketchy line
- Input: start point, end point, and options { seed, roughness (0 to 2, default 1), bowing (default 1), strokeWidth, color, doubleStroke (default true) }.
- Draw the line as a cubic curve from start to end, with two control points placed roughly a third and two thirds of the way along.
- Move each control point by a small random offset in x and y. The offset size is roughness times a base amount of about 2 pixels. With roughness 0 the result must be a perfectly straight line.
- Add a small sideways push to both control points, scaled by bowing, so the line arcs slightly.
- Scale the offsets down as lines get longer: full strength for lines under about 200 pixels, falling smoothly to about 40 percent for lines over 500 pixels.
- If doubleStroke is on, build a second curve the same way with new random offsets and draw it on top.
- Add a keepCorners option. When it is on, the start and end points are not moved, so shapes stay closed. When it is off, nudge the ends slightly too.

3. Shapes built from it
- Rectangle: four sketchy lines.
- Polygon and polyline: one sketchy line per side.
- Ellipse: place points evenly around the ellipse, nudge each one a little, join them with a smooth closed curve, and do it twice with slightly different nudges.

4. Output
- Each function returns an SVG path string, so it works in SVG directly.
- Also give me a helper that draws the same path on a canvas 2D context.
- Dashed lines should use a single stroke, not a double one.

5. A way to see it
- Add a small demo page, or a demo section in an existing page, showing a line, a rectangle and an ellipse at roughness 0, 1 and 2, with a "new seed" button.
- Redraw the demo several times a second for a moment to prove the shapes do not flicker.

When you are done, tell me which files you created or changed, how to make an existing shape in this app sketchy in one or two lines, and how to open the demo. Explain each step simply; I am not a developer.
```

## Limits and notes

**What was analysed.** The live site excalidraw.com on 12 October 2026, whose main script is `/assets/index-j68--5dB.js` (2.24 MB, SHA-256 begins `6c5bb3d6`). Then Excalidraw's public source code on GitHub (commit `541653c7c9`, MIT licence) and the public source of Rough.js, the drawing library it uses (also MIT).

**What REA confirmed.**

- The page loads one main script and one extra chunk on demand (REA evidence `ev_8f54a726`).
- REA read and parsed that main script completely: 617,914 pieces of syntax, no parse failures (REA evidence `ev_57f398a4`).

**What REA could not do.** It ran out of memory on the stage that works out which parts of the code call which, and a search of its results for the roughness setting found nothing. Its tool for recording a fresh page load also failed on our machine. So REA told us where the code lives, not how the sketching works.

**What we read in the open-source code.** Everything in "How it works": the curve with two pull points, the roughness dial, the bow, the scaling-down for long lines, the double stroke, the circle recipe, the saved seed, the three sloppiness levels, calmer small shapes, fixed corners on gentler settings and single-stroke dashes.

**What is inferred, not proven.**

- That the live site runs the code we read. A plain text search of the live script found the same setting names and the same number used by the random generator, which fits, but the published source may be newer than what is deployed.
- We read the latest Rough.js source. Excalidraw pins version 4.6.4, which may differ in details.
- The reasons given ("looks like a pen went over it", "stay readable") are our reading. The code says what happens, not always why.

**What we did not cover.** The scribbled fill patterns inside shapes, arrowheads, the handwriting font, and the freehand pen tool, which uses a different library altogether.

**About the prompt.** It describes the idea in our own words and asks for fresh code. If you would rather not build it, Rough.js is free, open source and does all of this already.
