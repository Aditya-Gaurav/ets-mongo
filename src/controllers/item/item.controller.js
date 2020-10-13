const httpStatus = require('http-status');
var fs = require('fs'); 
const mongoose =  require('mongoose');

const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const gc = require('../../utils/upload');
const { itemService } = require('../../services');
const { summaryService } = require('../../services');


const sharp = require('sharp'); 

const createItem = catchAsync(async (req, res) => {
  const item = await itemService.createItem(req.body.createItemData);
  req.body.isummaryData['_id'] = item._id
  await summaryService.createSummary(req.body.isummaryData);
  res.status(httpStatus.CREATED).send(item);
});


const getItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await itemService.queryItems(filter, options);
  res.send(result);
});

const getItem = catchAsync(async (req, res) => {
  const item = await itemService.getItemById(req.params.itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(item);
});

const updateItem = catchAsync(async (req, res) => {
  const user = await itemService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteItem = catchAsync(async (req, res) => {
  await itemService.deleteItemById(req.params.itemId);
  res.status(httpStatus.NO_CONTENT).send();
});

const upload = catchAsync(async(req, res) => {

  
   

  console.log(req.body.username);
  console.log(req.files);
  const _id = mongoose.Types.ObjectId();

   
  // return res.json("File Uploaded Successfully!"); 

  for(let i =0; i < req.files.length; i++){
    const originalImage = `./images/${_id}_original_${i}.jpg`;
    const thumbnmailImgName = `./images/${_id}_thumbnmail_${i}.jpg`;
    const mediumImage = `./images/${_id}_medium_${i}.jpg`;

    let arrOfMedia = [];
    arrOfMedia.push();

    fs.rename(req.files[i].path,`./images/${_id}_original_${i}.jpg`, ()=>{ 
       
      sharp(`./images/${_id}_original_${i}.jpg`).resize(180,240, {
        fit: 'contain',
        position: sharp.strategy.entropy,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }).toBuffer()
      .then( (data)=>{
        console.log(data);
        gc.uploadImage(req.files[i],`${_id}_thumbnail_${i}.jpg`);

      }); 


      
      sharp(`./images/${_id}_original_${i}.jpg`).resize(480,640, {
        fit: 'contain',
        position: sharp.strategy.entropy,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }) 
      .jpeg({quality : 80}).toFile(mediumImage , (err, info) => {
        // console.log("info", info)
        gc.uploadImage(req.files[i],`${_id}_medium_${i}.jpg`);

       })
     


    }) 


   
  }

  

  return res.json("File Uploaded Successfully!"); 


})

module.exports = {createItem, getItem, getItems, updateItem, deleteItem, upload} 