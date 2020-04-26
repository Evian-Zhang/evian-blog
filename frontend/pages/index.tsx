import Link from 'next/link';

import { Layout, Row, Col, Card, Space } from 'antd';
import { GithubFilled, MailFilled } from '@ant-design/icons';

import MyHead from '../components/head';
import { HomeHeader } from '../components/header';
import InfiniteScroller from '../components/infiniteScroller'

const { Header, Content, Sider } = Layout;

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
                <Header style={{height: "auto"}}>
                    <HomeHeader/>
                </Header>
                <Layout>
                    <Sider
                        style={{width: "20%", zIndex: 4}}
                        breakpoint="lg"
                        collapsedWidth="0"
                        collapsible
                    >
                        <div style={{marginLeft: "20%", color: "white"}}>
                            Evian张的个人博客<br/>
                            联系方式：<br/>
                            <Space direction="vertical">
                                <div style={{width: "100%"}}>
                                    GitHub <a href="https://github.com/Evian-Zhang" rel="noopener noreferrer"><GithubFilled/></a>
                                </div>
                                <div style={{width: "100%"}}>
                                    Gmail <a href="mailto:evianzhang1999@gmail.com"><MailFilled/></a>
                                </div>
                                <div style={{width: "100%"}}>
                                    知乎 <a href="https://www.zhihu.com/people/Evian_Zhang" rel="noopener noreferrer">勥巭炛</a>
                                </div>
                                <div style={{width: "100%"}}>
                                    CSDN <a href="https://me.csdn.net/EvianZhang" rel="noopener noreferrer">EvianZhang</a>
                                </div>
                            </Space>
                        </div>
                    </Sider>
                    <Content>
                        <Row justify="space-around" gutter={24}>
                            <Col {...colResponsiveProps}>
                                <Link href="/writings">
                                    <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                        <Card style={{minHeight: 200, textAlign: "center", zIndex: 3}}>
                                            我的创作
                                        </Card>
                                    </a>
                                </Link>
                            </Col>
                            <Col {...colResponsiveProps}>
                                <Link href="/writings">
                                    <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                        <Card style={{minHeight: 200, textAlign: "center", zIndex: 3}}>
                                            我的创作
                                        </Card>
                                    </a>
                                </Link>
                            </Col>
                            <Col {...colResponsiveProps}>
                                <Link href="/writings">
                                    <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                        <Card style={{minHeight: 200, textAlign: "center", zIndex: 3}}>
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
            </Layout>
        </div>
    );
}

export default Home;