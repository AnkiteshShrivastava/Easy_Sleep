import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSound } from '../context/SoundContext';
import { theme } from '../theme';

export const TimerControl = () => {
    const { stop, isPlaying } = useSound();
    const [duration, setDuration] = useState<number | null>(null); // in minutes
    const [stopTimerId, setStopTimerId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (stopTimerId) clearTimeout(stopTimerId);
        };
    }, [stopTimerId]);

    const handleDuration = (mins: number) => {
        // Toggle off if already selected
        if (duration === mins) {
            setDuration(null);
            if (stopTimerId) clearTimeout(stopTimerId);
            setStopTimerId(null);
            return;
        }

        setDuration(mins);
        if (isPlaying) {
            if (stopTimerId) clearTimeout(stopTimerId);
            const stopId = setTimeout(() => {
                stop();
                setDuration(null);
                setStopTimerId(null);
            }, mins * 60 * 1000);
            setStopTimerId(stopId);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.subHeader}>Auto-Stop Timer</Text>
            <View style={styles.durations}>
                {[30, 60, 480].map(m => (
                    <TouchableOpacity
                        key={m}
                        style={[styles.durButton, duration === m && styles.activeDur]}
                        onPress={() => handleDuration(m)}
                    >
                        <Text style={[styles.durText, duration === m && styles.activeDurText]}>
                            {m >= 60 ? `${m / 60}h` : `${m}m`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {duration && isPlaying && (
                <Text style={styles.statusText}>Stopping in {duration} minutes</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.m,
        borderRadius: 12,
        marginTop: theme.spacing.l,
        alignItems: 'center',
        width: '100%',
    },
    subHeader: {
        color: theme.colors.textDim,
        marginBottom: theme.spacing.m,
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    durations: {
        flexDirection: 'row',
        gap: theme.spacing.m,
        marginBottom: theme.spacing.m,
    },
    durButton: {
        paddingVertical: theme.spacing.s,
        paddingHorizontal: theme.spacing.l,
        borderWidth: 1,
        borderColor: theme.colors.textDim,
        borderRadius: 20,
        minWidth: 70,
        alignItems: 'center',
    },
    activeDur: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    durText: {
        color: theme.colors.text,
        fontWeight: '600',
    },
    activeDurText: {
        color: '#000',
    },
    statusText: {
        color: theme.colors.primary,
        marginTop: theme.spacing.s,
        fontSize: 12,
    }
});
