import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSound } from '../context/SoundContext';
import { theme } from '../theme';

export const FrequencyControl = () => {
    const { type, volume, freq1, binauralBeat, setVolume, setFrequency, setBinauralBeat } = useSound();

    return (
        <View style={styles.container}>
            {/* Volume Control */}
            <View style={styles.controlGroup}>
                <Text style={styles.label}>Volume: {Math.round(volume * 100)}%</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={volume}
                    onValueChange={setVolume}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor={theme.colors.textDim}
                    thumbTintColor={theme.colors.primary}
                />
            </View>

            {/* Frequency Control (Sine/Binaural only) */}
            {(type === 'sine' || type === 'binaural') && (
                <View style={styles.controlGroup}>
                    <Text style={styles.label}>Frequency: {Math.round(freq1)} Hz</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={100}
                        maximumValue={600}
                        value={freq1}
                        onValueChange={setFrequency}
                        minimumTrackTintColor={theme.colors.secondary}
                        maximumTrackTintColor={theme.colors.textDim}
                        thumbTintColor={theme.colors.secondary}
                    />
                </View>
            )}

            {/* Binaural Beat Control */}
            {type === 'binaural' && (
                <View style={styles.controlGroup}>
                    <Text style={styles.label}>Binaural Beat: {binauralBeat.toFixed(1)} Hz</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0.5}
                        maximumValue={15}
                        value={binauralBeat}
                        onValueChange={setBinauralBeat}
                        step={0.1}
                        minimumTrackTintColor={theme.colors.secondary}
                        maximumTrackTintColor={theme.colors.textDim}
                        thumbTintColor={theme.colors.secondary}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.m,
        width: '100%',
    },
    controlGroup: {
        marginBottom: theme.spacing.l,
    },
    label: {
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
        fontSize: theme.typography.body.fontSize,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});
