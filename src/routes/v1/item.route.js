const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const itemValidation = require('../../validations/item.validation');
const itemController = require('../../controllers/item/item.controller');
const fs = require('fs');

const gc = require('../../config/gce');
const bucket =  gc.bucket('etshirt');

const multer = require('multer'); 
// const upload = multer({dest : './images'});  

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null,  file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

router
    .route('/')
    .post(validate(itemValidation.createItem), itemController.createItem)
    .get(validate(itemValidation.getItems), itemController.getItems);

router.route('/:itemId')
    .get(validate(itemValidation.getItem), itemController.getItem)
    .patch(validate(itemValidation.updateItem), itemController.updateItem)
    .delete(validate(itemValidation.deleteItem), itemController.deleteItem);

// router.route('/upload').post( upload.array("avatar"),  itemController.upload)    

router.route('/upload').post( upload.array("file"),  (req, res, next) => {
      // Reference an existing bucket.
    //   var bucket = gcs.bucket('my-existing-bucket');  
    console.log("req.file", req.files)  ;
    // return;  
    for(let i =0; i < req.files.length; i++){
        const {filename, originalname, buffer, path } = req.files[i]
          
        let localReadStream = fs.createReadStream(path);
        let remoteWriteStream = bucket.file(filename).createWriteStream();
        localReadStream.pipe(remoteWriteStream)
        .on('error', function(err) {
            console.log(err);
        })
        .on('finish', function() {
            fs.unlink(path, (err) => {
                if (err) {
                  console.error(err)
                }
            })    
        });
    }

     res.send('The file upload is complete.')
   


//     const {filename, originalname, buffer } = req.file
//     console.log("file upload.js", req.file);
//    const blob = bucket.file(filename)
    // const blob = bucket.file(req.file.originalname);
    // const blobStream = blob.createWriteStream({
    //     metadata: {
    //       contentType: req.file.mimetype
   
    //     },
    //    })
           
    //    blobStream.on('finish', () => {
    //      const publicUrl = media.format(
    //        `https://storage.googleapis.com/${bucket.name}/${fileName}`
    //      )
    //     //  resolve(publicUrl)
    //     res.send(publicUrl)
    //    })
   
    //    .on('error', (err) => {
    //        console.log(err)
    //      console.log(`Unable to upload image, something went wrong`)
    //    })
    //    .end(buffer)
      
    //  });




      
  }); 


module.exports = router;