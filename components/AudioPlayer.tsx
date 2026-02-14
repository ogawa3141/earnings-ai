import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';
import { PlaybackSpeed } from '../types';

interface Props {
  ticker: string;
}

// Decorative waveform bars
const Waveform: React.FC<{ playing: boolean }> = ({ playing }) => {
  const heights = [6, 14, 8, 18, 12, 20, 10, 16, 8, 14, 6, 18, 10, 14, 8, 20, 12, 16, 6, 10, 14, 8, 18, 12];
  return (
    <View style={waveStyles.container}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={[
            waveStyles.bar,
            { height: h, opacity: playing ? 0.8 : 0.3 },
            i < 9 && { backgroundColor: colors.accent },
          ]}
        />
      ))}
    </View>
  );
};

const waveStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 2, height: 22, marginBottom: spacing.sm },
  bar: { width: 3, borderRadius: 2, backgroundColor: colors.textTertiary },
});

export const AudioPlayer: React.FC<Props> = ({ ticker }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const duration = '3:42';
  const current = '1:18';

  const speeds: PlaybackSpeed[] = [1, 1.5, 2];
  const cycleSpeed = () => {
    const idx = speeds.indexOf(speed);
    setSpeed(speeds[(idx + 1) % speeds.length]);
  };

  // Chapter markers (decorative)
  const chapters = [0.0, 0.25, 0.55, 0.8];

  return (
    <View style={styles.container}>
      {/* Waveform */}
      <Waveform playing={isPlaying} />

      {/* Progress bar with chapter markers */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[colors.accent, colors.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
          {chapters.map((c, i) => (
            <View key={i} style={[styles.chapterMark, { left: `${c * 100}%` }]} />
          ))}
          {/* Thumb */}
          <View style={[styles.progressThumb, { left: `${progress * 100}%` }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.time}>{current}</Text>
          <Text style={styles.time}>{duration}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setProgress(Math.max(0, progress - 0.1))}>
          <Ionicons name="play-back" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
          <LinearGradient
            colors={[colors.accent, colors.accentSecondary]}
            style={styles.playButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setProgress(Math.min(1, progress + 0.1))}>
          <Ionicons name="play-forward" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.speedButton} onPress={cycleSpeed}>
          <Text style={styles.speedText}>{speed}x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.surface,
    borderRadius: 2,
    overflow: 'visible',
    position: 'relative',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
    position: 'absolute',
    top: -4,
    marginLeft: -6,
    ...shadows.sm,
  },
  chapterMark: {
    position: 'absolute',
    top: -2,
    width: 2,
    height: 8,
    backgroundColor: colors.textTertiary,
    opacity: 0.4,
    borderRadius: 1,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  time: {
    color: colors.textTertiary,
    fontSize: fontSize.xs,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  speedButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  speedText: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
});
