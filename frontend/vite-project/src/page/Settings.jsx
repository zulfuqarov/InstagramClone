import React, { useState } from "react";
import { TECollapse } from "tw-elements-react";

const Settings = () => {
    const [activeElement, setActiveElement] = useState("");

    const handleClick = (value) => {
        if (value === activeElement) {
            setActiveElement("");
        } else {
            setActiveElement(value);
        }
    };
    return (
        <section className="w-full h-[100vh] flex flex-col justify-center">
            <div id="accordionExample">
                <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                        <button
                            className={`${activeElement === "element1" &&
                                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                                } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                            type="button"
                            onClick={() => handleClick("element1")}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Delete Profile
                            <span
                                className={`${activeElement === "element1"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#212529]  dark:fill-white`
                                    } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </span>
                        </button>
                    </h2>
                    <TECollapse
                        show={activeElement === "element1"}
                        className="!mt-0 !rounded-b-none !shadow-none"
                    >
                        <div className="px-5 py-4">
                            <button
                                type="button"
                                className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] "
                            >
                                Delete Profile
                            </button>
                        </div>
                    </TECollapse>
                </div>
            </div>
            <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="mb-0" id="headingTwo">
                    <button
                        className={`${activeElement === "element2"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element2")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        Change  Email  and Password
                        <span
                            className={`${activeElement === "element2"
                                ? `rotate-[-180deg] -mr-1`
                                : `rotate-0 fill-[#212529] dark:fill-white`
                                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </span>
                    </button>
                </h2>
                <TECollapse
                    show={activeElement === "element2"}
                    className="!mt-0 !rounded-b-none !shadow-none"
                >
                    <div className="px-5 py-4">
                        <div className="mt-[5px]">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                        </div>
                        <div className="mt-[5px]">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                    </div>
                </TECollapse>
            </div>
            <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="accordion-header mb-0" id="headingThree">
                    <button
                        className={`${activeElement === "element3"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element3")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        Accordion Item #3
                        <span
                            className={`${activeElement === "element3"
                                ? `rotate-[-180deg] -mr-1`
                                : `rotate-0 fill-[#212529] dark:fill-white`
                                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </span>
                    </button>
                </h2>
                <TECollapse
                    show={activeElement === "element3"}
                    className="!mt-0 !shadow-none"
                >
                    <div className="px-5 py-4">
                        <strong>This is the third item's accordion body.</strong>Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Vestibulum eu rhoncus
                        purus, vitae tincidunt nibh. Vivamus elementum egestas ligula in
                        varius. Proin ac erat pretium, ultricies leo at, cursus ante.
                        Pellentesque at odio euismod, mattis urna ac, accumsan metus. Nam
                        nisi leo, malesuada vitae pretium et, laoreet at lorem. Curabitur
                        non sollicitudin neque.
                    </div>
                </TECollapse>
            </div>
        </section>
    )
}

export default Settings