import React from 'react';
import Task from './Task.js';

class TaskList extends React.Component {
    catchTask(e) {
        e.preventDefault();
        let dragging = document.querySelector('.dragging');
        let placeholder = document.querySelector('#placeholder');

        let closestTask = this.getTaskMouseIsOver(e.clientY);

        if(closestTask && closestTask.position === 'above' && dragging.nextSibling === closestTask.element)
        {
            return;
        } else if (closestTask && closestTask.position === 'below' && dragging.previousSibling === closestTask.element) {
            return;
        } else if (closestTask && closestTask.position === 'below' && closestTask.element.querySelector('ul li')) {
            return;
        }

        if (closestTask.element) {
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
        }
    }

    getTaskMouseIsOver(y) {
        let tasks = [...document.querySelectorAll('li:not(.dragging)')];

        return tasks.reduce((closest, task) => {
            const box = task.querySelector('.task-content').getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (Math.abs(offset) < closest.offset)
                return { offset: offset, element: task, position: offset < 0 ? 'above' : 'below' }
            else
                return closest
        }, { offset: Number.POSITIVE_INFINITY, element: null });
    }


    dropTask(e) {
        let placeholder = document.querySelector('#placeholder');
        let dragging = document.querySelector('.dragging');

        // placeholder.parentNode.insertBefore(dragging, placeholder);

        this.props.shiftTask(dragging.id.split(','), placeholder.getAttribute('data-indices').split(','))
        placeholder.remove();
    }

    render() {
        let tasks = this.props.tasks.map((task, index) => {
            return <Task task={task}
                key={index}
                indices={[index]}
                onDeleteClicked={(indices) => { this.props.removeItem(indices) }}
                selectTask={(indices) => { this.props.selectTask(indices) }}
                toggleCompleted={(indices) => { this.props.toggleCompleted(indices) }}
                shiftTask={(from, to) => this.props.shiftTask(from, to)}
                catchTask={e => this.catchTask(e)}></Task>
        });

        return (
            <ul onDragOver={e => this.catchTask(e)}
                onDrop={(e) => { this.dropTask(e) }}
            >{tasks}</ul>
        )
    }
}

export default TaskList;