import MyHead from '../../components/head';
import rootReducer, { RootState, useTypedSelector } from '../../redux/writings/reducers';
import { fetchArticles } from '../../redux/writings/article/articleSlice';
import { selectPageIndex } from '../../redux/writings/article/pageIndexSlice';
import { fetchTags } from '../../redux/writings/tag';
import { fetchSeries } from '../../redux/writings/series';
import { getArticleMetas, getArticlesCount } from '../../api/article-api';
import { ArticleMeta, FetchStatus } from '../../interfaces';
import { ArticleListWithPagination } from '../../components/articleList';
import TagList from '../../components/tagList';
import SeriesList from '../../components/seriesList';
import { WritingsHeader } from '../../components/header';
import MyFooter from '../../components/footer';

import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { GetStaticProps } from 'next';
import Error from 'next/error';
import { Layout, Tabs, Row, Col } from 'antd';
import { useEffect } from 'react';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const PAGE_SIZE = 8;

const ArticlesListTab = () => {
    const selectedPageIndex = useTypedSelector(store => store.article.pageIndex);
    const totalCount = useTypedSelector(store => store.article.articles.totalCount);
    const articlesList = useTypedSelector(store => store.article.articles.articles);

    const selectedArticles = articlesList[selectedPageIndex];

    const dispatch = useDispatch();

    const onChange = (pageIndexPlusOne: number) => {
        const pageIndex = pageIndexPlusOne - 1;
        if (articlesList[pageIndex]?.fetchStatus !== FetchStatus.Success) {
            dispatch(fetchArticles({ pageIndex, pageSize: PAGE_SIZE }));
        }
        dispatch(selectPageIndex(pageIndex));
    };

    const onReload = () => {
        if (articlesList[selectedPageIndex]?.fetchStatus !== FetchStatus.Fetching) {
            dispatch(fetchArticles({ pageIndex: selectedPageIndex, pageSize: PAGE_SIZE }));
        }
    }

    return (
        <ArticleListWithPagination
            datasource={selectedArticles?.articles}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            loading={selectedArticles?.fetchStatus === FetchStatus.Fetching}
            hasError={selectedArticles?.fetchStatus === FetchStatus.Failure}
            onChange={onChange}
            onReload={onReload}
        />
    );
}

const TagsTab = () => {
    const fetchStatus = useTypedSelector(store => store.tag.fetchStatus);
    const tags = useTypedSelector(store => store.tag.tags);

    const dispatch = useDispatch();

    useEffect(() => {
        if (fetchStatus === FetchStatus.Failure) {
            dispatch(fetchTags());
        }
    }, []);

    const onReload = () => {
        if (fetchStatus !== FetchStatus.Fetching) {
            dispatch(fetchTags());
        }
    };

    return (
        <TagList
            fetchStatus={fetchStatus}
            tags={tags}
            onReload={onReload}
        />
    );
};

const SeriesTab = () => {
    const fetchStatus = useTypedSelector(store => store.series.fetchStatus);
    const series = useTypedSelector(store => store.series.series);

    const dispatch = useDispatch();

    useEffect(() => {
        if (fetchStatus === FetchStatus.Failure) {
            dispatch(fetchSeries());
        }
    }, []);

    const onReload = () => {
        if (fetchStatus !== FetchStatus.Fetching){
            dispatch(fetchSeries());
        }
    };

    return (
        <SeriesList
            fetchStatus={fetchStatus}
            series={series}
            onReload={onReload}
        />
    );
}

const Writings = () => {
    return (
        <Layout>
            <MyHead title="我的创作·Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <Header style={{height: "auto"}}>
                <WritingsHeader/>
            </Header>
            <Content>
                <Row justify="center">
                    <Col span={20}>
                        <Tabs defaultActiveKey="articleTab" type="card">
                            <TabPane tab="文章" key="articleTab">
                                <ArticlesListTab/>
                            </TabPane>
                            <TabPane tab="标签" key="tagTab">
                                <TagsTab/>
                            </TabPane>
                            <TabPane tab="系列" key="seriesTab">
                                <SeriesTab/>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Content>
            <Footer>
                <MyFooter/>
            </Footer>
        </Layout>
    );
};

interface WritingsProps {
    errorCode: null | number,
    articlesCount: number,
    articleMetas: ArticleMeta[]
}

const WrappedWritings = (props: WritingsProps) => {
    if (props.errorCode) {
        return <Error statusCode={props.errorCode}/>
    }

    let articles = [];
    articles[0] = {
        fetchStatus: FetchStatus.Success,
        articles: props.articleMetas
    };

    const preloadedState: RootState = {
        article: {
            pageIndex: 0,
            articles: {
                totalCount: props.articlesCount,
                articles
            }
        },
        tag: {
            fetchStatus: FetchStatus.Failure,
            tags: []
        },
        series: {
            fetchStatus: FetchStatus.Failure,
            series: []
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

export const getStaticProps: GetStaticProps = async context => {
    try {
        let articlesCount = await getArticlesCount();
        let articleMetas = await getArticleMetas(0, PAGE_SIZE);
        return {
            props: {
                errorCode: null,
                articlesCount,
                articleMetas
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