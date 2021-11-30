import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../utils/posts';

interface AllPostsPageProps {
  allPosts: Array<Post>;
}

const AllPostsPage: NextPage<AllPostsPageProps> = ({ allPosts }) => {
  return (
    <Fragment>
      <Head>
        <title>All My Posts</title>
        <meta name='description' content='A list of all my posts' />
      </Head>
      <AllPosts posts={allPosts} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<AllPostsPageProps> =
  async context => {
    const allPosts = getAllPosts();
    return { props: { allPosts } };
  };

export default AllPostsPage;
