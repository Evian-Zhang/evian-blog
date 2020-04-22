import MyHead from '../components/head';
import rootReducer, { RootState, useTypedSelector } from '../redux/writings/reducers';
import { FetchStatus, fetchArticles } from '../redux/writings/article/articleSlice';
import { selectPageIndex } from '../redux/writings/article/pageIndexSlice';
import { getArticleMetas } from '../api/article-api';
import { ArticleMetasWithPagination } from '../interfaces';

import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Error from 'next/error';
import { Layout, Tabs, Row, Col, PageHeader, Button, List, Pagination } from 'antd';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const PAGE_SIZE = 1;

const ArticlesList = () => {
    const selectedPageIndex = useTypedSelector(store => store.article.pageIndex);
    const totalCount = useTypedSelector(store => store.article.articles.totalCount);
    const fetchStatus = useTypedSelector(store => store.article.articles.articles[selectedPageIndex].fetchStatus);
    const articles = useTypedSelector(store => store.article.articles.articles[selectedPageIndex].articles);

    const dispatch = useDispatch();

    const onChange = (pageIndexPlusOne: number) => {
        const pageIndex = pageIndexPlusOne - 1;
        dispatch(fetchArticles({ pageIndex, pageSize: PAGE_SIZE }));
        dispatch(selectPageIndex(pageIndex));
    };

    return (
        <div>
            <List
                dataSource={articles}
                renderItem={(item, index) => {
                    return (
                        <div>
                            {JSON.stringify(item)}
                        </div>
                    );
                }}
                loading={fetchStatus === FetchStatus.Fetching}
                pagination={{
                    defaultPageSize: PAGE_SIZE,
                    total: totalCount,
                    hideOnSinglePage: true,
                    showQuickJumper: true,
                    showSizeChanger: false,
                    onChange: onChange
                }}
            />
        </div>
    );
}

const Writings = () => {
    return (
        <div>
            <MyHead title="我的创作·Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <Header style={{height: "auto"}}>
                <PageHeader
                    title={
                        <Link href="/">
                            <Button type="link" size="large">
                                Evian张的博客
                            </Button>
                        </Link>
                    }
                    subTitle="我的创作"
                />
            </Header>
            <Content>
                <Row justify="center">
                    <Col span={20}>
                        <Tabs defaultActiveKey="articleTab" type="card">
                            <TabPane tab="文章" key="articleTab">
                                <ArticlesList/>
                            </TabPane>
                            <TabPane tab="标签" key="tagTab">
                                Tag Tab
                            </TabPane>
                            <TabPane tab="系列" key="seriesTab">
                                Series Tab
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Content>
        </div>
    );
};

interface WritingsProps {
    errorCode: null | number
    articleMetasWithPagination: ArticleMetasWithPagination
}

const WrappedWritings = (props: WritingsProps) => {
    if (props.errorCode) {
        return <Error statusCode={props.errorCode}/>
    }

    let articles = [];
    articles[0] = {
        fetchStatus: FetchStatus.Success,
        articles: props.articleMetasWithPagination.articleMetas
    };

    const preloadedState: RootState = {
        article: {
            pageIndex: 0,
            articles: {
                totalCount: props.articleMetasWithPagination.totalCount,
                articles
            }
        }
    };

    const store = configureStore({
        reducer: rootReducer,
        preloadedState
    });
    return (
        <Provider store={store}>
            <Writings/>
        </Provider>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    try {
        let articleMetasWithPagination = await getArticleMetas(0, PAGE_SIZE);
        return {
            props: {
                errorCode: null,
                articleMetasWithPagination
            }
        };
    } catch (errorCode) {
        if (typeof errorCode === "number") {
            return {
                props: {
                    errorCode
                }
            };
        } else {
            console.log(errorCode);
            return {
                props: {
                    errorCode: 404
                }
            };
        }
    }
};

export default WrappedWritings;