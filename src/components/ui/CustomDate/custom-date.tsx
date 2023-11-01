import { Ref, RefObject, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import prev from '@/assets/prev.svg'
import next from '@/assets/next.svg'
import { subDays } from 'date-fns'
import DatePicker, { ReactDatePicker } from 'react-datepicker'

export const CustomDatePicker = ({selectedDate, setSelectedDate}: {selectedDate: Date, setSelectedDate: (date: Date) => void}) => {
  const [isOpen, setIsOpen] = useState(false)
  const datePickerRef: RefObject<ReactDatePicker<never, undefined>> = useRef(null)

  const DataPickerLabel = forwardRef(({ onClick }: { onClick: () => void }, ref: Ref<HTMLButtonElement>) => (
    <button className='custom-datepicker-input' id="reachDate" onClick={onClick} ref={ref}>
      <div className='flex flex-col py-0.5'>
        <span className='font-text font-semibold text-base' id="customDatePickerMonth">
          {selectedDate.toLocaleString('en-US', { month: 'long' })}
        </span>
        <span className='font-text font-nornal text-base text-gray400' id="customDatePickerYear">{selectedDate.getFullYear()}</span>
      </div>
    </button>
  ))

  const goBackOneMonth = useCallback(() => {
    const newDate = new Date(selectedDate)
    if (newDate <= new Date()) {
      return
    }
    newDate.setMonth(newDate.getMonth() - 1)
    setSelectedDate(newDate)
  }, [selectedDate, setSelectedDate])

  const goForwardOneMonth = useCallback(() => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setSelectedDate(newDate)
  }, [selectedDate, setSelectedDate])

  const handleKeyDown = useCallback((event: { keyCode: number }) => {
    if (event.keyCode === 37) {
      return goBackOneMonth()
    }
    if (event.keyCode === 39) {
      return goForwardOneMonth()
    }
    if(event.keyCode === 13 || event.keyCode === 32) {
      return datePickerRef.current?.setOpen(false)
    }
    return
  }, [goBackOneMonth, goForwardOneMonth])

  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isOpen])

  return (
    <div className='flex items-center h-100 text-center py-0.5'>
      <button className='px-5' onClick={goBackOneMonth}>
        <img src={prev} alt='Origin' />
      </button>
      <div className='mx-auto'>
        <DatePicker
          ref={datePickerRef}
          selected={new Date(selectedDate)}
          onChange={(date: Date) => setSelectedDate(date)}
          // dateFormat='MMMM yyyy'
          showMonthYearPicker
          shouldCloseOnSelect
          openToDate={new Date(selectedDate)}
          // withPortal
          minDate={subDays(new Date(), 0)}
          onCalendarOpen={() => setIsOpen(true)}
          onCalendarClose={() => setIsOpen(false)}
          customInput={
            <DataPickerLabel
              onClick={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
      </div>
      <button className='px-5' onClick={goForwardOneMonth}>
        <img src={next} alt='Origin' />
      </button>
    </div>
  )
}

export default CustomDatePicker
