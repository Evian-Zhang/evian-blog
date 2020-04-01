import { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Link from 'next/link'

import MyHead from '../components/head';

const useStyles = makeStyles({
    a: {
        textDecoration: "none"
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
            <Grid container flex-wrap='wrap' justify='space-around'>
                <Grid item xs={3}>
                    <Link href="/writings">
                        <a className={classes.a} rel="noopener noreferrer">
                            <Card>
                                <CardContent>
                                    <Typography align='center' variant='h6'>
                                        我的创作
                                    </Typography>
                                </CardContent>
                            </Card>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography align='center' variant='h6'>
                                我的程序
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography align='center' variant='h6'>
                                我的简历
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;