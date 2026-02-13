import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../constants/theme';
import { PlaybackSpeed } from '../types';

interface Props {
  ticker: string;
}

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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>🎧 AI音声解説</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.time}>{current}</Text>
          <Text style={styles.time}>{duration}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setProgress(Math.max(0, progress - 0.1))}>
          <Ionicons name="play-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="#0D1117" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setProgress(Math.min(1, progress + 0.1))}>
          <Ionicons name="play-forward" size={28} color={colors.text} />
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
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  time: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  speedText: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
});
