import React from 'react';
import { Composition } from 'remotion';
import { Thumbnail } from './compositions/Thumbnail';
import { BRAND } from './brand';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Thumbnail"
        component={Thumbnail}
        durationInFrames={60}
        fps={BRAND.fps}
        width={BRAND.thumbnailWidth}
        height={BRAND.thumbnailHeight}
        defaultProps={{
          titulo: 'Título del Video',
          subtitulo: 'CC Nails Academy',
        }}
      />
    </>
  );
};
