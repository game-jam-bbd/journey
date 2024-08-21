import { cpSync, copyFileSync } from 'fs'
import { build } from 'esbuild'
import { join } from 'path'
import { cwd } from 'process'


const htmlPlugin = {
  name: 'html-esbuild',
  setup: build => {
    build.onEnd(() => {
      const source = join(cwd(), 'index.html')
      const destination = join(cwd(), 'dist', 'index.html')
      
      copyFileSync(source, destination)

      console.log(`index.html copied to`, destination)
    })
  },
}

const cssPlugin = {
  name: 'css-esbuild',
  setup: build => {
    build.onEnd(() => {
      const source = join(cwd(), 'index.css')
      const destination = join(cwd(), 'dist', 'index.css')
      
      copyFileSync(source, destination)

      console.log(`index.css copied to`, destination)
    })
  },
}

const assetPlugin = {
  name: 'asset-esbuild',
  setup: build => {
    build.onEnd(() => {
      const source = join(cwd(), 'assets')
      const destination = join(cwd(), 'dist', 'assets')
      
      cpSync(
        source,
        destination,
        { recursive: true }
      )

      console.log(`assets copied to`, destination)
    })
  },
}

build({
  entryPoints: ['./src/index.js', './src/gui.js'],
  outdir: 'dist',
  bundle: true,
  plugins: [htmlPlugin, cssPlugin, assetPlugin],
  color: true,
  sourcemap: true,
  treeShaking: true,
})
  .catch(error => {
    console.error('Error building project', error)
    process.exit(1)
  })
