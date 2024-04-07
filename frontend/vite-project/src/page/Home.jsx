import React from 'react'
import { Outlet } from "react-router-dom"
import Category from '../components/Category'
import UserProfile from '../components/UserProfile'
const Home = () => {
    return (
        <section className='container mx-auto'>
            <div className='px-[30px]'>
                <div className='flex  '>
                    <div className='w-[20%] '>
                        <Category />
                    </div>
                    <div className='w-[55%] flex justify-center'>
                        <Outlet />
                    </div>
                    <div className='mx-auto w-[25%]'>
                        <UserProfile />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home