import React from 'react';
import MainText from './MainText';
import TasksCompletedIcon from '@/resorces/SVGs/tasksCompleted';
import TasksInProgressIcon from '@/resorces/SVGs/tasksInprogress';

function TaskItem({ task, onTaskClick }) {
  return (
    <li className={`p-2 cursor-pointer border-b border-gray-300 pb-4 mb-4 mt-1 ${task.isTaskCompleted ? "bg-lime-400 hover:bg-lime-500 " : "bg-cyan-300 hover:bg-cyan-400 "}rounded-lg drop-shadow-md min-w-30`} onClick={() => onTaskClick(task)}>
      <div className='flex justify-between border-b border-gray-900'>
  <MainText className={'w-1/3'}>{" "}</MainText>
  <MainText className={'w-1/3 text-center '}>{task.taskTitle}</MainText>
  <MainText className={'w-1/3 text-end '}>{task.taskDueDate}</MainText>
</div>
      <div className={'w-full overflow-hidden'}>
        <MainText htmlContent={task.taskDescription}></MainText>
      </div>
    </li>
  );
}

const TaskComponent = ({ IconComponent, title, tasksCount, userTasks, handleTaskClick, completedTasks }) => {
  return (
    <div className='w-1/2 bg-white rounded-lg self-start mr-5 p-4 shadow-lg min-w-40 mt-5 border border-gray-300'>
      <div className='items-center flex flex-row justify-between'>
        {completedTasks ? <TasksCompletedIcon /> : <TasksInProgressIcon />}
        <MainText color={"#8C97A8"}>{title}</MainText>
        <MainText color={tasksCount>0?"#000000":"#FFFFFF"} >{tasksCount}</MainText>
      </div>
     

      {/* Render tasks using a scrollable container */}
      {tasksCount > 0 ?
        <div className="h-60 overflow-y-auto">
          <ul>
            {userTasks.map(task => (
              <TaskItem key={task.id} task={task} onTaskClick={handleTaskClick} />
            ))}
          </ul>
        </div>
        : completedTasks ?
          <div className='flex h-60 text-center justify-center self-center' >
            <MainText className={"justify-center self-center"} >Enjoy the peace of do list!</MainText>
          </div>
          :
          <div className='flex h-60 text-center justify-center self-center' >
            <MainText className={"justify-center self-center"} >Enjoy the peace of an empty to-do list!</MainText>
          </div>

      }

    </div>
  );
};

export default TaskComponent;