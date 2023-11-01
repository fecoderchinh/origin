import logo from '@/assets/logoOrigin.png'

export const Navbar = () => {
  return (
    <div className='w-full bg-white py-6'>
      <div className='container'>
        <nav className='bg-white'>
          <a href='/' className='flex'>
            <img src={logo} alt='Origin' />
          </a>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
