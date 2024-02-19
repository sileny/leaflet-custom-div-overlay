import typescript from '@rollup/plugin-typescript';

export default [
  {
    external: 'leaflet',
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/leaflet-custom-div-overlay.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/leaflet-custom-div-overlay.es.js',
        format: 'es'
      },
      {
        file: 'dist/leaflet-custom-div-overlay.global.js',
        format: 'iife',
        target: 'es5'
      },
      {
        file: 'dist/leaflet-custom-div-overlay.umd.js',
        format: 'umd',
        target: 'es5'
      },
    ],
    plugins: [
      typescript({
        compilerOptions: {
          target: "es5",
          // declaration: true,
        }
      })
    ]
  }
];
