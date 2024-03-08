'use client'
import { env } from '../../../Helpers/constans'
import { generateUniqueId, isValidDateFormat, useSeparateTasks } from '../../../Helpers/tools'

import NewTaskModal from '../../../components/NewTaskModal'
import TaskModal from '../../../components/TaskModal'
import addData from '../../../firebase/firestore/addData'
import deleteTask from '../../../firebase/firestore/deleteTask'
import getTasksForUser from '../../../firebase/firestore/getTasks'
import TasksCompletedIcon from '../../../resources/SVGs/tasksCompleted'
import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


import { useAppSelector, useAppDispatch, useAppStore } from '../../../../lib/hooks'
import { useRouter } from 'next/navigation'
import MainText from '../../../components/MainText'



const TaskLazyComponent = React.lazy(() => import("../../../components/TaskComponent"));

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

  const [newTaskEditTitle, setNewTaskEditTitle] = useState("");
  const [newTaskTitleEditError, setNewTaskTitleEditError] = useState("");

  const [newTaskEditDueDate, setNewTaskEditDueDate] = useState("");
  const [newTaskDueDateEditError, setNewTaskEditDueDateError] = useState("");


  const [newTaskEditDescription, setNewTaskEditDescription] = useState("");
  const [newTaskDescriptionEditError, setNewDescriptionEditError] = useState("");

  const [isTaskCompleted, setIsTaskCompleted] = useState("");


  const [userTasks, setUserTasks] = useState([]);
  const [userInfo, setUserInfo] = useState({});


  const router = useRouter();

  const [userInProgressTasks, setUserInProgressTasks] = useState([]);

  const [startDate, setStartDate] = useState(new Date());


  // Initialize the store with the product information
  const store = useAppStore()
  const initialized = useRef(false)
  // if (!initialized.current) {
  //   store.dispatch(l(product))
  //   initialized.current = true
  // }
  const userInfoRedux = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch()







  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    if (userData) {
      if (!userData.isLoggedIn) {
        return router.push('/')
      }
    }

    setUserInfo(userData)
    fetchData(userData.uid)
  }, []);

  const fetchData = async (uid) => {
    try {
      const { tasks, error } = await getTasksForUser(uid);

      if (error) {
        setError(error.message);
        alert(error);
      } else {

        const { completedTasks, incompleteTasks } = separateTasks(tasks)
        setUserTasks(completedTasks);
        setUserInProgressTasks(incompleteTasks)
        //alert(tasks)
      }
    } catch (error) {
      alert(error)
      //setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  function separateTasks(tasks) {
    const completedTasks = [];
    const incompleteTasks = [];

    tasks.forEach(task => {
      if (task.isTaskCompleted) {
        completedTasks.push(task);
      } else {
        incompleteTasks.push(task);
      }
    });

    return { completedTasks, incompleteTasks };
  }



  // Update the state accordingly








  const handleNewTaskTitleChange = (event) => {
    if (event) {
      setNewTaskTitleError("")
      setNewTaskTitle(event.target.value);
    }
    else {
      setNewTaskTitle("");
    }

  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(`Tasks--${env}`, taskId)
      setSelectedTask(undefined)
      fetchData(userInfo.uid)
    } catch (error) {

    }

  };
  const handleNewTaskDueDateChange = (event) => {
    if (event) {
      //setStartDate(date)
      setNewTaskDueDateError("")
      setNewTaskDueDate(event.target.value);

    }
    else {
      setNewTaskDueDate('');
    }


  };


  const handleNewTaskEditDescriptionsChange = (newContent) => {
    setNewDescriptionEditError('')

    setNewTaskEditDescription(newContent);
  };

  const handleNewTaskEditTitleChange = (event) => {
    if (event) {
      setNewTaskTitleEditError("")
      setNewTaskEditTitle(event.target.value);
    }
    else {
      setNewTaskEditTitle("");
    }

  };
  const handleNewTaskEditDueDateChange = (event) => {
    if (event) {
      setNewTaskEditDueDateError("")
      setNewTaskEditDueDate(event.target.value);
    }
    else {
      setNewTaskEditDueDate('');
    }

  };

  const handleChangeIsCompleted = () => {
    setIsTaskCompleted(prev => !prev)

  };

  const handleAddNewTaskEditSaveButton = async () => {
    const taskId = generateUniqueId()
    if (newTaskEditTitle === "" && newTaskEditDescription === "" && newTaskEditDueDate === "") {
      setNewTaskTitleError("Please enter the title")
      setNewDescriptionError("Please enter the task description")
      setNewTaskDueDateError("Please enter the due date")
      return;
    }
    else if (newTaskEditTitle === "") {
      setNewTaskTitleError("Please enter the title")
      return;
    }
    else if (newTaskEditDueDate === "") {
      setNewTaskDueDateError("Please enter the due date")
      return;
    }
    else if (newTaskEditDescription === "") {
      setNewDescriptionError("Please enter the task description")
      return;
    }
    else if (!isValidDateFormat(newTaskEditDueDate)) {
      setNewTaskDueDateError("Please enter the due date in this format M/D/YYYY")
      return;

    }
    try {
      let taskData = {
        taskTitle: newTaskTitle,
        taskDueDate: newTaskDueDate,
        taskDescription: newTaskDescription,
        userUid: userInfo.uid,
        taskId: taskId,
        isTaskCompleted: false,
      }
      await addData(`Tasks--${env}`, taskId, taskData)
      setShowNewTaskModal(false)
      return true

    } catch (error) {
      alert(error)
      return false
    }

  };
  {/*---------END Edit Task Functions--------------- */ }
  const handleNewTaskDescriptionsChange = (newContent) => {
    setNewDescriptionError('')

    setNewTaskDescription(newContent);
  };
  const handleAddNewTaskSaveButton = async () => {
    const taskId = generateUniqueId()
    if (newTaskTitle.trim() === "" && newTaskDescription.trim() === "" && newTaskDueDate === "") {
      setNewTaskTitleError("Please enter the title")
      setNewDescriptionError("Please enter the task description")
      setNewTaskDueDateError("Please enter the due date")
      return;
    }
    else if (newTaskTitle.trim() === "") {
      setNewTaskTitleError("Please enter the title")
      return;
    }
    else if (newTaskDueDate === "") {
      setNewTaskDueDateError("Please enter the due date")
      return;
    }
    else if (newTaskDescription.trim() === "") {
      setNewDescriptionError("Please enter the task description")
      return;
    }
    else if (!isValidDateFormat(newTaskDueDate.trim())) {
      setNewTaskDueDateError("Please enter the due date in this format M/D/YYYY")
      return;

    }

    try {

      let taskData = {
        taskTitle: newTaskTitle.trim(),
        taskDueDate: startDate.getDate(),
        taskDescription: newTaskDescription.trim(),
        userUid: userInfo.uid,
        taskId: taskId,
        isTaskCompleted: false,
      }
      await addData(`Tasks--${env}`, taskId, taskData)
      fetchData(userInfo.uid)
      setShowNewTaskModal(false)
      return true

    } catch (error) {
      alert(error)
      return false
    }




  };

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
    <div className='w-full flex flex-col items-center'>
      <div className='h-10 mb-10 sm:mb-5 sm:ml-100'>
        <MainText className='' fontSize="2em">
          {`Welcome, ${userInfo.name ? userInfo.name : ""}`}
        </MainText>
      </div>
      <div className='w-1/2  flex self-center justify-center flex-col sm:flex-row'>

        <Suspense fallback={<Skeleton />} >
          <TaskLazyComponent
            IconComponent={TasksCompletedIcon}
            title="To-Do List"
            tasksCount={userInProgressTasks.length}
            userTasks={userInProgressTasks}
            handleTaskClick={handleTaskClick}
            completedTasks={false}
          />

          {userTasks.length > 0 && (
            <TaskLazyComponent
              IconComponent={TasksCompletedIcon}
              title="Tasks Completed"
              tasksCount={userTasks.length}
              userTasks={userTasks}
              handleTaskClick={handleTaskClick}
              completedTasks={true}
            />

          )}


        </Suspense>


        {/* Modal */}
        {selectedTask && (
          <TaskModal
            onClose={handleCloseModal}
            onClickEdit={handleEditClick}
            title={newTaskEditTitle}
            setTitle={handleNewTaskEditTitleChange}
            titleErrorMessage={newTaskTitleEditError}
            dueDate={newTaskEditDueDate}
            setDueDate={handleNewTaskEditDueDateChange}
            dueDateErrorMessage={newTaskDueDateEditError}
            description={newTaskEditDescription}
            setDescription={handleNewTaskEditDescriptionsChange}
            descriptionError={newTaskDescriptionEditError}
            task={selectedTask}
            onSave={handleAddNewTaskEditSaveButton}
            fetchData={fetchData}
            handleDeleteTask={handleDeleteTask}
            userUid={userInfo.uid}

          />
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
            descriptionError={newTaskDescriptionError}
            task={selectedTask}
            onClose={handleCloseNewTaskModal}
            handleEditorChange={handleEditClick}
            onSave={handleAddNewTaskSaveButton}
          />
        )}



      </div>
      <button onClick={handleNewTaskClick} className=" flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10  self-center min-w-90">
        Add a new Task
      </button>

    </div>
  );
}

export default page;
