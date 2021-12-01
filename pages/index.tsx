import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import FeaturedPosts from '@/components/home-page/featured-posts';
import Hero from '@/components/home-page/hero';
import { getFeaturedPosts } from '@/utils/posts';

interface HomePageProps {
  featuredPosts: Array<Post>;
}

const HomePage: NextPage<HomePageProps> = ({ featuredPosts }) => {
  return (
    <Fragment>
      <Head>
        <title>Ahmed Afifi Blog</title>
        <meta
          name='description'
          content='I blog about coding and programming'
        />
      </Head>

      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async context => {
  const featuredPosts = getFeaturedPosts();
  return { props: { featuredPosts } };
};

export default HomePage;
