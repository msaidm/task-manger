'use client'
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import MainText from './MainText';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

//alert(pathname)

  return (
    <div className="sidebar bg-gray-200 w-90 p-4 fixed left-0 top-0 bottom-0 shadow-lg border border-gray-300">
      <ul className="list-none">
      <MainText >
        <span style={{ cursor: 'pointer' }} onClick={()=>router.push('/home/tasks')} className={pathname === '/home/tasks' ? 'text-red-500' : ''}>Tasks</span>
      </MainText>
      <MainText >
        <span style={{ cursor: 'pointer' }} onClick={()=>router.push('/home/account' )} className={pathname === '/home/account'  ? 'text-red-500' : ''}>Account</span>
      </MainText>
    
        
      </ul>
    </div>
  );
};

export default Sidebar;
