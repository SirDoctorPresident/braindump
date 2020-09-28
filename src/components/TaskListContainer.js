import React from 'react';
import Header from './Header';
import TaskList from './TaskList.js';

class TaskListContainer extends React.Component {

    render() {
        return (
            <div className="task-list-container"
                 onDragOver={(e)=>{e.preventDefault();e.stopPropagation()}}
                 onDragEnter={(e)=>{e.stopPropagation();}}
                 id={this.props.index}
            >
                <Header title={this.props.title}></Header>

                <TaskList tasks={this.props.tasks}
                    index={this.props.index}
                    selectTask={this.props.selectTask}
                    toggleTask={this.props.toggleTask}
                    moveTask={this.props.moveTask}
                    deleteTask={this.props.deleteTask}
                    updateTask={this.props.updateTask}
                    addTask={this.props.addTask}
                ></TaskList>
            </div>
        );
    }
}

export default TaskListContainer;