import React from 'react';
import Image from 'next/image';
import classes from './hero.module.css';

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/ahmed-afifi-image.jpg'
          alt='Ahmed Afifi Image'
          width={300}
          height={300}
        />
      </div>
      <h1>{`Hi, My name is "Ahmed"`}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
        exercitationem incidunt reprehenderit non commodi veritatis pariatur
        illo architecto ipsam dignissimos doloribus repellendus eaque neque
        assumenda voluptatum alias, impedit, soluta deserunt?
      </p>
    </section>
  );
};

export default Hero;
