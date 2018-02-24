var express = require('express');
var router = express.Router()
var upload = require('../middlewares/images')

router.get('/', (req,res) => {
    res.send('masuk upload')
})

router.post('/', upload.multer.single('img'), upload.sendUploadToGCS,
    (req, res) => {
        res.send({
            status: 200,
            message: 'file has been uploaded',
            link: req.file.cloudStoragePublicUrl
        })
    })

module.exports = router