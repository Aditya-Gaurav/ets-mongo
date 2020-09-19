const media = require('url');
const gc = require('../config/gce');
const bucket =  gc.bucket('etshirt');

module.exports = {
  uploadImage : (file, fileName) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file
    console.log("file upload.js", file);
   const blob = bucket.file(originalname)

   const blobStream = blob.createWriteStream({
     metadata: {
       contentType: file.mimetype

     },
    })
        
        blobStream.on('finish', () => {
          const publicUrl = media.format(
            `https://storage.googleapis.com/${bucket.name}/${fileName}`
          )
          resolve(publicUrl)
        })

        .on('error', () => {
          reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
  })

  
} 