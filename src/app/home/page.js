'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'


function page() {
  const router = useRouter()

  useEffect(() => {
    router.push("/home/tasks")

    
  }, [])
  

  return (
   
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center">
      <p style={{ fontFamily: 'monospace' }} className="mb-3 text-2xl font-semibold">
        
      </p>

      
    </div>
  </main>
  )
}

export default page