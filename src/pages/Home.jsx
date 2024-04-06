import React from 'react'
import Post from '../components/HomeComponents/Post'
import Profile from '../components/HomeComponents/Profile'

const Home = () => {
    return (
        <section className='mx-auto containerb w-full h-[full]'>
            <div className='flex justify-between w-full'>
                <div className='flex justify-center items-center w-full h-[100vh]'>
                    <Post />
                </div>
                <div>
                    <Profile />
                </div>
            </div>
        </section>
    )
}

export default Home