import React from 'react';
import Header from './Header';
import TaskList from './TaskList.js';
import AddNew from './AddNew.js';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks,
            selected: this.props.tasks
        }
    }

    addTask(text) {
        let task = {
            text: text,
            completed: false,
            subtasks: []
        };

        let tasks = [...this.state.selected.subtasks];
        tasks.push(task);

        this.setState({ tasks: tasks });
    }

    removeItem(indices) {
        let tasks = [...this.state.tasks];
        console.debug('remove item called with ' + indices);

        let toSplice = indices.pop();
        let target = this.getNestedList(tasks, indices);
        
        console.debug(target);
        target.splice(toSplice, 1);

        this.setState({ tasks: tasks });
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
            if(target.subtasks) {
                target = target.subtasks[index];
            } else {
                target = target[index];
            }
        })

        return target;
    }

    selectTask(indices) {
        console.log(indices + ' selected');
        this.state.selected = this.getNestedTask(this.props.tasks, indices);
    }

    render() {
        return (
            <div className="container">
                <Header title={this.props.title}></Header>

                <TaskList tasks={this.state.tasks} 
                          removeItem={(indices) => { this.removeItem(indices) }}
                          selectTask={(indices)=>this.selectTask(indices)}></TaskList>

                <AddNew addNewTask={(text) => { this.addTask(text) }}></AddNew>
            </div>
        );
    }
}

export default Container;