import { NativeModules } from 'react-native';

const { SoundGenerator } = NativeModules;

interface SoundGeneratorType {
    play(type: string, params: { freq?: number; binauralFreq?: number }): void;
    stop(): void;
    setVolume(volume: number): void;
}

export default SoundGenerator as SoundGeneratorType;
