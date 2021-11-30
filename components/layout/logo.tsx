import React from 'react';
import classes from './logo.module.css';

interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
  return <div className={classes.logo}>{`Ahmed' Next Blog`}</div>;
};

export default Logo;
