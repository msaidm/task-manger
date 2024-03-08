'use client'
import { env } from '../Helpers/constans'
import { generateUniqueId, isValidDateFormat } from '../Helpers/tools'
import Editor from '../components/Editor'
import MainInput from '../components/MainInput'
import MainText from '../components/MainText'
import updateData from '../firebase/firestore/updateData'
import IconClose from '../resources/SVGs/exitIcon'

import React, { useState, useRef, useEffect } from 'react'

function TaskModal({
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
  handleDeleteTask,
  userUid

}) {
  const [isChecked, setIsChecked] = useState(false); // Initialize based on task.completed if present
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [content, setContent] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState(task.taskTitle);
  const [newTaskDueDate, setNewTaskDueDate] = useState(task.taskDueDate);
  const [newTaskDescription, setNewTaskDescription] = useState(task.taskDescription);

  const [newTaskTitleEditError, setNewTaskTitleEditError] = useState("");

  const [newTaskDueDateEditError, setNewTaskEditDueDateError] = useState("");


  const [newTaskDescriptionEditError, setNewDescriptionEditError] = useState("");

  const [isTaskCompleted, setIsTaskCompleted] = useState(task.isTaskCompleted);



  const modalRef = useRef(null);

  const handleEditTaskTitle = (event) => {
    if (event) {
      setNewTaskTitleEditError("")
      setNewTaskTitle(event.target.value);
    }
    else {
      setNewTaskTitle("");
    }

  };
  const handleEditTaskDueDate = (event) => {
    if (event) {
      setNewTaskEditDueDateError("")
      setNewTaskDueDate(event.target.value);
    }
    else {
      setNewTaskTitle("");
    }

  };

  const handleNewTaskEditDescriptionsChange = (newContent) => {
    setNewDescriptionEditError('')
    if (newContent === "<p><br></p>")
      setNewTaskDescription("")
    else
      setNewTaskDescription(newContent);
  };




  const handleCheckboxChange = () => {
    setIsTaskCompleted(prev => !prev);
    //onUpdate({ ...task, completed: !isChecked }); // Update task with new completed state
  };
  //   const handleEditorChange = (newContent) => {

  //     setContent(newContent);
  // };

  const handleSave = () => {
    // Implement logic to save the updated task (e.g., call an API)
    onClose(); // Close the modal after saving
  };
  const handleEdit = () => {
    // Implement logic to save the updated task (e.g., call an API)
    setIsEditClicked(true) // Close the modal after saving
  };

  const handleDelete = () => {
    handleDeleteTask(task.id); // Delete the task by its id

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

  const handleAddNewTaskEditSaveButton = async () => {

    console.log(newTaskDescription, "s")
    if (newTaskDescription === "" && newTaskDueDate === "" && newTaskTitle === "") {
      setNewTaskTitleEditError("Please enter the title")
      setNewDescriptionEditError("Please enter the task description")
      setNewTaskEditDueDateError("Please enter the due date")
      return;
    }
    else if (newTaskTitle === "") {
      setNewTaskTitleEditError("Please enter the title")
      return;
    }
    else if (newTaskDueDate === "") {
      setNewTaskEditDueDateError("Please enter the due date")
      return;
    }
    else if (newTaskDescription === "") {
      setNewDescriptionEditError("Please enter the task description")
      return;
    }
    else if (!isValidDateFormat(newTaskDueDate)) {
      setNewTaskEditDueDateError("Please enter the due date in this format M/D/YYYY")
      return;

    }
    try {
      let taskData = {
        taskTitle: newTaskTitle,
        taskDueDate: newTaskDueDate,
        taskDescription: newTaskDescription,
        userUid: userUid,
        taskId: task.taskId,
        isTaskCompleted: isTaskCompleted,
      }
      await updateData(`Tasks--${env}`, task.taskId, taskData)
      fetchData(userUid)
      onClose()
      return true

    } catch (error) {
      alert(error)
      return false
    }

  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white w-1/4 rounded-lg p-4 shadow-md min-w-60 ">
        <IconClose width='20px' height='20px' onClick={onClose} className={"cursor-pointer flex-end"} />
        <div className='flex flex-row justify-between items-center'>
          <div>
            {isEditClicked ? (
              <div>
                <label className="block mt-1">
                  <MainText>Title:</MainText>
                </label>
                <MainInput value={newTaskTitle} placeholder={"Ex: Homework"} onChange={handleEditTaskTitle} errorMessage={newTaskTitleEditError}></MainInput>

              </div>
            ) : (
              <div>
                <label className="block mt-1">
                  <MainText>Title:</MainText>
                </label>
                <MainText color={"#8C97A8"}>{newTaskTitle}</MainText>

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
                <MainInput value={newTaskDueDate} onChange={handleEditTaskDueDate} errorMessage={newTaskDueDateEditError}></MainInput>
              </div>

            </div>
          ) : (
            <div>
              <label className="block mt-1">
                <MainText>Due Date:</MainText>
              </label>
              <MainText color={"#8C97A8"}>{task.taskDueDate}</MainText>

            </div>
          )}
        </div>
        <div>
          {isEditClicked ? (
            <div className="mt-10">
              <label className="block mt-1">
                <MainText>Description:</MainText>
              </label>
              {/* <MainInput value={task.description}></MainInput> */}
              <Editor value={newTaskDescription} onChangeValue={handleNewTaskEditDescriptionsChange} errorMessage={newTaskDescriptionEditError} />

            </div>
          ) : (
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <label className="block mt-1">
                <MainText>Description:</MainText>
              </label>
              <MainText color={"#8C97A8"} htmlContent={task.taskDescription}></MainText>
            </div>
          )}
        </div>




        {/* Completed checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="completed-checkbox"
            checked={isTaskCompleted}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="completed-checkbox" className="ml-2">
            Mark as Completed
          </label>
        </div>

        {/* Save button */}
        <div className='flex flex-row item-center justify-center'>
          <button onClick={handleAddNewTaskEditSaveButton} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
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
