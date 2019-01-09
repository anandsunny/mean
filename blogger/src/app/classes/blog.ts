export class Blog {
    _id: String;
    title: String;
    body: String;
    createdAt: String;
    createdBy: String;
    likes: Number;
    likedBy: Array<String>;
    disLikes: Number;
    disLikedBy: Array<String>;
    comments: Array<{ comment: String, commentator: String }>;
    blogImg: String;
    
    constructor() { }
}
