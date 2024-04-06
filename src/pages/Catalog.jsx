import React from 'react'
import { Link } from 'react-router-dom'
const Catalog = () => {
    return (
        <header className='flex flex-col justify-evenly items h-[80vh] pl-[20px] ' >
            <div className='w-[150px] pt-[60px] flex justify-center items-center'>
                <Link>
                    <img className='w-full mx-auto' src="https://i.pinimg.com/originals/3b/08/56/3b0856a4d028524247382d5c936a3964.png" alt="" />
                </Link>
            </div>
            <div className='h-[70%]'>
                <ul className='flex flex-col justify-between h-full'>
                    <li className='text-[21px] hover:bg-gray-200 px-[25px] py-[8px] transition-all rounded-xl'><Link><i className="fa-solid pr-[10px] fa-house"></i> Home</Link></li>
                    <li className='text-[21px] hover:bg-gray-200 px-[25px] py-[8px] transition-all rounded-xl'><Link><i className="fa-solid pr-[10px] fa-magnifying-glass"></i> Search</Link></li>
                    {/* <li className='text-[21px]'><Link>Explore</Link></li> */}
                    {/* <li className='text-[21px]'><Link>Reels</Link></li> */}
                    <li className='text-[21px] hover:bg-gray-200 px-[25px] py-[8px] transition-all rounded-xl'><Link><i className="fa-solid pr-[10px] fa-envelope"></i> Messages</Link></li>
                    {/* <li className='text-[21px]'><Link>Notifications</Link></li> */}
                    <li className='text-[21px] hover:bg-gray-200 px-[25px] py-[8px] transition-all rounded-xl'><Link><i className="fa-solid pr-[10px] fa-square-plus"></i> Create</Link></li>
                    <li className='text-[21px] hover:bg-gray-200 px-[25px] py-[8px] transition-all rounded-xl'><Link><i className="fa-solid pr-[10px] fa-user"></i> Profile</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Catalog