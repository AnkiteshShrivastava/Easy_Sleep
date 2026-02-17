import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSound, SoundType } from '../context/SoundContext';
import { theme } from '../theme';

const OPTIONS: { id: SoundType, label: string }[] = [
    { id: 'pink', label: 'Pink Noise' },
    { id: 'brown', label: 'Brown Noise' },
    { id: 'sine', label: 'Pure Tone' },
    { id: 'binaural', label: 'Binaural Beats' },
];

export const SoundSelector = () => {
    const { type, isPlaying, play, stop } = useSound();

    const handlePress = (id: SoundType) => {
        if (isPlaying && type === id) {
            stop();
        } else {
            play(id);
        }
    };

    return (
        <View style={styles.container}>
            {OPTIONS.map((option) => {
                const isActive = isPlaying && type === option.id;
                return (
                    <TouchableOpacity
                        key={option.id}
                        style={[styles.button, isActive && styles.activeButton]}
                        onPress={() => handlePress(option.id)}
                    >
                        <Text style={[styles.text, isActive && styles.activeText]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: theme.spacing.m,
        marginVertical: theme.spacing.l,
    },
    button: {
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.l,
        borderRadius: 25,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.textDim,
        minWidth: '40%',
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    text: {
        color: theme.colors.text,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    activeText: {
        color: '#000', // Black text on active button
    },
});
