'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 bg-card rounded-md', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row relative space-y-4  sm:space-y-0',
        month: 'space-y-4',
        month_caption: 'flex justify-center relative items-center h-20 mb-1 ',
        caption_label:
          'text-sm font-bold text-primary-foreground bg-primary py-8 px-12 rounded-md',
        nav: 'flex',
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex bg-primary rounded-md items-center h-12 gap-2',
        weekday:
          'text-muted-foreground rounded-md w-32 font-bold text-[0.8rem]',
        week: 'flex w-full mt-2 gap-2',
        day: cn(
          'relative p-0 h-32 w-32 text-center text-sm rounded-md [&:not([data-today]):not([data-selected])]:text-calendar-foreground [&:not([data-today]):not([data-selected])]:bg-calendar focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-32 w-32 p-0 aria-selected:opacity-100 font-bold'
        ),
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        selected: 'bg-calendar-green text-calendar-foreground',
        today: 'bg-calendar-yellow text-calendar-foreground',
        outside: 'day-outside',
        disabled: 'day-disabled',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible bg-transparent',
        ...classNames,
      }}
      components={{
        PreviousMonthButton: ({ className, ...props }) => (
          <Button
            className="absolute left-0 z-10 h-20 w-20 bg-primary p-0 hover:text-black hover:bg-white text-primary-foreground"
            {...props}
          >
            <ChevronLeft className={cn('h-10 w-10', className)} />
          </Button>
        ),
        NextMonthButton: ({ className, ...props }) => (
          <Button
            className="absolute right-0 z-10 h-20 w-20 bg-primary p-0 hover:text-black hover:bg-white text-primary-foreground"
            {...props}
          >
            <ChevronRight className={cn('h-10 w-10', className)} />
          </Button>
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
