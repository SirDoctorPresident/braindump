import React from 'react';
import Task from './Task.js';

class TaskList extends React.Component {
    catchTask(e) {
        e.preventDefault();
        
        let dragging = document.querySelector('.dragging');
        let tasks = [...document.querySelectorAll('li')];
        
        let x = e.clientX, y = e.clientY;
        let elementMouseIsOver = document.elementFromPoint(x, y).closest('li');
        if(elementMouseIsOver){

            let ancestor = elementMouseIsOver;
            let inSubtask = false;
            while(ancestor = ancestor.parentNode) {
                if(ancestor == dragging)
                inSubtask = true;
            }

            if(!inSubtask){ 
                console.log(elementMouseIsOver.id);
                elementMouseIsOver.parentNode.insertBefore(dragging, elementMouseIsOver.nextSibling);
            }
        } else {
            dragging.parentNode.insertBefore(dragging,dragging.nextSibling);
        }
    }


    render() {
        let tasks = this.props.tasks.map((task, index) => {
            return <Task task={task}
                         key={index}
                         indices={[index]}
                         onDeleteClicked={(indices) => { this.props.removeItem(indices) }}
                         selectTask={(indices)=>{this.props.selectTask(indices)}}
                         toggleCompleted={(indices)=>{this.props.toggleCompleted(indices)}}></Task>
        });

        return (
            <ul onDragOver={e=>this.catchTask(e)}>{tasks}</ul>
        )
    }
}

export default TaskList;