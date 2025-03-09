const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

app.get('/cek-region', async (req, res) => {
    const { id, server } = req.query;
    
    if (!id || !server) {
        return res.status(400).json({ error: 'Harap masukkan ID dan Server MLBB' });
    }
    
    try {
        const response = await axios.get(`https://www.klastergames.com/cek-region-mobile-legends?id=${id}&server=${server}`);
        
        if (response.data.success) {
            return res.json({
                id: id,
                server: server,
                region: response.data.region,
                nickname: response.data.nickname || 'Tidak tersedia',
                rank: response.data.rank || 'Tidak tersedia',
                account_creation_date: response.data.account_creation_date || 'Tidak tersedia'
            });
        } else {
            return res.status(404).json({ error: 'Data tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
