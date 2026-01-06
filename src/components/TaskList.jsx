import React from 'react'
import {useSelector} from 'react-redux';
import TaskItem from './TaskItem';

function TaskList() {
    const tasks = useSelector((state) => state.tasks.list);

  return (
    <div>
        <ul className='taskList'>
            {tasks.map((task)=>(
                <TaskItem key={task.id} task={task}/>
            ))}
        </ul>
      
    </div>
  )
}

export default TaskList;
