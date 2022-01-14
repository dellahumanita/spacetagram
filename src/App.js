import { React } from 'react';

import ImageGrid from './ImageGrid';



function App() {


    return (
        <div className='bg-slate-100 min-h-screen'>

            <header className='p-5 shadow-md bg-slate-50 sticky top-0 w-full z-50'>
                <h1 className='text-5xl'>Spacestagram</h1>
            </header>

            <main className='py-10 px-6 relative'>
               <ImageGrid />
            </main>

            <footer></footer>
        </div>
    );
}

export default App;