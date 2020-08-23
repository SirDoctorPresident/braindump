import React from 'react';
import './App.css';
import seedData from './seedData';

function App() {
  return (
    <React.Fragment>
      <Container title={seedData[0].title}
        tasks={seedData[0].tasks}>
      </Container>
    </React.Fragment>
  );
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks
    }
  }

  addTask(text) {
    let task = {
      text: text,
      completed: false,
      subtasks: []
    };

    let tasks = [...this.state.tasks];
    tasks.push(task);

    this.setState({ tasks: tasks });
  }

  render() {
    return (
      <div className="container">
        <Header title={this.props.title}></Header>
        <TaskList tasks={this.state.tasks}></TaskList>
        <AddNew addNewTask={(text) => { this.addTask(text) }}></AddNew>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return <h2>{this.props.title}</h2>
  }
}

class TaskList extends React.Component {
  render() {
    let i = 0;
    let tasks = this.props.tasks.map((task) => {
      return <Task task={task} key={i++}></Task>
    });

    return (
      <ul>{tasks}</ul>
    )
  }
}

class AddNew extends React.Component {
  submitNewTask(e) {
    if (e.keyCode === 13) {
      this.props.addNewTask(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <input type="text" className="primary-add" placeholder="Add a new task to 'TODO'" onKeyUp={(e)=>this.submitNewTask(e)} />
    )
  }
}

class Task extends React.Component {
  render() {
    let i = 0;
    let subtasks = this.props.task.subtasks.map((task) => {
      return <Task task={task} key={i++}></Task>
    });

    return (
      <li>
        <input type="checkbox" defaultChecked={this.props.task.completed} />
        {this.props.task.text}
        <ul>
          {subtasks}
        </ul>
      </li>
    )
  }
}

export default App;

