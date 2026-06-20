import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { BRAND } from '../brand';

interface ThumbnailProps {
  titulo: string;
  subtitulo?: string;
  instructorImage?: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ titulo, subtitulo, instructorImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const boxScale = spring({ frame, fps, from: 0.85, to: 1, config: { damping: 14, stiffness: 120 } });
  const boxOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: 'clamp' });

  const titleY = interpolate(frame, [10, 28], [20, 0], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 28], [0, 1], { extrapolateRight: 'clamp' });

  const tagOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.lavender, opacity: bgOpacity, fontFamily: BRAND.fontFamily }}>

      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 320, height: 320, borderRadius: '50%',
        backgroundColor: BRAND.pink, opacity: 0.08,
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60,
        width: 240, height: 240, borderRadius: '50%',
        backgroundColor: BRAND.pink, opacity: 0.06,
      }} />

      {/* Instructor photo area (right side) */}
      {instructorImage && (
        <div style={{
          position: 'absolute', right: 60, bottom: 0,
          width: 380, height: 620,
          backgroundImage: `url(${instructorImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }} />
      )}

      {/* Main white card */}
      <div style={{
        position: 'absolute',
        left: 60, top: '50%',
        transform: `translateY(-50%) scale(${boxScale})`,
        width: instructorImage ? 680 : 1160,
        opacity: boxOpacity,
        backgroundColor: BRAND.white,
        borderRadius: 24,
        border: `4px solid ${BRAND.pink}`,
        padding: '48px 52px',
        boxShadow: '0 20px 60px rgba(240,61,140,0.15)',
      }}>

        {/* CC Nails tag */}
        <div style={{
          display: 'inline-block',
          backgroundColor: BRAND.pink,
          color: BRAND.white,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 2,
          padding: '8px 20px',
          borderRadius: 100,
          marginBottom: 24,
          opacity: tagOpacity,
          textTransform: 'uppercase',
        }}>
          CC Nails Academy
        </div>

        {/* Title */}
        <div style={{
          fontSize: titulo.length > 50 ? 46 : 54,
          fontWeight: 900,
          color: BRAND.dark,
          lineHeight: 1.15,
          marginBottom: subtitulo ? 20 : 0,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}>
          {titulo}
        </div>

        {/* Subtitle */}
        {subtitulo && (
          <div style={{
            fontSize: 28,
            fontWeight: 600,
            color: BRAND.pink,
            opacity: titleOpacity,
          }}>
            {subtitulo}
          </div>
        )}

        {/* Pink accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 52,
          width: 80, height: 5,
          backgroundColor: BRAND.pink,
          borderRadius: 100,
          opacity: tagOpacity,
        }} />
      </div>
    </AbsoluteFill>
  );
};
