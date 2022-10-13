import Comment from "../models/CommentModel.js";

// get all Comments

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ video_id: req.params.id })
        res.json(comments)
    } catch (error) {
        res.json({ message: error })
       console.log('error fetching Comments', error)
    }
    
}

// add Wish list

const addComment = async (req, res) => {

    const { content, author } = req.body

    const createdComment = await Comment.create({
        author: author ? author : 'Adib',
        content: content,
        video_id: req.params.id

    })

    res.status(201).json(createdComment)

}




//delete Comment by id
// const deleteCommentById = async (req, res) => {
//     if(mongoose.Types.ObjectId.isValid(req.params.id)) {
//         const foundedComment =  await Comment.findById(req.params.id);

//         if(foundedComment) {
    
//          await Comment.deleteOne(foundedComment)
//          res.json({ message: 'Comment Deleted' })
            
//         } else {
//             res.status(404)
//             throw new Error('Comment Not Found')
//         }
//     }
// }







export { addComment, getComments }