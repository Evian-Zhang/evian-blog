import { useState, useEffect } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'

import MyHead from '../components/head';
import { getArticles } from '../api/article-api'

const Home = () => {
    let [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles()
            .then(res => setArticles(res))
    }, []);

    return (
        <div>
            <MyHead title="Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <AppBar>
                <Typography variant="h6">
                    Evian张的博客
                </Typography>
                {articles}
            </AppBar>
            
        </div>
    );
}

export default Home;