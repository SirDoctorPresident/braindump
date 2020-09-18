import React from 'react';
import Header from './Header';
import TaskList from './TaskList.js';
import AddNew from './AddNew.js';

class TaskListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks,
            currentIndex: []
        }
    }


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
                ></TaskList>

                <AddNew addTask={this.props.addTask} index={this.props.index} selectTask={this.props.selectTask}></AddNew>
            </div>
        );
    }
}

export default TaskListContainer;