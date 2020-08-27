import React from 'react';
import Header from './Header';
import TaskList from './TaskList.js';
import AddNew from './AddNew.js';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks,
            currentIndex: []
        }
    }

    addTask(text) {
        let task = {
            text: text,
            completed: false,
            subtasks: []
        };

        let subtasks;
        if(this.state.currentIndex.length > 0) {
            subtasks = this.getNestedTask(this.state.tasks, this.state.currentIndex).subtasks;
        } else {
            subtasks = this.state.tasks;
        }

        subtasks.push(task);

        this.setState({ tasks: [...this.state.tasks] });
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

    setCurrentIndex(indices) {
        this.setState({currentIndex: indices});
    }

    render() {
        return (
            <div className="container">
                <Header title={this.props.title}></Header>

                <TaskList tasks={this.state.tasks} 
                          removeItem={(indices) => { this.removeItem(indices) }}
                          selectTask={(indices)=>this.setCurrentIndex(indices)}></TaskList>

                <AddNew addNewTask={(text) => { this.addTask(text) }}></AddNew>
            </div>
        );
    }
}

export default Container;