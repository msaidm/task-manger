import Sidebar from "@/components/SideBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIEMENS TASK MANAGER",
  description: "Manage your tasks easily",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
        
      <body className={inter.className}>
        <Sidebar/>
        {children}
       
        
        
        </body>
    </html>
  );
}
