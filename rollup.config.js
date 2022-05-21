import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import analyze from 'rollup-plugin-analyzer';
const input = ['./src/index.ts'];
export default [
  {
    input,
    output: [
      {
        file: 'dist/bundle.js',
        format: 'iife',
        name: 'cfmModule',
        sourcemap: false
      }
    ],
    plugins: [
      analyze({
        summaryOnly: true
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            module: 'es2015'
          }
        }
      }),
      babel({ babelHelpers: 'bundled' }),
      terser()
    ]
  }
];
