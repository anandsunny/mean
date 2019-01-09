import { Comment } from './comment';
import { DisLike } from './disLike';
import { ILike } from './like';

export interface IBlog {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    createdBy: string;
    likes: number;
    likedBy: ILike[];
    disLikes: number;
    disLikedBy: DisLike[];
    comments: Comment[];
    blogImg: string;
}
