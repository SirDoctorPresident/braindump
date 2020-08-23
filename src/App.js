import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h2>TODO</h2>
      <ul>
        <li><input type="checkbox" /> Yoga</li>
        <li><input type="checkbox" /> Dishes</li>
        <li><input type="checkbox" /> Todo list MVP
          <ul>
            <li><input type="checkbox" /> Design static page with seed data</li>
            <li><input type="checkbox" /> Make static page with seed data
              <ul>
                <li><input type="checkbox" /> Write and style page</li>
                <li><input type="checkbox" /> Generate seed data for comparison</li>
              </ul>
            </li>
            <li><input type="checkbox" /> Implement static page with react components</li>
            <li><input type="checkbox" /> Hoist State as appropriate</li>
            <li><input type="checkbox" /> Implement add/delete tasks</li>
            <li><input type="checkbox" /> Implement add/delete subtasks</li>
            <li><input type="checkbox" /> Implement rearrange taks</li>
            <li><input type="checkbox" /> Add history</li>
          </ul>
        </li>
        <li><input type="checkbox" /> Check Mychart email</li>
        <li><input type="checkbox" /> Pay KP fees online</li>
        <li><input type="checkbox" /> Call Morehouse for Watkins</li>
        <li><input type="checkbox" /> Groceries</li>
      </ul>
      <input type="text" class="primary-add" placeholder="Add a new task to 'TODO'"/>
    </div>
  );
}

export default App;
