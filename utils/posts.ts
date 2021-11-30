import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

const getPostData = (fileName: string) => {
  const fullFilePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(fullFilePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const post: Post = {
    slug: fileName.replace(/\.md$/, ''), // remove extension
    content,
    ...(data as Omit<Post, 'slug' | 'content'>)
  };

  return post;
};

export const getAllPosts = (): Array<Post> => {
  const postFiles = fs.readdirSync(postsDirectory);
  return postFiles
    .map(pf => getPostData(pf))
    .sort((pA, pB) => (pA.date > pB.date ? -1 : 1));
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  return allPosts.filter(p => p.isFeatured);
};

export const getPostBySlug = (slug: string) => {
  const allPosts = getAllPosts();
  return allPosts.find(p => p.slug === slug);
};
