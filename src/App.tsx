import icon from '@/assets/Icon.png'
import dollar from '@/assets/dollar.svg'
import 'react-datepicker/dist/react-datepicker.css'
import loadable from '@loadable/component'
import { useCallback, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'

const CustomDatePicker = loadable(() => import('@/components/ui/CustomDate/custom-date'))
const Navbar = loadable(() => import('@/components/Navbar/navbar'))
const InputNumber = loadable(() => import('@/components/ui/InputNumber/input-number'))
const Modal = loadable(() => import('@/components/Modal/modal'))

function App() {

  const [amount, setAmount] = useState(25000)
  const [unFormattedAmount, setUnFormattedAmount] = useState('25000')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalMonths, setTotalMonths] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const monthDiff = (date1: Date, date2: Date) => {
    let months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
  }

  const formatTotalAmount = (value: string) => new Intl.NumberFormat('en-US').format(
    parseFloat(value),
  )
  const formatDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const handleOpenModal = useCallback(() => {
    setOpenModal(true)
  }, [])

  useEffect(() => {
    const _selectedDate = new Date(selectedDate)
    const currentDate = new Date()
    const totalMonth = monthDiff(currentDate, _selectedDate)
    const _months = totalMonth > 0 ? totalMonth : 1;
    setTotalMonths(_months)
  
    setTotalAmount(amount/_months)
  }, [amount, selectedDate])

  return (
    <main className='mx-auto'>
      <Navbar />
      <div className='w-full flex flex-col py-12'>
        <div className='md:container text-center'>
          <div className='custom-box flex flex-col gap-6 mx-auto'>
            <h3 className='font-text text-xl text-primary font-normal'>
              Let's plan your <strong className='font-semibold'>saving goal.</strong>
            </h3>
            <div className='w-full bg-white box-shadow py-8 md:px-10 px-6 rounded-lg'>
              <div className='flex w-full flex-col gap-6'>
                <div className='flex flex-row gap-4'>
                  <img src={icon} alt='Origin' />
                  <div className='w-auto flex flex-col gap-1 text-start'>
                    <h2 className='font-price text-2xl font-medium text-gray900'>Buy a house</h2>
                    <h3 className='font-text text-base font-normal text-gray400'>Saving goal</h3>
                  </div>
                </div>

                <div className='w-full grid md:grid-cols-2 gap-4 auto-rows-fr'>
                  <div className='w-auto flex flex-col gap-1 text-start'>
                    <span>Total amount</span>
                    <div className='w-full relative py-3.5 demo-border rounded flex flex-row'>
                      <img src={dollar} alt='Origin' className='absolute top-4 start-3' />
                      <NumericFormat 
                        value={unFormattedAmount}
                        onChange={(e) => setUnFormattedAmount(e.target.value)}
                        onValueChange={(values) => {
                          const { value } = values
                          setAmount(value as unknown as number)
                        }}
                        customInput={InputNumber}
                        allowNegative={false}
                        decimalSeparator={"."}
                        thousandSeparator={","}
                        decimalScale={2}
                        fixedDecimalScale={true}
                      />
                    </div>
                  </div>

                  <div className='w-auto flex flex-col gap-1 text-start'>
                    <span>Reach goal by</span>
                    <div className='w-full relative demo-border rounded'>
                      <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </div>
                  </div>
                </div>

                <div className='w-full flex flex-col total-price'>
                  <div className='w-full flex flex-row p-8 items-center'>
                    <div className='inline-flex me-auto'>
                      <span className='font-text text-xl'>Monthly amount</span>
                    </div>
                    <strong className='font-price text-3xl text-secondary'>${formatTotalAmount(totalAmount.toFixed(2))}</strong>
                  </div>
                  <div className='w-full px-8 py-6 text-start bg-bluegray10 text-xs font-text'>
                    You’re planning <strong>{totalMonths} monthly deposits</strong> to reach your <strong>${formatTotalAmount(amount.toString())}</strong> goal by {' '}
                    <strong>{formatDate.format(selectedDate)}</strong>.
                  </div>
                </div>

                <div className='w-full'>
                  <button className='py-4 px-32 bg-primary text-white block mx-auto font-text text-base font-semibold rounded-4xl' onClick={handleOpenModal}>
                    Confirm
                  </button>
                  <Modal 
                    open={openModal} onClose={setOpenModal}
                    title={`Monthly amount: $ ${formatTotalAmount(totalAmount.toFixed(2))}`}
                    desc={`You’re planning ${totalMonths} monthly deposits to reach your $${formatTotalAmount(amount.toString())} goal by ${formatDate.format(selectedDate)}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
