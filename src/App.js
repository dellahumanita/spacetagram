import { React} from 'react';

import Image from './Image';



function App() {


    return (
        <div className='bg-slate-100'>
            <header className='p-5 shadow-md bg-slate-50'>
                <h1 className='text-5xl'>Spacestagram</h1>
            </header>

            <main className='py-10 px-6'>
               <Image />
            </main>

            <footer></footer>
        </div>
    );
}

export default App;