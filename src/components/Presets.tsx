import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSound, SoundType } from '../context/SoundContext';
import { theme } from '../theme';

interface Preset {
    id: string;
    name: string;
    type: SoundType;
    freq1: number;
    binauralBeat: number;
    volume: number;
}

export const Presets = () => {
    const { type, freq1, binauralBeat, volume, play, setVolume, setFrequency, setBinauralBeat } = useSound();
    const [presets, setPresets] = useState<Preset[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        loadPresets();
    }, []);

    const loadPresets = async () => {
        try {
            const stored = await AsyncStorage.getItem('presets');
            if (stored) setPresets(JSON.parse(stored));
        } catch (e) {
            console.error(e);
        }
    };

    const savePreset = async () => {
        if (!name.trim()) return;
        const newPreset: Preset = {
            id: Date.now().toString(),
            name,
            type,
            freq1,
            binauralBeat,
            volume
        };
        const updated = [...presets, newPreset];
        setPresets(updated);
        await AsyncStorage.setItem('presets', JSON.stringify(updated));
        setName('');
    };

    const loadPreset = (preset: Preset) => {
        setVolume(preset.volume);
        setFrequency(preset.freq1);
        setBinauralBeat(preset.binauralBeat);
        play(preset.type);
    };

    const deletePreset = async (id: string) => {
        const updated = presets.filter(p => p.id !== id);
        setPresets(updated);
        await AsyncStorage.setItem('presets', JSON.stringify(updated));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Presets</Text>

            {/* Save Current */}
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Preset Name"
                    placeholderTextColor={theme.colors.textDim}
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity style={styles.saveBtn} onPress={savePreset}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            <View style={styles.list}>
                {presets.map(p => (
                    <View key={p.id} style={styles.presetItem}>
                        <TouchableOpacity style={styles.presetInfo} onPress={() => loadPreset(p)}>
                            <Text style={styles.presetName}>{p.name}</Text>
                            <Text style={styles.presetDetail}>{p.type} • {Math.round(p.volume * 100)}%</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletePreset(p.id)}>
                            <Text style={styles.deleteText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.m,
        width: '100%',
        marginTop: theme.spacing.l,
    },
    header: {
        ...theme.typography.subheader,
        marginBottom: theme.spacing.m,
    },
    inputRow: {
        flexDirection: 'row',
        gap: theme.spacing.s,
        marginBottom: theme.spacing.m,
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.card,
        color: theme.colors.text,
        padding: theme.spacing.s,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.textDim,
    },
    saveBtn: {
        backgroundColor: theme.colors.secondary,
        padding: theme.spacing.s,
        borderRadius: 8,
        justifyContent: 'center',
    },
    btnText: {
        color: '#000',
        fontWeight: 'bold',
    },
    list: {
        gap: theme.spacing.s,
    },
    presetItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        padding: theme.spacing.s,
        borderRadius: 8,
    },
    presetInfo: {
        flex: 1,
    },
    presetName: {
        color: theme.colors.text,
        fontWeight: '600',
    },
    presetDetail: {
        color: theme.colors.textDim,
        fontSize: 12,
    },
    deleteText: {
        color: theme.colors.error,
        fontSize: 18,
        paddingHorizontal: theme.spacing.s,
    },
});
