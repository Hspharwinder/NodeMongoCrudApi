var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const FormSchema = mongoose.model('FromData');
const multer = require('multer');
var ncp = require('ncp').ncp; // for coping file



router.get('/get', (req,res)=>{
   getData(req,res);   
});

function getData(req,res){
    FormSchema.find((err,doc)=>{
        if (!err) {
            return res.send(doc);
        }
        else {
            console.log('Error in retrieving Record list :' + err);
            return res.send(err);
        }
    });    
}

router.get('/get/:id',(req,res)=>{
    FormSchema.findById(req.params.id, (err,doc)=>{
        if(!err)
            res.send(doc);
        else{            
            console.log('Error in retrieving book :' + err)
            res.send('Error in retrieving book :' + err)
        }
    });
});

router.put('/put',(req,res)=>{
    FormSchema.findById(req.body.id, (err,doc)=>{
        if(err) return res.send("error form not valid "+ err);
        let response = update(req, doc);    
        res.send(response);        
    });
});

function update(req, doc){
    doc.dept = req.body.dept;
    doc.designation = req.body.designation;
    doc.email = req.body.email;
    doc.games = {...req.body.games};
    doc.otherGames = req.body.otherGames;
    doc.gender = req.body.gender;
    doc.hobbies = req.body.hobbies;
    doc.name = req.body.name;
    doc.password = req.body.password;
    doc.save(function (err, doc) {
        let msg;
        if (!err) {
            console.log(doc.name + " form saved.");
            msg = doc.name + " form saved.";
        }
        else{
            console.error(err);
            msg = "err while updating.";
        }
        return msg;
    });
}

router.delete('/delete/:id', (req,res)=>{
    FormSchema.findByIdAndRemove(req.params.id, (err,doc)=>{
        if (!err) {          
            console.log('Deletion Success :');
        }
        else {
            console.log('Error in while deleting record :' + err);
        }
    });   
    getData(req,res);
});

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Controllers/FormController/tempFile')
    },
    filename:function(req,file,cb){
        cb(null, '-' + Date.now() + file.originalname);
    }
  })

var upload = multer({ storage: storage });
  
router.post('/filePost', upload.single('File'), function (req, res, next) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            fileUploadSucess: false
        });

    } else {
        console.log('file received');        
        //fileCopy();
        
        return res.send({
            fileUploadSucess: true
        })
    }
});

router.post('/post', (req,res)=>{
    let res1 = fileCopy(req,res);   
    let res2 = addRecords(req,res);
    let response = "res1: " + res1  + "  res2: " + res2;
    console.log("response" + response);
    res.send(response);
    
});

async function moveFile(req, res){
    // let source = 'Controllers/FormController/tempFile/-15699376994760.png';
    const fs = require('fs');
    const path = require('path');
    const directory = 'Controllers/FormController/tempFile';
    let msg;
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
             fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
                msg = 'successfully deleted ' + file;
                console.log('successfully deleted ' + file);
            });
        }
    });
    res.send(msg);
}

function fileCopy(req,res){ 
    let source = 'Controllers/FormController/tempFile';
    let destination = 'Controllers/FormController/fileUpload';
    let msg;
    ncp(source, destination, function (err) {
        if (err) {
            msg = "Error While copying file " + err;
            console.error(msg);            
        }
        else{           
            msg = "Copy File Done !!";
            console.log(msg); 
            moveFile(req,res);         
        }            
    });
    res.send(msg);
}


function addRecords(req,res) {
    var form = new FormSchema(); 
    form.dept = req.body.dept,
    form.designation = req.body.designation,
    form.email = req.body.email,
    form.games = {...req.body.games},
    form.otherGames = req.body.otherGames,
    form.gender = req.body.gender,
    form.hobbies = {...req.body.hobbies},
    form.name = req.body.name
    form.password = req.body.password,
    form.filePath = 'Controllers/FormController/fileUpload/' + req.body.fileUpload.replace(/^C:\\fakepath\\/i, '');
    
    let msg;
    form.save(function (err, form) {
        if (!err) {
            console.log(form.name + " form saved.");
            msg = " " + form.name + " form saved.";
        }
        else{
            console.error(err);
            msg = " err while saving.";
        }
    });    
    res.send(msg);
}

module.exports = router;