'use client'
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import MainText from './MainText';
import { useState } from 'react';
import IconListTask from '@/resorces/SVGs/tasksIcon';
import IconAccountOutline from '@/resorces/SVGs/profileIcon';
import IconLogoutBoxLine from '@/resorces/SVGs/logoutIcon';

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isTaskClicked, setIsTaskClicked] = useState(false);
    const [isAccountClicked, setIsAccountClicked] = useState(false);


    const handleTaskClick = () => {
        setIsTaskClicked(true)

        router.push('/home/tasks');
    };

    const handleAccountClick = () => {
        setIsTaskClicked(true)
        localStorage.setItem('userData', JSON.stringify({ name: "", uid: '',isLoggedIn:false }));
        router.push('/');
    };


    //alert(pathname)

    return (
        <div className="sidebar bg-gray-200 w-90 p-4 fixed left-0 top-0 bottom-0 shadow-lg border border-gray-300">
            <ul className="justify-between list-none">
                <div className={`p-1 cursor-pointer flex flex-col items-center justify-center ${pathname === '/home/tasks' ? "bg-activeIcon" : 'bg-slate-300 '} rounded-lg shadow-lg border border-gray-300`} onClick={handleTaskClick}>
                    <IconListTask className={`w-10 h-10 ${pathname === '/home/tasks' ? 'text-white' : ''}`} />
                    <MainText >
                        <span style={{ cursor: 'pointer' }} className={pathname === '/home/tasks' ? 'text-white' : ''} onClick={handleTaskClick} >Tasks</span>
                    </MainText>
                </div>
                <div className={`p-1 cursor-pointer mt-4 flex flex-col items-center hover:bg-slate-500 hover:text-white justify-center ${pathname === '/home/account' ? "bg-activeIcon" : 'bg-slate-300 '} rounded-lg shadow-lg border border-gray-300`} onClick={handleAccountClick}>
                    <IconLogoutBoxLine className={`w-10 h-10 ${pathname === '/home/account' ? 'text-white' : ''}`}  />
                    <MainText className={"mt-2 "} >
                        <span style={{  cursor: 'pointer' }}className={pathname === '/home/account' ? 'text-white' : ''} onClick={() => router.push('/home/account')} >Logout</span>
                    </MainText>
                </div>



            </ul>
        </div>
    );
};

export default Sidebar;
