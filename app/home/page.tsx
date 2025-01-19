'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'

const Home = () => {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <div className=" bg-gray-800 flex justify-center items-center h-screen">
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
