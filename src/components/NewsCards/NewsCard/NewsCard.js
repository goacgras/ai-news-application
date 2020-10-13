import React, { useState, useEffect, createRef } from 'react'

import {
    Card, CardActions, CardActionArea,
    CardContent, CardMedia, Button, Typography
} from '@material-ui/core';
import classNames from 'classnames';

import classes from './NewsCard.module.css';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
    const [elRefs, setElrefs] = useState([]);

    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setElrefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if (i === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs]);

    return (
        <Card ref={elRefs[i]} className={classNames(classes.Card, activeArticle === i ? classes.ActiveCard : null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia
                    className={classes.Media}
                    image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'}
                />

                <div className={classes.Details}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="h4">
                        {(new Date(publishedAt)).toDateString()}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="h2">
                        {source.name}
                    </Typography>
                </div>

                <Typography
                    className={classes.Title}
                    gutterBottom
                    variant="h5">{title}
                </Typography>

                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p">
                        {description}
                    </Typography>
                </CardContent>

            </CardActionArea>

            <CardActions className={classes.CardActions}>
                <Button size="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
            </CardActions>

        </Card>
    )
}

export default NewsCard
