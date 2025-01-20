'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Navbar } from '@/components/ui/navbar'
const Home = () => {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <div className=" bg-gray-800 flex flex-col justify-center items-center h-screen">
      <Navbar brandName="chat-journal" />
      <Calendar
        mode="single"
        selected={date}
        showOutsideDays={false}
        onSelect={setDate}
      />
    </div>
  )
}

export default Home
