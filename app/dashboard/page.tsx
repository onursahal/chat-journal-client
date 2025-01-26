import { Calendar } from '@/components/ui/calendar'
import { Navbar } from '@/components/ui/navbar'
const Home = () => (
  <div className="bg-background h-screen w-screen flex flex-col px-10 items-center justify-center">
    <Navbar brandName="chat-journal" />
    <Calendar mode="single" showOutsideDays={false} />
  </div>
)

export default Home
