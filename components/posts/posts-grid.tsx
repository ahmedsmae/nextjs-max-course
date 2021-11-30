import React from 'react';
import PostItem from './post-item';
import classes from './posts-grid.module.css';

interface PostsGridProps {
  posts: Array<Post>;
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map(p => (
        <PostItem key={p.slug} post={p} />
      ))}
    </ul>
  );
};

export default PostsGrid;
