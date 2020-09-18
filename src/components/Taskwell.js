import React from 'react';
import TaskListContainer from './TaskListContainer';

class Taskwell extends React.Component {
    onDragOver(e) {
        e.preventDefault();
        e.stopPropagation();

        let placeholder = document.querySelector('#placeholder');
        let closestTaskList = this.getClosestTaskListContainer(e.clientX, e.clientY);

        if (closestTaskList && closestTaskList.element && placeholder) {

            if (closestTaskList.position === 'before') {
                placeholder.setAttribute('data-indices', closestTaskList.element.id);
                closestTaskList.element.parentNode.insertBefore(placeholder, closestTaskList.element);
            } else {
                placeholder.setAttribute('data-indices', parseInt(closestTaskList.element.id) + 1);
                closestTaskList.element.parentNode.insertBefore(placeholder, closestTaskList.element.nextSibling);
            }
        }
    }

    getClosestTaskListContainer(x, y) {
        let tasks = [...document.querySelectorAll('.task-list-container')];

        //get container in the same row as the cursor
        let anchor = tasks.find((task) => {
            let box = task.getBoundingClientRect();

            return box.top <= y && box.top + box.height >= y;
        })

        if (anchor) {
            //get all containers with that top
            let row = tasks.filter((task) => {
                let box = task.getBoundingClientRect();

                return box.top === anchor.getBoundingClientRect().top;
            })

            //get the one with the closest x coordinate
            return row.reduce((closest, task) => {
                let box = task.getBoundingClientRect();
                let offset = x - (box.left + box.width / 2);

                if (Math.abs(offset) < closest.offset)
                    return { offset: offset, position: offset > 0 ? 'after' : 'before', element: task }
                else
                    return closest;
            }, { offset: Number.POSITIVE_INFINITY, element: null });
        }
    }

    dropTask(e) {
        e.stopPropagation();
        
        let placeholder = document.querySelector('#placeholder');
        let dragging = document.querySelector('.dragging');

        if (placeholder && placeholder.hasAttribute('data-indices')) {
            this.props.moveTask(dragging.id.split(','), placeholder.getAttribute('data-indices').split(','))
        }

        placeholder.remove();
    }

    render() {
        return (
            <div className='container'
                onDragOver={e => this.onDragOver(e)}
                onDragEnter={e => document.querySelector('#placeholder').className = 'task-list-spacer'}
                onDrop={(e)=>{this.dropTask(e)}}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Taskwell;