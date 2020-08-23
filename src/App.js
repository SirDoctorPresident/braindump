import React from 'react';
import './App.css';
import seedData from './seedData';

function App() {
  console.log(seedData);
  return (
    <React.Fragment>
      <Container title={seedData[0].title}
                 tasks={seedData[0].tasks}>
      </Container>
    </React.Fragment>
  );
}

class Container extends React.Component {
  render() {
    return (
      <div className="container">
        <Header title={this.props.title}></Header>
        <TaskList tasks={this.props.tasks}></TaskList>
        <AddNew></AddNew>
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
    let tasks = this.props.tasks.map( (task)=> {
      console.log(task);
      return <Task task={task} key={i++}></Task>
    });

    return (
      <ul>{tasks}</ul>
    )
  }
}

class AddNew extends React.Component {
  render() {
    return (      
      <input type="text" className="primary-add" placeholder="Add a new task to 'TODO'" />
    )
  }
}

class Task extends React.Component {
  render() {
    let i = 0;
    let subtasks = this.props.task.subtasks.map( (task)=> {
      console.log(task);
      return <Task task={task} key={i++}></Task>
    });

   return (
    <li>
      <input type="checkbox" defaultChecked={this.props.task.completed}/>
      {this.props.task.text}
      <ul>
        {subtasks}
      </ul>
    </li>
  )
  }
}

export default App;

