import React from 'react'
import ReactDOM from "react-dom"
import Header from '../Header';
import { X } from 'lucide-react';

type ModelProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    name: string;
}

const index = ({ children, isOpen, onClose, name }: ModelProps) => {

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600/50 p-4'>
            <div className='w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary'>
                <Header
                    name={name}
                    buttonComponet={
                        <button
                            className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600'
                            onClick={onClose}>
                            <X size={18} />
                        </button>
                    }
                    isSmallText={true}
                />
                {children}
            </div>
        </div>,
        document.body,
    );
}

export default index