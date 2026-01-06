import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux/taskSlice';

function TaskInput() {
    const [inputValue, setInputValue] = useState('');
    const [priority, setPriority] = useState('Low');
    const [dueDate,setDueDate]=useState('');
    const dispatch = useDispatch();

    const handleAdd=()=>{
        if(inputValue.trim()==="" || !inputValue)
            return alert("Task cannot be empty");
        if(!dueDate || dueDate.trim() ==="") {
            return alert("Due date is required");
        } else {
            const selectedDate = new Date(dueDate);
            const currentDate = new Date();
            if(selectedDate < currentDate.setHours(0,0,0,0)){
                return alert("Due date cannot be in the past");     
            }
        }

        dispatch(addTask(
            {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false,
                priority: priority,
                dueDate: dueDate

            }
        ));
        setInputValue('');
        setPriority('Low');
        setDueDate('');
        
    }

    return (
        <div className="input-section">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new task"
            />

            <select className='priority' value={priority} onChange={e=>setPriority(e.target.value)} name='priority'>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <input className='date' type="date" name="dueDate" value={dueDate} onChange={e=>setDueDate(e.target.value)} />

            <button onClick={handleAdd}>Add Task</button>
        </div>

    );
}

export default TaskInput; 