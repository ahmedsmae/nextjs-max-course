import React from 'react';
import Image from 'next/image';
import ReactMarkDown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import jsHighlighter from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import cssHighlighter from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import PostHeader from './post-header';
import classes from './post-content.module.css';

SyntaxHighlighter.registerLanguage('js', jsHighlighter);
SyntaxHighlighter.registerLanguage('css', cssHighlighter);

interface PostContentProps {
  post: Post;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkDown
        components={{
          img: props => {
            const imgPath = `/images/posts/${post.slug}/${props.src}`;
            return (
              <Image alt={props.alt} src={imgPath} width={600} height={300} />
            );
          },
          code: props => {
            const language = props.className?.replace('language-', '');
            return (
              <SyntaxHighlighter language={language} style={atomDark}>
                {props.children}
              </SyntaxHighlighter>
            );
          }
        }}
      >
        {post.content}
      </ReactMarkDown>
    </article>
  );
};

export default PostContent;
