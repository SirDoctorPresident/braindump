import React from 'react';
import Header from './Header';
import TaskList from './TaskList.js';
import AddNew from './AddNew.js';

class Container extends React.Component {
    constructor(props) {
        // this smells, i think because the state is supposed to live one level up
        super(props);
        this.state = {
            tasks: this.props.tasks
        }
    }

    addTask(text) {
        //TODO: take indices to add the new task at the correct level of the hierarchy
        let task = {
            text: text,
            completed: false,
            subtasks: []
        };

        let tasks = [...this.state.tasks];
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

    render() {
        return (
            <div className="container">
                <Header title={this.props.title}></Header>
                <TaskList tasks={this.state.tasks} removeItem={(indices) => { this.removeItem(indices) }}></TaskList>
                <AddNew addNewTask={(text) => { this.addTask(text) }}></AddNew>
            </div>
        );
    }
}

export default Container;