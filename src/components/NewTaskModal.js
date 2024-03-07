'use client'
import Editor from '@/components/Editor'
import MainInput from '@/components/MainInput'
import MainText from '@/components/MainText'
import IconClose from '@/resorces/SVGs/exitIcon'
import TasksCompletedIcon from '@/resorces/SVGs/tasksCompleted'
import TasksInProgressIcon from '@/resorces/SVGs/tasksInprogress'
import React, { useState, useRef, useEffect } from 'react'

function NewTaskModal({
  task,
  title,
  description,
  dueDate,
  setTitle,
  setDescription,
  setDueDate,
  onClose,
  onSave,
  handleEditorChange,
  titleErrorMessage,
  dueDateErrorMessage,
  descriptionError,
  fetchData,

}) {
  const [isChecked, setIsChecked] = useState(false); // Initialize based on task.completed if present
  const [isEditClicked, setIsEditClicked] = useState(false);
  // const [content, setContent] = useState('');

  const modalRef = useRef(null);




  const handleSave = async () => {
    // Implement logic to save the updated task (e.g., call an API)
    const result = await onSave(); // Close the modal after saving
    if (result) {
      setTitle("")
      setDueDate("")
      setDescription("")
    }

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
            <label className="block mt-1">
              <MainText>Title:</MainText>
            </label>
            <MainInput value={title} placeholder={"Ex: Homework"} onChange={setTitle} errorMessage={titleErrorMessage} ></MainInput>

          </div>
        </div>
        <div>
          <div>
            <label className="block mt-1">
              <MainText>Due Date:</MainText>
            </label>
            <div>
              <MainInput value={dueDate} placeholder={"M/D/YYYY"} onChange={setDueDate} errorMessage={dueDateErrorMessage} ></MainInput>
            </div>

          </div>

        </div>
        <div className="mt-10">
          <div >
            <label className="block mt-1">
              <MainText>Description:</MainText>
            </label>
            {/* <MainInput value={task.description}></MainInput> */}
            <Editor value={description} onChangeValue={setDescription} errorMessage={descriptionError} />

          </div>

        </div>






        {/* Save button */}
        <div className='flex flex-row item-center justify-center'>
          <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
            Save
          </button>

        </div>


      </div>
    </div>
  );
}
export default NewTaskModal;
