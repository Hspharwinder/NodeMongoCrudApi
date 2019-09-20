var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const BookSchema = mongoose.model('bookstore');

//testing purpose
// router.get('/getpost', (req,res)=>{
//     var book = add();
//     res.send(book);
// });

router.get('/get', (req,res)=>{
    BookSchema.find((err,doc)=>{
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in retrieving book list :' + err);
        }
    });    
});

router.get('/get/:id',(req,res)=>{
    BookSchema.findById(req.params.id, (err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in retrieving book :' + err)
    });
});

router.delete('/delete/:id',(req,res)=>{
    BookSchema.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err)
            res.send(doc);
        else
         console.log('Error in Deleting book list :' + err);
    });
});

router.put('/put', (req,res)=>{
      BookSchema.findById(req.body.id, (err,doc)=>{
        if(!err)
        {
          doc.name = req.body.name;
          doc.email = req.body.email,
          doc.price = req.body.price,
          doc.quantity = req.body.quantity
          doc.save();     
        }
        else
        {
         console.log('Error in retrieving book :' + err)
        }
             
        res.json(req.body);
    });
});
router.post('/post', (req,res)=>{
    var book = add(req,res);
    res.send(book);
});

function add(req,res){
    var book = new BookSchema(); 
    book.name = req.body.name,
    book.email = req.body.email,
    book.price = req.body.price,
    book.quantity = req.body.quantity,

    book.save(function (err, book) {
        if (err) return console.error(err);
        console.log(book.name + " saved to bookstore collection.");
    });
    return book
}

module.exports = router;