const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Video = require('../models/video');
const Moto = require('../models/moto');

//const db = "mongodb://thinhpvp:thinh2019@cluster0-shard-00-00-2f3mv.mongodb.net:27017,cluster0-shard-00-01-2f3mv.mongodb.net:27017,cluster0-shard-00-02-2f3mv.mongodb.net:27017/videoplayer?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const db = "mongodb+srv://liemtt:hQAvvsS1GZhyctg8@cluster0-5yexi.mongodb.net/CuaHangXeMay?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
    if(err){
        console.error("Error! ", + err);
    }
});

router.get('/getAllProduct', function(req,res){
    console.log('Get request for all Moto');
    Moto.find({})
    .exec(function(err,Moto){
        if(err){
            console.log("Error retiveing Moto");
        }
        else{
            res.json(Moto);
            console.log("Get oke");
        }
    });
});

router.get('/videos', function(req, res){
    console.log('Get request for all videos');
    Video.find({})
    .exec(function(err,videos){
        if(err){
            console.log("Error retiveing videos");
        }
        else{
            res.json(videos);
            console.log("Get oke");
        }
    });
});

router.get('/videos/:id', function(req, res){
    console.log('Get request for a single videos');
    Video.findById(req.params.id)
    .exec(function(err,videos){
        if(err){
            console.log("Error retiveing videos");
        }
        else{
            res.json(videos);
            console.log("Get oke");
        }
    });
});

router.post('/video', function(req,res){
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description  = req.body.description;
    newVideo.save(function(err,insertedVideo){
        if (err)
        {
            console.log('Error saving video');
        }
        else
        {
            res.json(insertedVideo);
        }
    });
});


router.put('/video/:id', function(req, res){

    console.log("Update a video");
    Video.findByIdAndUpdate(req.params.id,
        {
            $set:
                {
                    title:req.body.title, 
                    url:req.body.url,
                    description: req.body.description
                }
        },
        {
            new:true
        },
        function(err, updatedVideo){
            if (err)
            {
                console.log('Error updating video');
            }
            else
            {
                res.json(updatedVideo);
            }
        })
});

router.delete('/video/:id', function(req,res){
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id, function(err,deletedVideo){
        if(err)
        {
            res.send("Error deleting video");
        }
        else
        {
            res.json(deletedVideo);
        }
    });
});

module.exports = router;