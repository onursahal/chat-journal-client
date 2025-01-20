import { Calendar } from '@/components/ui/calendar'
import { Navbar } from '@/components/ui/navbar'
const Home = () => (
  <div className=" bg-background flex flex-col justify-center items-center h-screen">
    <Navbar brandName="chat-journal" />
    <Calendar mode="single" showOutsideDays={false} />
  </div>
)

export default Home
