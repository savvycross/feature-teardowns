---
title: "The command palette"
app: "VS Code"
difficulty: "Intermediate"
readTime: 7
summary: "Press Ctrl+Shift+P, type a few letters, hit Enter. One search box that can run anything in the app. Here is what happens between the keypress and the command."
date: 2026-10-12
---

## What it does

Press Ctrl+Shift+P (or F1) in VS Code and a search box drops down from the top of the window, listing every command the app has. Type a few letters and the list shrinks to what matches. Press Enter and the highlighted command runs.

It means you never need to remember which menu something lives in. If you can half-remember its name, you can run it. Commands you used recently sit at the top, so the things you do often are usually two keystrokes away.

## How it works

The palette is not really a feature of its own. It is a search box sitting on top of a big list the app already keeps: every command, each with a hidden ID, a readable name, and the thing to do when it runs.

1. **One shortcut, one tiny job.** Ctrl+Shift+P and F1 both point at a single action called "Show All Commands". That action does almost nothing. It asks the app's shared search box to open with a `>` already typed in it.
2. **The first character decides what the box is.** VS Code uses the same box for several pickers (opening files, jumping to a line, and so on). The `>` tells it "list commands". The box rechecks this on every keystroke, which is why deleting the `>` instantly turns the palette into the file picker.
3. **The list is gathered fresh each time.** When the palette opens, it asks the app for every command that belongs in the palette and is allowed right now. Commands that make no sense at the moment are left out. Each one is shown as "Category: Name".
4. **Every keystroke starts the search again.** The half-finished search from the previous keystroke is cancelled, so a slow result can never overwrite a newer one. Everything after the `>` is the search text.
5. **Matching is forgiving, in a fixed order.** For each command it first checks whether your text appears in the name as one unbroken run. If not, it checks whether your letters line up with the starts of words, so `gc` can find "Git: Commit". It also checks the command's original English name, and an exact hidden ID. Matched letters are highlighted.
6. **A last-chance "similar wording" pass.** If you have typed three or more characters and a command still has not matched, a looser scoring step can let a handful of related commands in. These go at the bottom under their own heading.
7. **Sorting puts your habits first.** Commands you ran recently come first, newest at the top. The app remembers a limited number of them between sessions. After that the list is alphabetical, with developer-only commands pushed down.
8. **Enter closes the box, then runs the command.** The box hides first. The command is added to your recent list. Then its ID is handed to the app's central "run this command" service. If the command fails, you get an error message instead of a silent nothing.

The important part is what the palette does not know. It has no idea what any command does. It only knows names and IDs, and it hands the chosen ID to something else to run. That separation is why any extension can add a command and have it appear in the palette for free.

## Diagram

<figure class="diagram">
<svg viewBox="0 0 720 260" role="img" aria-label="A shortcut opens the search box. The search box sends what you type to the command list and gets matches back. On Enter, the chosen command goes to the runner.">
<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-arrowhead" /></marker></defs>
<rect x="10" y="20" width="145" height="80" class="d-box" />
<text x="82" y="67" text-anchor="middle" class="d-title">Shortcut</text>
<rect x="195" y="20" width="145" height="80" class="d-box d-box-accent" />
<text x="267" y="67" text-anchor="middle" class="d-title">Search box</text>
<rect x="380" y="20" width="145" height="80" class="d-box" />
<text x="452" y="67" text-anchor="middle" class="d-title">Command list</text>
<rect x="565" y="20" width="145" height="80" class="d-box" />
<text x="637" y="67" text-anchor="middle" class="d-title">Runner</text>
<line x1="159" y1="60" x2="191" y2="60" class="d-line" marker-end="url(#arrow)" />
<line x1="344" y1="48" x2="376" y2="48" class="d-line" marker-end="url(#arrow)" />
<line x1="376" y1="72" x2="344" y2="72" class="d-line" marker-end="url(#arrow)" />
<line x1="529" y1="60" x2="561" y2="60" class="d-line" marker-end="url(#arrow)" />
<text x="10" y="140" class="d-step">01</text>
<text x="10" y="162" class="d-note">Ctrl+Shift+P opens</text>
<text x="10" y="182" class="d-note">the box with ">"</text>
<text x="10" y="202" class="d-note">already typed.</text>
<text x="195" y="140" class="d-step">02</text>
<text x="195" y="162" class="d-note">You type. Each key</text>
<text x="195" y="182" class="d-note">cancels the old</text>
<text x="195" y="202" class="d-note">search, starts anew.</text>
<text x="380" y="140" class="d-step">03</text>
<text x="380" y="162" class="d-note">Matches, sorts and</text>
<text x="380" y="182" class="d-note">highlights. Recent</text>
<text x="380" y="202" class="d-note">commands go first.</text>
<text x="565" y="140" class="d-step">04</text>
<text x="565" y="162" class="d-note">On Enter: close the</text>
<text x="565" y="182" class="d-note">box, remember it,</text>
<text x="565" y="202" class="d-note">run it by its ID.</text>
</svg>
<figcaption>Steps 02 and 03 repeat on every keystroke. The palette only ever passes an ID to the runner.</figcaption>
</figure>

## Build your own

Paste this into your AI coding agent, inside the project you want to add it to.

```text
Add a command palette to this web app.

First, look at the project and tell me in one sentence what framework it uses. Build the palette in that framework's normal style. If it is plain HTML and JavaScript, use plain JavaScript. Do not add any new libraries.

1. A command list
- Create one small module that holds every command. Each command has: a unique id, a title, an optional category, a run function, and an optional isAvailable function that returns true or false.
- Give me a registerCommand function so any part of the app can add a command, and a runCommand(id) function that runs one.
- The palette must never contain command logic itself. It only reads the list and calls runCommand with an id.
- Register 5 to 8 real commands using things this app can already do (for example: go to a page, toggle dark mode, open settings, sign out).

2. Opening and closing
- Open with Ctrl+Shift+P on Windows and Linux and Cmd+Shift+P on Mac. Also open with Ctrl+K / Cmd+K, because some browsers reserve Ctrl+Shift+P for themselves.
- Show a centred panel near the top of the screen with a text box and a list under it, over a dimmed background.
- Close on Escape, on clicking outside, and after a command runs. When it closes, put keyboard focus back where it was before.

3. Filtering as I type
- Build the list fresh every time the palette opens, leaving out commands whose isAvailable returns false. Show each as "Category: Title".
- On every keystroke, filter the list. A command matches if the typed text appears anywhere in its label, ignoring upper and lower case. If that fails, it also matches if the typed letters line up with the starts of words in the label, so "gc" finds "Git: Commit".
- Highlight the matched letters in each result.
- If nothing matches, show a "No matching commands" row.

4. Order
- Commands I have run recently come first, most recent at the top, under a small "recently used" heading. Remember the last 50 in localStorage so it survives a refresh.
- Everything else is sorted alphabetically.

5. Choosing
- Up and Down arrows move the highlight and wrap around. The first result is highlighted by default. The highlighted row always scrolls into view.
- Enter or a mouse click runs the highlighted command: close the palette first, save the command to the recent list, then call runCommand. If the command throws an error, show a small error message instead of failing silently.

6. Accessibility
- The text box and list should use the standard combobox and listbox roles so screen readers announce the highlighted result.
- Keep keyboard focus inside the palette while it is open.

When you are done, tell me which files you created or changed, how to add a new command in one or two lines, and how to try it out. Explain each step simply; I am not a developer.
```

## Limits and notes

**What was analysed.** VS Code 1.137.0 for Windows, as installed. One file: `out/vs/workbench/workbench.desktop.main.js`, the 18.7 MB bundle that runs the main window (SHA-256 begins `e416416b`).

**What REA confirmed.** Less than we hoped. REA found the file and read all 19.6 million characters of it, but could not break it down into its parts: it reported one parse failure, zero modules and zero findings (REA evidence `ev_ac690a30`). So REA gave us no evidence about the palette itself.

**Where the explanation comes from instead.** We searched the text of that same shipped file directly and read the relevant passages. These things are written there in plain sight:

- Ctrl+Shift+P and F1 belong to one action, "Show All Commands", which opens the shared search box with `>`.
- The box picks its list from the first character and rechecks on every keystroke.
- The command list is rebuilt each time from the palette's menu, keeping only enabled commands.
- Each keystroke cancels the previous search.
- The matching order, the three-character rule and the cap of five "similar" results.
- Recent commands sort first, and the default memory is 50 commands.
- On Enter the box hides, the command is saved to history, then run by its ID, with an error message on failure.

**What is inferred, not proven.**

- The file is squashed, so most names are one or two letters. What the two matching helpers do ("unbroken run", then "starts of words") is our reading of their logic, not a label in the file.
- Nothing here was watched while running. We read what the code says, not what it did.

**What we did not look at.** How the box is drawn and animated, arrow-key movement in the list, how the app finds a command's code from its ID, and commands added by extensions. There is also an optional AI-assisted results path behind settings, which we left out.

**About the prompt.** It is our own simpler design, not a copy. It skips the "similar wording" pass and the multi-purpose search box.
