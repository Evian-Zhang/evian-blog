import { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { GetServerSideProps } from 'next'

import MyHead from '../components/head';
import { getArticles } from '../api/article-api'

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        // minHeight: '100'
    }
});

const Home = () => {
    const classes = useStyles();

    return (
        <div>
            <MyHead title="Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <AppBar position="static">
                <Typography variant="h6">
                    Evian张的博客
                </Typography>
            </AppBar>
            <Grid container justify='center'>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography align='center' variant='h6'>
                                Hello<br/>There
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;