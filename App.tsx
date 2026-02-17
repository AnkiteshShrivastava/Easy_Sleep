import React, { useRef } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SoundProvider, useSound, SleepMode } from './src/context/SoundContext';
import { TimerControl } from './src/components/TimerControl';
import { theme } from './src/theme';

const MODES: { id: SleepMode, title: string, subtitle: string, color: string }[] = [
  { id: 'lucid', title: 'Lucid Dream', subtitle: 'Theta Waves + Warm Sub-tone', color: '#4A148C' }, // Deep Purple
  { id: 'deep', title: 'Deep Sleep', subtitle: '200Hz + Warm Undertone', color: '#1A237E' }, // Deep Blue
  { id: 'healing', title: 'Healing', subtitle: '432Hz + Gentle Sub-Harmonic', color: '#1B5E20' }, // Deep Green
  { id: 'meditation', title: 'Meditation', subtitle: '528Hz + Breathing Rhythm', color: '#F57F17' }, // Deep Gold/Orange
];

const MainScreen = () => {
  const { isPlaying, play, stop, setMode, mode } = useSound();
  // const pagerRef = useRef<PagerView>(null); // Not used currently

  const handlePress = () => {
    if (isPlaying) stop();
    else play();
  };

  const onPageSelected = (e: any) => {
    const index = e.nativeEvent.position;
    const newMode = MODES[index].id;
    if (mode !== newMode) {
      setMode(newMode);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      {/* Header / Logo Area */}
      <View style={styles.header}>
        {/* Placeholder for Logo - In a real scenario we'd use an Image source */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>🌑</Text>
        </View>
        <Text style={styles.headerTitle}>Sleep Frequency</Text>
      </View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {MODES.map((m) => (
          <View key={m.id} style={styles.page}>
            <View style={[styles.card, { borderColor: m.color }]}>
              <Text style={[styles.modeTitle, { color: m.color }]}>{m.title}</Text>
              <Text style={styles.modeSubtitle}>{m.subtitle}</Text>

              <View style={styles.circleContainer}>
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    { borderColor: m.color },
                    isPlaying && mode === m.id && { backgroundColor: m.color }
                  ]}
                  onPress={handlePress}
                >
                  <Text style={[
                    styles.playText,
                    isPlaying && mode === m.id && { color: '#000' }
                  ]}>
                    {isPlaying && mode === m.id ? "STOP" : "START"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TimerControl />
            </View>
            <Text style={styles.swipeHint}>Swipe for more modes</Text>
          </View>
        ))}
      </PagerView>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <SoundProvider>
      <MainScreen />
    </SoundProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.s,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    marginRight: theme.spacing.s,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  card: {
    width: '100%',
    height: '80%',
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    borderWidth: 2,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: theme.spacing.l,
    textAlign: 'center',
  },
  modeSubtitle: {
    fontSize: 16,
    color: theme.colors.textDim,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: 2,
  },
  swipeHint: {
    color: theme.colors.textDim,
    marginTop: theme.spacing.m,
    fontSize: 12,
  }
});

export default App;
