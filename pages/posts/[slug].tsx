import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import PostContent from '../../components/posts/post-details/post-content';
import { getFeaturedPosts, getPostBySlug } from '../../utils/posts';

interface PostDetailsPageProps {
  post?: Post;
}

const PostDetailsPage: NextPage<PostDetailsPageProps> = ({ post }) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<PostDetailsPageProps> =
  async context => {
    const { params } = context;
    const slug = (params?.slug as string) || '';

    const post = getPostBySlug(slug);

    return { props: { post }, revalidate: 600 };
  };

export const getStaticPaths: GetStaticPaths = async context => {
  const featuredPosts = getFeaturedPosts();

  return {
    paths: featuredPosts.map(fp => ({ params: { slug: fp.slug } })),
    fallback: 'blocking'
  };
};

export default PostDetailsPage;
