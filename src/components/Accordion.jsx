import './Accordion.css';

function Accordion() {

    const showRow = (e) => {
        const div = e.target.nextElementSibling;
        div.classList.toggle('accordion-slide-bottom-hidden');
        div.classList.toggle('accordion-slide-bottom');
        console.log(div)
    }

return (
    <>
        <div>
            <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl  dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 bg-gray-100 dark:hover:bg-gray-800 gap-3" onClick={showRow}>
                <span>What is Flowbite?</span>
                <svg className="w-3 h-3 rotate-180 shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
            </button>
            <div className=" border border-white accordion-slide-bottom-hidden backdrop-blur-sm">
                <div className="p-5">
                <p className="mb-2 text-white">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                <p className="text-white">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-gray-200">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                </div>
            </div>
        </div>
        
    </>
)

}

export default Accordion;