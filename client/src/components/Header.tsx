import React from 'react';

type HeaderProps = {
    name: string;
    buttonComponet?: React.ReactNode;
}

const Header = ({ name, buttonComponet }: HeaderProps) => {

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
            <h1 className="text-2xl font-bold dark:text-white">{name}</h1>
            {buttonComponet}
        </div>
    );
};

export default Header;
