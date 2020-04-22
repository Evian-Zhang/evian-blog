import Link from 'next/link';

import { Layout, Row, Col, Card } from 'antd';

import MyHead from '../components/head';
import MyHeader from '../components/header';
import InfiniteScroller from '../components/infiniteScroller'

const { Header, Content } = Layout;

const colResponsiveProps = {
    xs: 24,
    sm: 16,
    md: 8,
    lg: 8,
    xl: 8
};

const Home = () => {
    return (
        <div>
            <MyHead title="Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <Layout>
                <Header><MyHeader/></Header>
                <Content>
                    <Row justify="space-around" gutter={24}>
                        <Col {...colResponsiveProps}>
                            <Link href="/writings">
                                <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                    <Card style={{minHeight: 200, textAlign: "center"}}>
                                        我的创作
                                    </Card>
                                </a>
                            </Link>
                        </Col>
                        <Col {...colResponsiveProps}>
                            <Link href="/writings">
                                <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                    <Card style={{minHeight: 200, textAlign: "center"}}>
                                        我的创作
                                    </Card>
                                </a>
                            </Link>
                        </Col>
                        <Col {...colResponsiveProps}>
                            <Link href="/writings">
                                <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                    <Card style={{minHeight: 200, textAlign: "center"}}>
                                        我的创作
                                    </Card>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={20}>
                            <InfiniteScroller/>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    );
}

export default Home;