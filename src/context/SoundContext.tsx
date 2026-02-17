import React, { createContext, useContext, useState, useEffect } from 'react';
import SoundGenerator from '../native/SoundGenerator';

export type SleepMode = 'deep' | 'lucid' | 'healing' | 'meditation';

interface SoundContextType {
    isPlaying: boolean;
    mode: SleepMode;
    play: () => void;
    stop: () => void;
    setMode: (mode: SleepMode) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [mode, setModeState] = useState<SleepMode>('deep');

    const play = () => {
        SoundGenerator.play(mode, {});
        setIsPlaying(true);
    };

    const stop = () => {
        SoundGenerator.stop();
        setIsPlaying(false);
    };

    const setMode = (newMode: SleepMode) => {
        setModeState(newMode);
        if (isPlaying) {
            SoundGenerator.play(newMode, {}); // Switch immediately
        }
    };

    useEffect(() => {
        return () => {
            SoundGenerator.stop();
        };
    }, []);

    return (
        <SoundContext.Provider value={{
            isPlaying,
            mode,
            play,
            stop,
            setMode
        }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) throw new Error("useSound must be used within SoundProvider");
    return context;
};
