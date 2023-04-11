const cloudinary = require('../configs/config.cloudinary')

const uploadImageFromUrl = async() => {
    try {
        const urlImage = 'https://mixkit.imgix.net/art/399/399-original.png-1000h.png'
        const folderName = '/products/shopId', newFileName = 'demo.jpg'

        const result = await cloudinary.uploader.upload(urlImage, {
            public_id: newFileName,
            folder: folderName
        })

        console.log(result)
    } catch (e) {
        console.error(e)
    }
}

uploadImageFromUrl().catch()
