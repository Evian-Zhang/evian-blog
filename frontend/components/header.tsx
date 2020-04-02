import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Link from 'next/link'

const useStyles = makeStyles({
    a: {
        textDecoration: "none",
        color: "inherit"
    }
});

const MyHeader = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Link href="/">
                <a rel="noopener noreferrer" className={classes.a}>
                    <Typography variant="h6">
                        Evian张的博客
                    </Typography>
                </a>
            </Link>
        </AppBar>
    );
};

export default MyHeader;