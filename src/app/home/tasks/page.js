'use client'
import MainInput from '@/components/MainInput'
import MainText from '@/components/MainText'
import IconClose from '@/resorces/SVGs/exitIcon'
import TasksCompletedIcon from '@/resorces/SVGs/tasksCompleted'
import TasksInProgressIcon from '@/resorces/SVGs/tasksInprogress'
import React, { useState, useRef, useEffect } from 'react'

// ... other components

function Modal({ task, onClose, onUpdate, onDelete, onClickEdit }) {
  const [isChecked, setIsChecked] = useState(task.completed || false); // Initialize based on task.completed if present
  const [isEditClicked, setIsEditClicked] = useState(false);
  const modalRef = useRef(null);


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onUpdate({ ...task, completed: !isChecked }); // Update task with new completed state
  };

  const handleSave = () => {
    // Implement logic to save the updated task (e.g., call an API)
    onClose(); // Close the modal after saving
  };
  const handleEdit = () => {
    // Implement logic to save the updated task (e.g., call an API)
    setIsEditClicked(true) // Close the modal after saving
  };

  const handleDelete = () => {
    onDelete(task.id); // Delete the task by its id
    onClose(); // Close the modal after deletion
  };
  const handleCancel = () => {
    setIsEditClicked(false)
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white  w-1/4 rounded-lg p-4 shadow-md ">
        <IconClose width='20px' height='20px' onClick={onClose} className={"cursor-pointer flex-end"} />
        <div className='flex flex-row justify-between items-center'>
          <div>
            {isEditClicked ? (
              <div>
                <label className="block mt-1">
                  <MainText>Title:</MainText>
                </label>
                <MainInput value={task.title}></MainInput>

              </div>
            ) : (
              <div>
                <label className="block mt-1">
                  <MainText>Title:</MainText>
                </label>
                <MainText color={"#8C97A8"}>{task.title}</MainText>

              </div>
            )}
          </div>


          {!isEditClicked && (
            <button onClick={handleEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit</button>
          )}

        </div>
        <div>
          {isEditClicked ? (
            <div>
              <label className="block mt-1">
                <MainText>Due Date:</MainText>
              </label>
              <div>
                <MainInput width={"w-2"} value={task.dueDate}></MainInput>
              </div>

            </div>
          ) : (
            <div>
              <label className="block mt-1">
                <MainText>Due Date:</MainText>
              </label>
              <MainText color={"#8C97A8"}>{task.dueDate}</MainText>

            </div>
          )}
        </div>
        <div>
          {isEditClicked ? (
            <div>
              <label className="block mt-1">
                <MainText>Description:</MainText>
              </label>
              <MainInput value={task.description}></MainInput>

            </div>
          ) : (
            <div>
              <label className="block mt-1">
                <MainText>Description:</MainText>
              </label>
              <MainText color={"#8C97A8"}>{task.description}</MainText>

            </div>
          )}
        </div>




        {/* Completed checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="completed-checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="completed-checkbox" className="ml-2">
            Mark as Completed
          </label>
        </div>

        {/* Save button */}
        <div className='flex flex-row item-center justify-center'>
          <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
            Save
          </button>
          {!isEditClicked && (
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
              Delete
            </button>
          )}

          {isEditClicked && (
            <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          )}

        </div>
        {/* <div className='flex flex-row item-center justify-center mt-2'>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
            Delete
          </button>
        </div> */}

      </div>
    </div>
  );
}

function TaskItem({ task, onTaskClick }) {
  return (
    <li className="cursor-pointer border-b border-gray-300 pb-4 mb-4 mt-1" onClick={() => onTaskClick(task)}>
      <MainText>{task.title}</MainText>
      <MainText>{task.description}</MainText>
    </li>
  );
}



function page() {
  // Dummy data for tasks
  const [selectedTask, setSelectedTask] = useState();


  const tasks = [
    { id: '1', title: 'Task 1', description: 'Description of Task 1', dueDate: '1/1/2024', dueClock: "2:09 PM" },
    { id: '2', title: 'Task 2', description: 'Description of Task 2', dueDate: '1/2/2024', dueClock: "2:09 PM" },
    // Add more tasks as needed
  ];


  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handleEditClick = (task) => {
    setOnEditIsClicked(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='w-1/2  flex  flex-col sm:flex-row'>
        <div className='w-1/2 bg-white rounded-lg self-start mr-5 p-4 shadow-lg min-w-40 mt-5 border border-gray-300'>
          <div className='items-center flex flex-row justify-between'>
            <TasksCompletedIcon />
            <MainText color={"#8C97A8"}>Tasks Completed</MainText>
            <MainText>90</MainText>
          </div>
          <div className="h-px grayText mt-2 bg-grayText"></div>

          {/* Render tasks using a scrollable container */}
          <div className="h-60 overflow-y-auto">
            <ul>
              {tasks.map(task => (
                <TaskItem key={task.id} task={task} onTaskClick={handleTaskClick} />
              ))}
            </ul>
          </div>
        </div>
        <div className='w-1/2 bg-white rounded-lg self-start mr-5 p-4 shadow-lg min-w-40 mt-5 border border-gray-300'>
          <div className='items-center flex flex-row justify-between'>
            <TasksInProgressIcon />
            <MainText color={"#8C97A8"}>Tasks In Progress</MainText>
            <MainText>90</MainText>
          </div>
          <div className="h-px grayText mt-2 bg-grayText"></div>

          {/* Render tasks using a scrollable container */}
          <div className="h-60 overflow-y-auto">
            <ul>
              {tasks.map(task => (
                <TaskItem key={task.id} task={task} onTaskClick={handleTaskClick} />
              ))}
            </ul>
          </div>
        </div>

        {/* Modal */}
        {selectedTask && (
          <Modal task={selectedTask} onClose={handleCloseModal} onClickEdit={handleEditClick} />
        )}
      </div>

    </div>
  );
}

export default page;
