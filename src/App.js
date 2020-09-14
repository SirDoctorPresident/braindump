import React from 'react';
import Container from './components/Container.js';
import './App.css';
import seedData from './seedData';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: seedData[0].subtasks,
      currentIndex: [],
      taskManager: {
        addTask: this.addTask.bind(this),
        deleteTask: this.deleteTask.bind(this),
        toggleTask: this.toggleTask.bind(this),
        moveTask: this.moveTask.bind(this),
        selectTask: this.selectTask.bind(this)
      }
    }
  }

  addTask(text) {
    let task = {
      text: text,
      completed: false,
      subtasks: []
    };

    let subtasks;
    if (this.state.currentIndex.length > 0) {
      subtasks = this.getNestedTask(this.state.tasks, this.state.currentIndex).subtasks;
    } else {
      subtasks = this.state.tasks;
    }

    subtasks.push(task);

    this.setState({ tasks: [...this.state.tasks] });
  }

  deleteTask(indices) {
    let tasks = [...this.state.tasks];
    console.log('remove item called with ' + indices);

    let toSplice = indices.pop();
    let target = this.getNestedList(tasks, indices);

    console.log(target);
    target.splice(toSplice, 1);

    this.setState({ tasks: tasks });
  }

  toggleTask(indices) {
    let task = this.getNestedTask(this.state.tasks, indices);

    task.completed = !task.completed;

    this.setState({ tasks: [...this.state.tasks] })
  }

  moveTask(from, to) {
    console.log('Moving ' + from + ' to ' + to);

    let tasks = [...this.state.tasks];

    //get from task
    let fromIndex = from.pop();
    let fromList = this.getNestedList(tasks, from);

    let toIndex = to.pop();

    let task = fromList[fromIndex];

    //splice 'task' into array
    //if to index is -1 we just append to the end of the task list
    if (to && to[0] === '-1') {
      tasks.push(task);
    } else {
      let toList = this.getNestedList(tasks, to);
      toList.splice(toIndex, 0, task);
    }

    if (from.length === to.length && fromIndex > toIndex) {
      fromIndex++;
    }

    fromList.splice(fromIndex, 1);

    this.setState({ tasks: tasks });
  }

  selectTask(indices) {
    this.setState({ currentIndex: indices });
  }

  getNestedList(baseList, indices) {
    let target = baseList;

    indices.forEach(index => {
      target = target[index].subtasks;
    });

    return target;
  }

  getNestedTask(baseList, indices) {
    let target = baseList;

    indices.forEach(index => {
      if (target.subtasks) {
        target = target.subtasks[index];
      } else {
        target = target[index];
      }
    })

    return target;
  }

  render() {
    return (
      <React.Fragment>
        <Container {...this.state.taskManager} title={seedData[0].text}
          tasks={this.state.tasks}>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;