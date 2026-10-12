---
title: "The typing indicator"
app: "Signal Desktop"
difficulty: "Beginner"
readTime: 7
summary: "Three small dots that tell you someone is writing back. Behind them are four timers and one rule: say you are typing rarely, and let silence do the rest."
date: 2026-10-12T17:45:00Z
---

## What it does

When someone you are chatting with on Signal starts writing, three dots appear at the bottom of the conversation and gently pulse one after another. When they stop writing, or their message arrives, the dots go away.

It is a tiny signal with a big effect. You know a reply is coming, so you wait instead of sending a second message on top of theirs. Both people can switch it off in settings, and if you switch it off you neither send nor see typing dots.

## How it works

The feature is two halves that never talk about the dots at all. One side sends tiny "typing" and "stopped" notes. The other side decides, with a timer of its own, how long to believe them.

**On the typing side**

1. **A keystroke that changes your draft is the trigger.** When the text in the message box changes and is not empty, the app notes that you are typing. Clearing the box does not count.
2. **Keystrokes are thinned out first.** However fast you type, that note is passed on at most about three times a second.
3. **The first keystroke sends one "typing" note.** It also starts a 10-second repeat timer. While that timer is running, further keystrokes send nothing at all.
4. **Every keystroke resets a 3-second quiet timer.** This is the "have they stopped?" clock.
5. **Still typing after 10 seconds? Send "typing" again.** The repeat timer fires, sends one more note and restarts. So a long message costs one note every 10 seconds, not one per letter.
6. **Three seconds of quiet sends "stopped".** Both timers are then cleared, and the next keystroke starts the whole thing over.
7. **Sending your message cancels the timers.** No "stopped" note is needed, because the message itself tells the other side you are done.

**On the receiving side**

8. **A "typing" note shows the dots and starts a 15-second countdown.** Each new "typing" note restarts the countdown.
9. **The dots go away for any of three reasons.** A "stopped" note arrives, a real message from that person arrives, or the 15 seconds run out.

The 15-second countdown is the safety net. If the other person's laptop lid closes or their Wi-Fi drops mid-sentence, no "stopped" note will ever come, and the dots still disappear by themselves. And because "typing" is repeated every 10 seconds while the countdown is 15, one lost note does not make the dots flicker off.

**How it avoids flooding the server**

- One note at the start, one every 10 seconds, and one at the end, however many keys you press.
- If several notes are waiting to go out at once, only the most recent one is sent.
- The notes are marked as only worth delivering right now. A "typing" note is useless an hour later, so it is sent for live delivery, not as a normal message.
- They are skipped entirely in a few cases, such as notes to yourself.

**The dots themselves** are the simple part: three small circles running the same looping animation, with the second and third starting a fraction of a second after the first. That stagger is what makes them look like a wave.

## Diagram

<figure class="diagram">
<svg viewBox="0 0 720 240" role="img" aria-label="A timeline. You type for thirteen seconds. A typing note is sent at the start and again at ten seconds. Three seconds after the last keystroke a stopped note is sent. The dots show on the other screen the whole time.">
<text x="10" y="54" class="d-note">You type</text>
<line x1="170" y1="50" x2="599" y2="50" class="d-line" />
<line x1="599" y1="42" x2="599" y2="58" class="d-line" />
<text x="648" y="54" text-anchor="middle" class="d-step">3 s quiet</text>
<text x="10" y="114" class="d-note">Notes sent</text>
<line x1="170" y1="110" x2="698" y2="110" class="d-rule" />
<circle cx="170" cy="110" r="6" class="d-dot" />
<circle cx="500" cy="110" r="6" class="d-dot" />
<circle cx="698" cy="110" r="6" class="d-ring" />
<text x="170" y="136" class="d-note">"typing"</text>
<text x="500" y="136" text-anchor="middle" class="d-note">"typing" again</text>
<text x="704" y="136" text-anchor="end" class="d-note">"stopped"</text>
<text x="10" y="184" class="d-note">Dots on their</text>
<text x="10" y="202" class="d-note">screen</text>
<rect x="170" y="172" width="528" height="26" class="d-box d-box-accent" />
<circle cx="418" cy="185" r="4" class="d-dot" /><circle cx="434" cy="185" r="4" class="d-dot" /><circle cx="450" cy="185" r="4" class="d-dot" />
<text x="170" y="226" class="d-step">0 s</text>
<text x="500" y="226" text-anchor="middle" class="d-step">10 s</text>
<text x="599" y="226" text-anchor="middle" class="d-step">13 s</text>
<text x="698" y="226" text-anchor="end" class="d-step">16 s</text>
</svg>
<figcaption>Thirteen seconds of typing costs three small notes. If "stopped" never arrives, the dots hide themselves after 15 seconds.</figcaption>
</figure>

## Build your own

Paste this into your AI coding agent, inside the chat app you want to add it to.

```text
Add a typing indicator to this chat app.

First, look at the project and tell me in one or two sentences how messages travel between users today (for example WebSockets, Socket.IO, server-sent events, or polling). Build on that. Do not add a new real-time system if one already exists. If there is none, tell me and suggest the simplest option before you build anything.

1. Sending side (the person typing)
- When the text in the message box changes and is not empty, call a function named noteTyping for that conversation. Limit it so it runs at most once every 300 milliseconds.
- noteTyping does two things:
  a) If no repeat timer is running, send a "typing started" event now and start a 10-second repeat timer. When that timer fires, send "typing started" again and restart it.
  b) Always restart a 3-second quiet timer. When the quiet timer fires, send "typing stopped" and cancel both timers.
- When the user sends their message, cancel both timers without sending "typing stopped".
- Also cancel both timers when the user leaves the conversation or closes the page.
- The event carries only: conversation id, user id, and started or stopped. Never include the text being typed.

2. Server
- Pass typing events on to the other people in that conversation and to nobody else. Check the sender really belongs to that conversation.
- Do not save typing events anywhere. If a recipient is offline, drop the event instead of queueing it.

3. Receiving side
- Keep a small list per conversation of who is typing right now.
- On "typing started": add that person and start, or restart, a 15-second timer for them.
- Remove a person when "typing stopped" arrives, when a real message from them arrives, or when their 15-second timer runs out.
- Ignore typing events from myself.

4. What the user sees
- At the bottom of the message list, show three small dots that pulse one after another, using a CSS animation with the second and third dot delayed slightly.
- In a group chat, show who is typing: one name, two names, or "Several people are typing".
- Make it screen-reader friendly with a polite live region that says "<name> is typing".
- Respect the reduced-motion setting: show still dots instead of animating.

5. A setting
- Add an on/off setting for typing indicators. When it is off, this user sends no typing events and sees none.

When you are done, tell me which files you created or changed and how to test it with two browser windows side by side. Explain each step simply; I am not a developer.
```

## Limits and notes

**What was analysed.** Signal Desktop 8.30.0 for Windows. Signal was not installed on our machine, so we downloaded the official installer (its signature checks out as Signal Messenger), and took the app package out of it without installing or running it. Then Signal Desktop's public source code on GitHub (commit `5c1a030485`, AGPL-3.0 licence).

**What REA confirmed.** Very little. REA opened the app package and counted 1,020 relevant files holding 33.4 MB of text, but it only got through 3 small files before hitting its time limit (REA evidence `ev_bd79d03d`). We then gave it only the one 6 MB file that holds the typing code, and it timed out on that as well (`ev_03b239e9`). So REA produced no evidence about the typing indicator.

**What we read directly in the shipped app.** A plain text search of that 6 MB file, where the relevant names are still readable, shows:

- The trigger: a draft change with non-empty text.
- The limit of one trigger per 300 milliseconds.
- The 10-second repeat and the 3-second quiet timer.
- The 15-second countdown on the receiving side.
- In the stylesheet: three dots, with the second and third delayed by 160 and 320 milliseconds.

**What we read in the open-source code.** The same timings, plus the parts the shipped file makes hard to follow: sending a message cancels the timers, only the latest waiting note is sent, typing notes are skipped for notes to yourself, the setting switches off both sending and showing, and dots are cleared when a message from that person arrives.

**What is inferred, not proven.**

- "Only worth delivering right now" is our reading of how the notes are flagged when sent. We did not look at what Signal's servers do with them.
- The reasons given, such as 15 seconds being a safety net for a 10-second repeat, are ours. The code gives the numbers, not the thinking.
- Nothing was watched while running. We never saw the dots appear on a real screen.

**What we did not cover.** How the notes are encrypted and delivered, group chats in detail, Signal's phone apps, and how the dots are placed next to a person's avatar.

**About the prompt.** It uses the same timings because they are sensible, but the wording and structure are our own and no Signal code is included. The timings are a starting point; tune them for your app.
