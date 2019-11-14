const express = require('express')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const router = express.Router()

const post = require('../controllers/post.controller')
const validate = require('../helpers/validations')
const keys = require('../../config/keys')




var filename;

// create storage engine
const storage = new GridFsStorage(
  {
    url: keys.database.mongoURI,
    file: ( req, file ) => {
      return new Promise( ( resolve, reject ) => {
        crypto.randomBytes( 16, ( err, buf ) => {
          if ( err ) return reject( err )
          
          filename = buf.toString( 'hex' ) + path.extname( file.originalname )
          const fileInfo = {
            filename: filename,
            bucketName: 'fs'
          }
          resolve( fileInfo )
        })
      })
    }
  })

const upload = multer({ storage })
const passport = require('passport')
router.post('/create',  post.create)
router.get('/allposts',  post.allposts)
router.get('/getposts/:id',  post.getpostsbyID)
router.post('/addcomment/:post_id',  post.addcomment)
router.delete('/deletecomment/:cmnt_id/:post_id',  post.deletecomment)
router.get('/addlike/:post_id',  post.addlike)
router.get('/postdetails/:post_id', post.postdetails)




module.exports = router