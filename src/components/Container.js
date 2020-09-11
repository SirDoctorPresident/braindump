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

    toggleCompleted(indices) {
        let task = this.getNestedTask(this.state.tasks, indices);

        task.completed = !task.completed;

        this.setState({tasks: [...this.state.tasks]})
    }

    shiftTask(from, to) {
        console.log('Moving ' + from + ' to ' + to);

        let tasks = [...this.state.tasks];

        //get from task
        let fromIndex = from.pop();
        let fromList = this.getNestedList(tasks, from);

        let toIndex = to.pop();

        let task = fromList[fromIndex];

        //splice 'task' into array
        //if to index is -1 we just append to the end of the task list
        if(to && to[0] === '-1'){
            tasks.push(task);
        } else {
            let toList = this.getNestedList(tasks, to);
            toList.splice(toIndex, 0, task);
        }

        if(from.length === to.length && fromIndex > toIndex){
            fromIndex++;
        }
        
        fromList.splice(fromIndex, 1);

        this.setState({tasks: tasks});
    }
    
    render() {
        return (
            <div className="container">
                <Header title={this.props.title}></Header>

                <TaskList tasks={this.state.tasks} 
                          removeItem={(indices) => { this.removeItem(indices) }}
                          selectTask={(indices)=>this.setCurrentIndex(indices)}
                          toggleCompleted={(indices)=>{this.toggleCompleted(indices)}}
                          shiftTask={(from, to)=>(this.shiftTask(from,to))}></TaskList>

                <AddNew addNewTask={(text) => { this.addTask(text) }}></AddNew>
            </div>
        );
    }
}

export default Container;