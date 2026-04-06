const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080

// Serve static site files from workspace root
app.use('/', express.static(path.join(__dirname)))

app.get('/ping', (req, res) => res.send('ok'))

app.listen(PORT, () => console.log(`Static server running on http://0.0.0.0:${PORT}`))
