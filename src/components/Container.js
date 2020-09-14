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


    render() {
        return (
            <div className="container">
                <Header title={this.props.title}></Header>

                <TaskList tasks={this.props.tasks}
                    selectTask={this.props.selectTask}
                    toggleTask={this.props.toggleTask}
                    moveTask={this.props.moveTask}
                    deleteTask={this.props.deleteTask}
                ></TaskList>

                <AddNew addTask={this.props.addTask}></AddNew>
            </div>
        );
    }
}

export default Container;