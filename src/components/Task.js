import React from 'react';

class Task extends React.Component {
    constructor(props){
        super(props);
        this.state = {dragging: false};
    }

    onDragStart(e) {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', this.props.indices.join());
        let placeholder = document.createElement("div");
        placeholder.id = 'placeholder';
        document.body.append(placeholder);
    }

    onDragEnd(e) {
        e.stopPropagation();
        this.setState({dragging: false});

        let placeholder = document.querySelector('#placeholder');
        if(placeholder)
            placeholder.remove();
    }

    render() {
        let subtasks = this.props.task.subtasks.map((task, index) => {
            let indices = [...this.props.indices, index];

            return <Task task={task}
                indices={indices}
                key={index}
                deleteTask={(indexes) => { this.props.deleteTask(indexes) }}
                selectTask={(indices) => { this.props.selectTask(indices) }}
                toggleTask={(indices) => { this.props.toggleTask(indices) }}
                moveTask={(from, to)=>this.props.moveTask(from, to)}
                catchTask={(e)=>{this.props.catchTask(e)}}>
            </Task>
        });

        return (
            <li className={this.state.dragging? "dragging": "" }
                draggable={this.state.dragging}
                onDragStart={(e)=>{this.onDragStart(e)}}
                onDragEnd={(e)=>{this.onDragEnd(e)}}
                id={this.props.indices.join()}>

                <div className="task-content" onClick={(e, indices) => { e.stopPropagation(); this.props.selectTask(this.props.indices) }}>
                    <span className="fas fa-times-circle"
                        onClick={(e) => { e.stopPropagation(); this.props.deleteTask(this.props.indices) }}></span>

                    <span>{this.props.task.text}</span>

                    <span className="right-controls">
                        {/* <input type="checkbox" checked={this.props.task.completed}
                            onChange={(e) => { this.props.toggleTask(this.props.indices) }} /> */}
                            <span className={this.props.task.completed? 'fa fa-check-square': 'fa fa-square'}
                                  onClick={e=>this.props.toggleTask(this.props.indices)}></span>

                        <span className="fa fa-grip-vertical"
                              onMouseDown={()=>{this.setState({dragging: true})}}></span>
                    </span>
                </div>

                <ul onDragOver={(e)=>{e.stopPropagation(); this.props.catchTask(e)}}>
                    {subtasks}
                </ul>
            </li>
        )
    }
}

export default Task;