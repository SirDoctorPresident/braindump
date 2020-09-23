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
- [X] Delete task feature - clicking the delete button attached to a task should remove it from the list

### Version 0.1.3

- [X] Single todo list
- [X] Add subtask feature - Clicking on an existing task should make it active; while an existing task is active, typing a new task into the `add task` input should generate a new subtask *under* the selected task
- [X] Subtasks should be deletable as well

### Version 0.1.4

- [X] Add rearrange task feature - add an icon to each task which, when clicked, allows the user to drag the selected task and drop it anywhere in the task hierarchy. A task should carry all its subtasks with it.

### Version 0.1.5

- [X] Generate new list feature - add a button which, when clicked, prompts the user for a title and then generates a new list based on this title.
- ~~[ ] Initially, we will limit this feature to 4 lists per page~~

### Version 0.1.6

- [X] Make "rearrange" feature work across lists - you should be able to drag a task from one list and drop it in another list

### Version 0.1.7

- [X] Allow a task to be dropped outside of any existing list - when this is done the task should become the title of a new list and its subtasks should become the tasks.

### Version 0.1.8

- ~~[ ] Make positioning absolute; user should be able to drag lists anywhere on the page~~
- [X] Remove limit on the number of lists

### Version 0.1.9

- [ ] Revisit UI element design.
- [ ] Consider adding a "floating dock" with add, edit, delete, and rearrange icons that will appear beside whatever task is clicked


### Additional Features

- [X] Allow user to generate task hierarchy during single task creation using enter/tabs
- [] Single/double tap to edit
- [] Swipe to delete
- [] "long press" to drag
- [] Allow user to click title card to set the top level list as currently selected
- [] Allow the user to click anywhere on the page to make the top level list of the previously selected task currently selected
- [] Selection should come with a visual cue and automatically highlight the add new input
- [] Consider making delete icon only appear for selected todo (keep does this)
- [] Add "flush" icon to todo title to remove completed task and preserve uncompleted ones
- [] Add an option for "notes" instead of checkboxes (bullet instead of checkbox)
- [X] Fix hover bug; hovering over an li should only highlight that li, not its children. (Need to make this a script event instead of a css event)
- [X] Switch delete and checkbox icons
- [X] Fix checkboxes. Need to tie `checked` to the `completed` property of the corresponding task to fix key bug caused when removing tasks.