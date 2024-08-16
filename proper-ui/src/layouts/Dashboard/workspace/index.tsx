import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import React from 'react'
import { placeholders } from './const';
import { WavyBackground } from '@/components/ui/wavy-background';

type Props = {}

const Workspace = (props: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (
        <div className="flex flex-col justify-center items-center px-4 pt-4">
            <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
                Ask HealthLight Anything
            </h2>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default Workspace
