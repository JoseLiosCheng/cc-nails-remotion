const express = require('express');
const path = require('path');
const fs = require('fs');
const { bundle } = require('@remotion/bundler');
const { renderStill, selectComposition } = require('@remotion/renderer');

const app = express();
app.use(express.json({ limit: '10mb' }));

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

let bundleLocation = null;

async function getBundle() {
  if (!bundleLocation) {
    console.log('Bundling Remotion project...');
    bundleLocation = await bundle({
      entryPoint: path.join(__dirname, 'src/index.ts'),
      publicDir: path.join(__dirname, 'public'),
      webpackOverride: (config) => config,
    });
    console.log('Bundle ready.');
  }
  return bundleLocation;
}

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Render thumbnail
app.post('/render/thumbnail', async (req, res) => {
  const { titulo, subtitulo, instructorImage, outputName } = req.body;

  if (!titulo) return res.status(400).json({ error: 'titulo is required' });

  try {
    const bundlePath = await getBundle();
    const fileName = `thumbnail_${outputName || Date.now()}.jpeg`;
    const outputPath = path.join(OUTPUT_DIR, fileName);

    const composition = await selectComposition({
      serveUrl: bundlePath,
      id: 'Thumbnail',
      inputProps: { titulo, subtitulo, instructorImage },
    });

    await renderStill({
      composition,
      serveUrl: bundlePath,
      output: outputPath,
      inputProps: { titulo, subtitulo, instructorImage },
      frame: 59,
      imageFormat: 'jpeg',
      jpegQuality: 90,
    });

    res.download(outputPath, fileName, (err) => {
      if (!err) fs.unlink(outputPath, () => {});
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Remotion render server running on port ${PORT}`));
