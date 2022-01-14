import { React } from 'react';
import ImageGrid from './ImageGrid';
import ScrollToTop from './scrollToTop';


function App() {


    return (
        <div className='bg-slate-100 min-h-screen static'>

            <header className='p-4 shadow-md bg-slate-50 sticky top-0 w-full z-50'>

                <div className='flex flex-col items-stretch md:flex-row justify-between md:items-end md:px-8'>
                    <h1 className='text-5xl'>Spacestagram</h1>
                    <span className='text-xs pt-3 font-body text-right self-end'>
                        Data from NASA's Picture of the Day API for the last 30 days
                    </span>
                    
                </div>
            </header>

            

            <main className='py-10 px-6 relative font-body'>
                <ScrollToTop />
                <ImageGrid />
            </main>

            <footer></footer>
        </div>
    );
}

export default App;