import Sidebar from "../../components/SideBar";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIEMENS TASK MANAGER",
  description: "Manage your tasks easily",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
        
      <body className={inter.className}>
      <main className="flex min-h-screen  p-10 bg-mainHomeBackgroundColor">
        
        <Sidebar/>
        <Suspense/>
        {children}
        </main>
        
        
       
        
        
        </body>
    </html>
  );
}
