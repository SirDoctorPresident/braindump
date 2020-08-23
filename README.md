# What dis?

A minimalistic to do list web app to learn web technologies and eventually use, if I do it right.

# How run?

`npm start` will start the page on localhost:3000

# Wus all dese files?

This project was created using create react app. And I don't know. By the end of this I hope to have a robust understanding of the following files, which I'm keeping around for reference right now:

- ./public/manifest.json
- robots.txt
- serviceWorker.js
- *.test.js
- setupTests.js

# What dis do?

Currently very little! current Road map to MVP below. 

## Version 0.1.0

- [X] Single todo list
- [X] Single component
- [X] Static html
- [X] Tentative style sheet
- [X] Non-interactive
- This is just about seeing the markup we want the dynamic app to generate. Just a static, hardcoded list with minimal styling, and an input box what does nothing.

## Version 0.1.1

- [X] Single todo list
- [X] Multiple components
- [X] List/html generated programmatically based on seed data

### Version 0.1.2

- [X] Single todo list
- [X] Add task feature - Entering a new task and pressing enter should add a new task to the list
- [ ] Delete task feature - clicking the delete button attached to a task should remove it from the list

### Version 0.1.3

- [ ] Single todo list
- [ ] Add subtask feature - Clicking on an existing task should make it active; while an existing task is active, typing a new task into the `add task` input should generate a new subtask *under* the selected task
- [ ] Subtasks should be deletable as well

### Version 0.1.4

- [ ] Single todo list
- [ ] Add rearrange task feature - add an icon to each task which, when clicked, allows the user to drag the selected task and drop it anywhere in the task hierarchy. A task should carry all its subtasks with it.

### Version 0.1.5

- [ ] Generate new list feature - add a button which, when clicked, prompts the user for a title and then generates a new list based on this title.
- [ ] Initially, we will limit this feature to 4 lists per page

### Version 0.1.6

- [ ] Make "rearrange" feature work across lists - you should be able to drag a task from one list and drop it in another list

### Version 0.1.7

- [ ] Allow a task to be dropped outside of any existing list - when this is done the task should become the title of a new list and its subtasks should become the tasks.

### Version 0.1.8

- [ ] Make positioning absolute; user should be able to drag lists anywhere on the page
- [ ] Remove limit on the number of lists

### Version 0.1.9

- [ ] Revisit UI element design.
- [ ] Consider adding a "floating dock" with add, edit, delete, and rearrange icons that will appear beside whatever task is clicked