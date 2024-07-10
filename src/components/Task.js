import React, { useState, useRef, useEffect } from 'react';
import { formatDate, convertToTimestamp } from '../utils/dateUtils';
import './Task.css';
import { useDrag } from 'react-dnd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateTaskInFirestore } from '../services/firestoreService'; // Importa la función

const Task = ({ task, onDelete, updateTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: task,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const isDueDatePassedOrToday = () => {
    if (!task.dueDate) return false;
    const dueDate = task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate.seconds * 1000);
    const today = new Date();

    return dueDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate ? new Date(task.dueDate.seconds * 1000) : null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTaskName(task.name);
    setEditedDueDate(task.dueDate ? new Date(task.dueDate.seconds * 1000) : null);
  };  

  const handleSaveClick = async () => {
    const updatedTask = { ...task, name: editedTaskName, dueDate: convertToTimestamp(editedDueDate) };
    await updateTaskInFirestore(task.id, { name: editedTaskName, dueDate: convertToTimestamp(editedDueDate) });
    updateTask(updatedTask);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const taskNameRef = useRef(null); // tooltip
  useEffect(() => {
    const taskNameElement = taskNameRef.current;
    if (taskNameElement) {
      const isTextOverflowing = taskNameElement.scrollWidth > taskNameElement.clientWidth;
      taskNameElement.title = isTextOverflowing ? task.name : '';
    }
  }, [task.name]);

  return (
    <div ref={drag} className={`task ${isDragging ? 'dragging' : ''} ${isDueDatePassedOrToday() ? 'task-overdue' : ''}`}>
      <div className="task-info">
        {isEditing ? (
          <>
            <input type="text" value={editedTaskName} onChange={(e) => setEditedTaskName(e.target.value)} style={{ marginRight: '2px' }} />
            <DatePicker
              selected={editedDueDate}
              onChange={(date) => setEditedDueDate(date)}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
            />
          </>
        ) : (
          <>
            <p ref={taskNameRef}>{task.name}</p>
            <p className={`due-date ${isDueDatePassedOrToday() ? 'overdue-date' : ''}`}>
              {task.dueDate ? `${formatDate(task.dueDate)}` : ''}
            </p>
          </>
        )}
        <div>
          {isEditing ? (
            <>
              <button style={{ marginRight: '2px' }} onClick={handleSaveClick}>Guardar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </>
          ) : (
            <>
              <button style={{ marginRight: '2px' }} onClick={handleEditClick}>Editar</button>
              <button onClick={() => onDelete(task)}>Completo</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
