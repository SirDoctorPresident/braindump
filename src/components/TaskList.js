import React from 'react';
import Task from './Task.js';
import AddNew from './AddNew.js';


class TaskList extends React.Component {
    onDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        let dragging = document.querySelector('.dragging');
        let placeholder = document.querySelector('#placeholder');

        let closestTask = this.getTaskMouseIsOver(e.clientY, e.clientX);

        if (closestTask && closestTask.position === 'above' && dragging.nextSibling === closestTask.element) {
            return;
        } else if (closestTask && closestTask.position === 'below' && dragging.previousSibling === closestTask.element) {
            return;
        } else if (closestTask && closestTask.position === 'below' && closestTask.element.querySelector('ul li')) {
            return;
        }

        if (closestTask.element && placeholder) {
            let ancestor = closestTask.element;
            let inSubtask = false;
            while (ancestor = ancestor.parentNode) {
                if (ancestor === dragging) {
                    inSubtask = true;
                }
            }

            if (!inSubtask) {
                if (closestTask.position === 'above') {
                    placeholder.setAttribute('data-indices', closestTask.element.id)
                    closestTask.element.parentNode.insertBefore(placeholder, closestTask.element);
                } else {
                    let toIndices = closestTask.element.id.split(',');
                    let lastIndex = toIndices.pop();

                    lastIndex = parseInt(lastIndex) + 1;
                    toIndices.push(lastIndex);

                    placeholder.setAttribute('data-indices', toIndices.join(','))
                    closestTask.element.parentNode.insertBefore(placeholder, closestTask.element.nextSibling);
                }
            }
        } else if (placeholder) {
            placeholder.setAttribute('data-indices', this.props.index + ',0');
            e.currentTarget.appendChild(placeholder);
        }
    }

    getTaskMouseIsOver(y, x) {
        let tasks = [...document.querySelectorAll('li:not(.dragging)')];

        return tasks.filter((task) => {
            const box = task.getBoundingClientRect();

            return x >= box.left && x <= box.left + box.width;
        }).reduce((closest, task) => {
            const box = task.querySelector('.task-content').getBoundingClientRect();
            const offsetY = y - box.top - box.height / 2;

            if (Math.abs(offsetY) < closest.offsetY)
                return { offsetY: offsetY, element: task, position: offsetY < 0 ? 'above' : 'below' }
            else
                return closest
        }, { offsetY: Number.POSITIVE_INFINITY, element: null });
    }


    dropTask(e) {
        e.stopPropagation();

        let placeholder = document.querySelector('#placeholder');
        let dragging = document.querySelector('.dragging');

        if (placeholder.hasAttribute('data-indices')) {
            this.props.moveTask(dragging.id.split(','), placeholder.getAttribute('data-indices').split(','))
        }
        placeholder.remove();
    }

    render() {
        let tasks = this.props.tasks.map((task, index) => {
            return (
                <Task task={task}
                    key={index}
                    indices={[this.props.index, index]}
                    selectTask={this.props.selectTask}
                    toggleTask={this.props.toggleTask}
                    deleteTask={this.props.deleteTask}
                    moveTask={this.props.moveTask}
                    updateTask={this.props.updateTask}
                    addTask={this.props.addTask}
                    onDragOver={this.onDragOver.bind(this)}
                ></Task>
            )
        });

        return (
            <React.Fragment>
                <ul
                    onDragOver={e => this.onDragOver(e)}
                    onDrop={(e) => { this.dropTask(e) }}
                    onDragEnter={(e) => {
                        e.stopPropagation(); document.querySelector('#placeholder').className = 'task-spacer';
                    }}
                >
                    {tasks}
                </ul>
                <AddNew addTask={this.props.addTask} index={[this.props.index, this.props.tasks.length]}></AddNew>
            </React.Fragment>


        )
    }
}

export default TaskList;