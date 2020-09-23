import React from 'react';
import TaskListContainer from './components/TaskListContainer.js';
import Taskwell from './components/Taskwell.js';
import './App.css';
import seedData from './seedData';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: seedData,
      currentIndex: [],
      taskManager: {
        addTask: this.addTask.bind(this),
        deleteTask: this.deleteTask.bind(this),
        toggleTask: this.toggleTask.bind(this),
        moveTask: this.moveTask.bind(this),
        selectTask: this.selectTask.bind(this),
        updateTask: this.updateTask.bind(this)
      }
    }
  }

  addTask(text, indices) {
    let task = {
      text: text,
      completed: false,
      subtasks: []
    };

    let tasks = this.state.tasks;

    if(!indices){
      indices = this.state.currentIndex;
    }

    tasks.push(task);
    this.setState({tasks:tasks});
    if(indices.length > 0) {
      this.moveTask([tasks.length - 1], indices);
    }
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

    //get 'from' task
    let fromIndex = from.pop();
    let fromList = this.getNestedList(tasks, from);
    let task = fromList[fromIndex];


    //splice 'task' into array
    let toIndex = to.pop();
    let toList = this.getNestedList(tasks, to);
    toList.splice(toIndex, 0, task);

    if (from.length === to.length && from.join() === to.join() && fromIndex > toIndex) {
      fromIndex++;
    }

    fromList.splice(fromIndex, 1);

    this.setState({ tasks: tasks });
  }

  selectTask(indices) {
    return new Promise((resolve) => {
      this.setState({ currentIndex: indices }, () => { resolve() });
    });
  }

  updateTask(indices, e) {
    e.preventDefault();

    let tasks = [...this.state.tasks];

    let task = this.getNestedTask(tasks, indices);
    task.text = e.target.innerText;

    this.setState({ tasks: tasks })
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
      <Taskwell moveTask={this.moveTask.bind(this)}>
        {
          this.state.tasks.map((tasks, index) => {
            return (
              <TaskListContainer
                key={index}
                index={index}
                title={tasks.text}
                tasks={tasks.subtasks}
                {...this.state.taskManager}
              ></TaskListContainer>
            )
          })
        }
        <button className="add-task-list"
          onClick={(e) => {this.addTask('New List', [])}}
        >+</button>
      </Taskwell>
    );
  }
}

export default App;