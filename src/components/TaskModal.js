'use client'
import Editor from '@/components/Editor'
import MainInput from '@/components/MainInput'
import MainText from '@/components/MainText'
import IconClose from '@/resorces/SVGs/exitIcon'
import TasksCompletedIcon from '@/resorces/SVGs/tasksCompleted'
import TasksInProgressIcon from '@/resorces/SVGs/tasksInprogress'
import React, { useState, useRef, useEffect } from 'react'

function TaskModal({ task, onClose, onUpdate, onDelete, onClickEdit }) {
    const [isChecked, setIsChecked] = useState(false); // Initialize based on task.completed if present
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [content, setContent] = useState('');
  
    const modalRef = useRef(null);

    
  
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      onUpdate({ ...task, completed: !isChecked }); // Update task with new completed state
    };
    const handleEditorChange = (newContent) => {
      
      setContent(newContent);
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
        <div ref={modalRef} className="bg-white  w-1/4 rounded-lg p-4 shadow-md min-w-60">
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
                {/* <MainInput value={task.description}></MainInput> */}
                <Editor value={content} onChangeValue={handleEditorChange}/>
  
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
  export default TaskModal;
