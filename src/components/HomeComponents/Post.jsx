import React from 'react'

const Post = () => {
    return (
        <div className='h-full'>
            <div className='h-[full] py-[20px] border-b-[1px] border-gray-200 '>
                <div className='flex items-center justify-between px-[15px] pb-[10px]'>
                    <div className='flex items-center'>
                        <div className='w-[50px] h-[50px] '>
                            <img className='w-full h-full rounded-[50%]' src="https://zhaluzi-koloritel.ru/wp-content/uploads/2021/04/2021-04-22_17-36-51.png" alt="" />
                        </div>
                        <div className='pl-[20px]'>
                            <p className='text-[15px]'>name</p>
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <i className="fa-solid fa-ellipsis text-[18px]"></i>
                        </div>
                    </div>
                </div>
                <div className='w-[468px] h-[468px]'>
                    <img className='w-full h-full rounded-md' src="https://img3.akspic.ru/attachments/originals/4/3/3/2/22334-gorizont-spokojstvie-spokojnyj-utro-bereg-3840x2160.jpg" alt="" />
                </div>
                <div className='flex pt-[10px] justify-between px-[15px] items-center'>
                    <div className='flex justify-between items-center w-[100px]' >
                        <i className="fa-regular fa-heart text-[18px]"></i>
                        <i className="fa-regular fa-comment text-[18px]"></i>
                        <i className="fa-solid fa-share text-[18px]"></i>
                    </div>
                    <div>
                        <i className="fa-regular fa-bookmark text-[18px]"></i>
                    </div>
                </div>
                <div className='flex pt-[5px] justify-between w-[80px] px-[15px] items-center'>
                    <p className='text-[18px]'>0</p>
                    <p className='text-[15px]'>likes</p>
                </div>
                <div>
                    <div className='pt-[20px] px-[30px]'>
                        <div className='flex items-center'>
                            <div className='w-[32px] h-[32px]'>
                                <img className='w-full h-[full] rounded-[50%]' src="https://zhaluzi-koloritel.ru/wp-content/uploads/2021/04/2021-04-22_17-36-51.png" alt="" />
                            </div>
                            <div className='pl-[10px]'>
                                <p className='text-[15px]'>name</p>
                            </div>
                        </div>
                        <div className='pt-[5px] pl-[60px]'>
                            <p>comments</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[full] py-[20px]'>
                <div className='flex items-center justify-between px-[15px] pb-[10px]'>
                    <div className='flex items-center'>
                        <div className='w-[50px] h-[50px] '>
                            <img className='w-full h-full rounded-[50%]' src="https://zhaluzi-koloritel.ru/wp-content/uploads/2021/04/2021-04-22_17-36-51.png" alt="" />
                        </div>
                        <div className='pl-[20px]'>
                            <p className='text-[15px]'>name</p>
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <i className="fa-solid fa-ellipsis text-[18px]"></i>
                        </div>
                    </div>
                </div>
                <div className='w-[468px] h-[468px]'>
                    <img className='w-full h-full rounded-md' src="https://img3.akspic.ru/attachments/originals/4/3/3/2/22334-gorizont-spokojstvie-spokojnyj-utro-bereg-3840x2160.jpg" alt="" />
                </div>
                <div className='flex pt-[10px] justify-between px-[15px] items-center'>
                    <div className='flex justify-between items-center w-[100px]' >
                        <i className="fa-regular fa-heart text-[18px]"></i>
                        <i className="fa-regular fa-comment text-[18px]"></i>
                        <i className="fa-solid fa-share text-[18px]"></i>
                    </div>
                    <div>
                        <i className="fa-regular fa-bookmark text-[18px]"></i>
                    </div>
                </div>
                <div className='flex pt-[5px] justify-between w-[80px] px-[15px] items-center'>
                    <p className='text-[18px]'>0</p>
                    <p className='text-[15px]'>likes</p>
                </div>
                <div>
                    <div className='pt-[20px] px-[30px]'>
                        <div className='flex items-center'>
                            <div className='w-[32px] h-[32px]'>
                                <img className='w-full h-[full] rounded-[50%]' src="https://zhaluzi-koloritel.ru/wp-content/uploads/2021/04/2021-04-22_17-36-51.png" alt="" />
                            </div>
                            <div className='pl-[10px]'>
                                <p className='text-[15px]'>name</p>
                            </div>
                        </div>
                        <div className='pt-[5px] pl-[60px]'>
                            <p>comments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post