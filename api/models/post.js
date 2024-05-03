const mongoose=require('mongoose');

const {Schema,model}=mongoose

const Postschema=new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{type:Schema.Types.ObjectId,ref:'User'},
},{
    timestamps:true,
});

const PostModel=model('post',Postschema);

module.exports=PostModel;