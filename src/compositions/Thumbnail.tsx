import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily } = loadFont();

interface ThumbnailProps {
  titulo: string;
  palabraClave?: string;
  subtitulo?: string;
  instructorUrl?: string;
  logoUrl?: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  titulo,
  palabraClave,
  subtitulo,
  instructorUrl,
  logoUrl,
}) => {
  const photoSrc = instructorUrl || '';
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlide = interpolate(frame, [8, 28], [-40, 0], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [8, 28], [0, 1], { extrapolateRight: 'clamp' });
  const photoOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const tagOpacity = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        background: 'linear-gradient(135deg, #3A0A2E 0%, #6B1250 35%, #9E2D6B 65%, #C86090 100%)',
        overflow: 'hidden',
        opacity: fadeIn,
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: -120, left: -80,
        width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, left: 200,
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
      }} />

      {/* Sparkle dots */}
      {[
        { top: 80, left: 420, size: 10 },
        { top: 160, left: 560, size: 7 },
        { top: 320, left: 380, size: 12 },
        { top: 560, left: 500, size: 8 },
        { top: 100, left: 640, size: 6 },
      ].map((dot, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: dot.top, left: dot.left,
          width: dot.size, height: dot.size,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.5)',
          opacity: tagOpacity,
        }} />
      ))}

      {/* TEXT AREA — left side */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 40px 60px 70px',
      }}>

        {/* Logo en pill blanco */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 100,
          padding: '10px 24px',
          marginBottom: 28,
          width: 'fit-content',
          opacity: tagOpacity,
        }}>
          {logoUrl && (
            <Img
              src={logoUrl}
              style={{ height: 52, width: 'auto' }}
            />
          )}
        </div>

        {/* Keyword — huge accent */}
        {palabraClave && (
          <div style={{
            fontSize: 88,
            fontWeight: 900,
            color: '#FFE4F0',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            letterSpacing: -1,
            opacity: titleOpacity,
            transform: `translateY(${titleSlide}px)`,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            marginBottom: 4,
          }}>
            {palabraClave}
          </div>
        )}

        {/* Main title */}
        <div style={{
          fontSize: palabraClave ? 52 : 68,
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: 1.1,
          textTransform: 'uppercase',
          opacity: titleOpacity,
          transform: `translateY(${titleSlide}px)`,
          textShadow: '0 3px 16px rgba(0,0,0,0.25)',
          marginBottom: subtitulo ? 20 : 0,
        }}>
          {titulo}
        </div>

        {/* Subtitle pill */}
        {subtitulo && (
          <div style={{
            display: 'inline-block',
            backgroundColor: '#FFFFFF',
            borderRadius: 100,
            padding: '10px 26px',
            width: 'fit-content',
            opacity: tagOpacity,
          }}>
            <span style={{
              color: '#6B1250',
              fontSize: 26,
              fontWeight: 800,
            }}>
              {subtitulo}
            </span>
          </div>
        )}
      </div>

      {/* INSTRUCTOR PHOTO — right side, sin blend */}
      {photoSrc && (
        <Img
          src={photoSrc}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            height: '108%',
            width: 'auto',
            opacity: photoOpacity,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
