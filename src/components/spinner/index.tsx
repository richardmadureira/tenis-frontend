import { memo } from 'react';
import { FaSpinner } from 'react-icons/fa';

export const Spinner = memo(() => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <FaSpinner size={48} className='animate-spin' />
        </div>
    );
})