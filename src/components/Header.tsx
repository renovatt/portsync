import Link from 'next/link';
import Navigation from './Navigation';

function Header() {
    return (
        <header className='flex justify-between items-center w-full p-4 h-20'>
            <Link
                href='/'
                className='text-white text-2xl font-bold'
            >
                Port<span className='text-textPrimary'>Sync</span></Link>
            <Navigation />
        </header>
    );
}

export default Header;