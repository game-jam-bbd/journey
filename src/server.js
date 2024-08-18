import express from 'express'
import { join } from 'path'
import { cwd } from 'process'


const PORT = 3000

const app = express()

app.use(express.static(join(cwd(), 'dist')))

app.get('/', (request, response) => response.sendFile(join(cwd(), 'dist', 'index.html')))

app.listen(PORT, () => console.log(`Server active on port ${PORT}...`))