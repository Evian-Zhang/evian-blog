import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'

import MyHead from '../components/head';

const Home = () => {
    return (
        <div>
            <MyHead title="Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <AppBar>
                <Typography variant="h6">
                    Evian张的博客
                </Typography>
            </AppBar>
        </div>
    );
}

export default Home;