import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

// import grasNewsLogo from './assets/image/logo.png';
import NewsCards from './components/NewsCards/NewsCards';

// import classes from './App.module.css';
// import useStyles from './styles';

const App = () => {
  const alanKey = '041cb5706562934b55d80f32c3fe91702e956eca572e1d8b807a3e2338fdd0dc/stage';
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  // const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
      }
    });
  }, []);

  return (
    <div>
      <h1>Gras messenger</h1>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
