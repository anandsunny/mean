const User = require('../models/user_m');
const Blog = require('../models/blogs_m');


exports.getSingle = (req, res) => {
    const table = req.params.table;
    const field = req.params.field;
    const field_value = req.params.value;
    const query = {};
    query[field] = field_value;
    let singleData;
    switch(table) {
        case 'user': singleData = User;
                     break;
        
        case 'blog': singleData = Blog;
                     break;

        default:     singleData = Blog;
                     break;
    }
    // console.log(table, field, field_value);
    singleData.find(query)
    .exec()
    .then(result => {
        if(!result) {
            res.status(204).json({success: false, message: 'Data Not Found.'});
        } else {
            res.status(200).json({message: true, result: result});
        }
    })
    .catch(err => {
        res.status(400).json({success: false, message: err});
    });
}


// delete by id
exports.delete = (req, res) => {
    const table = req.params.table;
    const field = req.params.field;
    const field_value = req.params.value;
    const query = {};
    query[field] = field_value;
    let deleteData;
    switch(table) {
        case 'user': deleteData = User;
                     break;

        case 'blog': deleteData = Blog;
                     break;

        default:     deleteData = Blog;
                     break;
    }
    // console.log(query)
    deleteData.deleteOne(query)
    .exec()
    .then((result) => {
        res.status(200).json({
            result: result
        })
    })
    .catch((err) => {
        res.status(400).json({
            error: err
        })
    })
}


