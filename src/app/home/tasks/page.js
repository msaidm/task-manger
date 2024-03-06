'use client'
import { generateUniqueId } from '@/Helpers/tools'
import Editor from '@/components/Editor'
import MainInput from '@/components/MainInput'
import MainText from '@/components/MainText'
import NewTaskModal from '@/components/NewTaskModal'
import TaskModal from '@/components/TaskModal'
import addData from '@/firebase/firestore/addData'
import IconClose from '@/resorces/SVGs/exitIcon'
import TasksCompletedIcon from '@/resorces/SVGs/tasksCompleted'
import TasksInProgressIcon from '@/resorces/SVGs/tasksInprogress'
import React, { useState, useRef, useEffect } from 'react'

// ... other components



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
  const [selectedTask, setSelectedTask] = useState("");
  const [addNewTaskClicked, setAddNewTaskClicked] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTitleError, setNewTaskTitleError] = useState("");

  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskDueDateError, setNewTaskDueDateError] = useState("");


  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDescriptionError, setNewDescriptionError] = useState("");



  const handleNewTaskTitleChange = (event) => {
    setNewTaskTitleError("")
    setNewTaskTitle(event.target.value);
    console.log(event.target.value)

  };
  const handleNewTaskDueDateChange = (event) => {
    setNewTaskDueDateError("")
    setNewTaskDueDate(event.target.value);
    console.log(event.target.value)

  };
  const handleNewTaskDescriptionsChange = (newContent) => {

    setNewTaskDescription(newContent);
  };
  const handleAddNewTaskSaveButton = async () => {
    const taskId = generateUniqueId()
    try {
      let taskData = {
        taskTitle: newTaskTitle,
        taskDueDate: newTaskDueDate,
        taskDescription: newTaskDescription,
        userUid: "NjGIPGyZwHZ7WSvNHoyiJ4RLRRl1",
        taskId: taskId
      }
      await addData(`Tasks--`, taskId, taskData)

    } catch (error) {
      alert(error)
    }




  };







  const tasks = [
    { id: '1', title: 'Task 1', description: 'Description of Task 1', dueDate: '1/1/2024', dueClock: "2:09 PM" },
    { id: '2', title: 'Task 2', description: 'Description of Task 2', dueDate: '1/2/2024', dueClock: "2:09 PM" },
    { id: '3', title: 'Task 2', description: 'Description of Task 2', dueDate: '1/2/2024', dueClock: "2:09 PM" },
    { id: '4', title: 'Task 2', description: 'Description of Task 2', dueDate: '1/2/2024', dueClock: "2:09 PM" },
    { id: '5', title: 'Task 2', description: 'Description of Task 2', dueDate: '1/2/2024', dueClock: "2:09 PM" },
    // Add more tasks as needed
  ];


  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handleNewTaskClick = (task) => {
    //setAddNewTaskClicked(task);
    setShowNewTaskModal(true)
  };
  const handleEditClick = (task) => {
    setOnEditIsClicked(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };
  const handleCloseNewTaskModal = () => {
    setShowNewTaskModal(false);
  };

  return (
    <div className='w-full flex flex-col item-center'>
      <div className='w-1/2  flex self-center flex-col sm:flex-row'>

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


        {/* Modal */}
        {selectedTask && (
          <TaskModal task={selectedTask} onClose={handleCloseModal} onClickEdit={handleEditClick} />
        )}
        {showNewTaskModal && (
          <NewTaskModal
            title={newTaskTitle}
            setTitle={handleNewTaskTitleChange}
            titleErrorMessage={newTaskTitleError}
            dueDate={newTaskDueDate}
            setDueDate={handleNewTaskDueDateChange}
            dueDateErrorMessage={newTaskDueDateError}
            description={newTaskDescription}
            setDescription={handleNewTaskDescriptionsChange}
            task={selectedTask}
            onClose={handleCloseNewTaskModal}
            onClickEdit={handleEditClick}
            onSave={handleAddNewTaskSaveButton}
          />
        )}



      </div>
      <button onClick={handleNewTaskClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10 w-1/5 self-center">
        Add new Task
      </button>

    </div>
  );
}

export default page;
