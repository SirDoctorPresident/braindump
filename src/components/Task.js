import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dragging: false };
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
        this.setState({ dragging: false });

        let placeholder = document.querySelector('#placeholder');
        if (placeholder)
            placeholder.remove();
    }

    onKeyUp(e) {
        let element = e.target;
        let indices = e.target.closest('li').id.split(',');

        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();

            let newIndex = parseInt(indices.pop()) + 1;
            let newIndices = [...indices, newIndex];

            this.props.addTask('', newIndices);
            this.setState({},
                () => { element.closest('li').nextSibling.querySelector('.text-content').focus() }
            );
        } else if (e.keyCode === 39 && e.shiftKey) {
            let index = parseInt(indices.pop());
            
            if(index > 0) {
                let insertAfter = element.closest('li').previousSibling.querySelector('ul').lastChild;
                let fromIndices = [...indices, index];
                let toIndices;
                if(insertAfter) {
                    let toIndex = insertAfter.id.split(',').pop();
                    toIndices = [...indices, index - 1, parseInt(toIndex) + 1];
                } else {
                    toIndices = [...indices, index - 1, 0];
                }

                this.props.moveTask(fromIndices, toIndices);
            }
        } else if (e.keyCode === 37 && e.shiftKey) {
            //determine if i can back up one (is indices length > 2)
            if(indices.length > 2) {
                let fromIndices = [...indices];
                indices.pop();
                let toIndex = parseInt(indices.pop()) + 1;
                let toIndices = [...indices, toIndex];

                this.props.moveTask(fromIndices, toIndices);
            }
        } else if (e.keyCode === 8) {
            if(e.target.textContent.length === 0) {
                this.props.deleteTask(this.props.indices);
            }
        }
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
                moveTask={(from, to) => this.props.moveTask(from, to)}
                addTask={this.props.addTask}
                updateTask={this.props.updateTask}
            >
            </Task>
        });

        return (
            <li className={this.state.dragging ? "dragging" : ""}
                draggable={this.state.dragging}
                onDragStart={(e) => { this.onDragStart(e) }}
                onDragEnd={(e) => { this.onDragEnd(e) }}
                id={this.props.indices.join()}>

                <div className="task-content"
                    onClick={(e, indices) => { e.stopPropagation(); this.props.selectTask(this.props.indices) }}>

                    <span className="fas fa-times-circle"
                        onClick={(e) => { e.stopPropagation(); this.props.deleteTask(this.props.indices) }}></span>

                    <span
                        className="text-content"
                        onBlur={e => this.props.updateTask(this.props.indices, e)}
                        onKeyUp={e => this.onKeyUp(e)}
                        contentEditable
                        suppressContentEditableWarning
                        dangerouslySetInnerHTML={{ __html: this.props.task.text }}
                    ></span>

                    <span className="right-controls">
                        {/* <input type="checkbox" checked={this.props.task.completed}
                            onChange={(e) => { this.props.toggleTask(this.props.indices) }} /> */}
                        <span className={this.props.task.completed ? 'fa fa-check-square' : 'fa fa-square'}
                            onClick={e => this.props.toggleTask(this.props.indices)}></span>

                        <span className="fa fa-grip-vertical"
                            onMouseDown={() => { this.setState({ dragging: true }) }}></span>
                    </span>
                </div>

                <ul
                >
                    {subtasks}
                </ul>
            </li>
        )
    }
}

export default Task;