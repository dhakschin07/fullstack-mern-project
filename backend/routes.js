const express = require('express');
const router=express.Router();
const mongoose=require('mongoose');
const itemSchema= new mongoose.Schema(
    {
        name :{
            type:String,
            required: true
        },
        price:{
            type:Number,
            required:true
        }
    }
)
// let items=mongoose.Model('items',itemSchema);
// let Item = mongoose.model('items', itemSchema);
let Item = mongoose.model('items', itemSchema);


router.get('/items', async(req,res)=>{
    try{
        const items=await Item.find();
        res.json(items);
    }
   catch(error){
    res.status(500).json({ message: 'Error fetching items', error });
   }
});

// post method
router.post('/items', async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            price: req.body.price
        });
        await newItem.save();
        res.status(201).json({ message: 'Item added', item: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
});

// router.post('/items',(req,res)=>{
//     const newItem={
//         name: req.body.name,
//         price: req.body.price
//     };
//     items.push(newItem);
//     res.status(201).json({message:'Item added',item:newItem});
// });

// router.put('/items/:id',async(req,res)=>{
//     const itemId=req.params.id;
//     const updatedItem={
//         name: req.body.name,
//         price: req.body.price
//     };
//     if(items[itemId]){
//         items[itemId]=updatedItem;
//         res.json({message: 'Item updated', item: updatedItem});
//     }
//     else{
//         res.status(404).json({message: 'Item not found'});
//     }
// });

router.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, price: req.body.price },
            { new: true }
        );
        if (updatedItem) {
            res.json({ message: 'Item updated', item: updatedItem });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
});
//delete 

router.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (deletedItem) {
            res.json({ message: 'Item deleted', item: deletedItem });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
});


// router.delete('/items/:id',(req,res)=>{
//     const itemId = req.params.id;
//     if(items[itemId]){
//         const deletedItem=items.splice(itemId,1);
//         res.json({message: 'Item deleted', item: deletedItem });
//     }
//     else{
//         res.status(404).json({message: 'Item not found'});
//     }
// });

module.exports=router;
