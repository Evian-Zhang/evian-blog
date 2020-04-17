import Link from 'next/link';

import { Layout, Row, Col, Card } from 'antd'

import MyHead from '../components/head';
import MyHeader from '../components/header';

const { Header, Content } = Layout;

const Home = () => {
    return (
        <div>
            <MyHead title="Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <Layout>
                <Header><MyHeader/></Header>
                <Content>
                    <Row justify="space-around" gutter={8}>
                        <Col span={8}>
                            <Link href="/writings">
                                <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                    <Card style={{minHeight: 300, textAlign: "center"}}>
                                        我的创作
                                    </Card>
                                </a>
                            </Link>
                        </Col>
                        <Col span={8}>
                            <Link href="/writings">
                                <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                    我的创作
                                </a>
                            </Link>
                        </Col>
                        <Col span={8}>
                            <Link href="/writings">
                                <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                    我的创作
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            {/* <Grid container flex-wrap='wrap' justify='space-around'>
                <Grid item xs={3}>
                    <Link href="/writings">
                        <a rel="noopener noreferrer">
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
            </Grid> */}
        </div>
    );
}

export default Home;