import { ArticleMetasWithPagination } from "../interfaces";
import { WritingsHeader } from '../components/header';
import MyHead from '../components/head';
import { ArticleListWithPagination } from '../components/articleList';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Layout, Row, Col, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

interface DetailPageProps {
    fetcher: (name: string, pageIndex: number, pageSize: number) => Promise<ArticleMetasWithPagination>,
    name: string,
    initialData: ArticleMetasWithPagination,
    keyName: string,
    pageSize: number,
    title: (name: string) => string
}

const DetailPage = (props: DetailPageProps) => {
    const [pageIndex, setPageIndex] = useState(0);

    let initialData = null;
    if (pageIndex === 0) {
        initialData = props.initialData;
    }

    const { data, error, isValidating } = useSWR(
        [props.keyName, props.name, pageIndex, props.pageSize],
        (_, keyName: string, pageIndex: number, pageSize: number) => {
            return props.fetcher(keyName, pageIndex, pageSize);
        },
        {
            initialData,
            shouldRetryOnError: false
        }
    );

    let [articleMetas, totalCount] = [[], 0];
    if (data) {
        let articleMetasWithPagination = data as ArticleMetasWithPagination;
        articleMetas = articleMetasWithPagination.articleMetas;
        totalCount = articleMetasWithPagination.totalCount;
    }

    const onChange = (pageIndex: number) => {
        setPageIndex(pageIndex);
    };

    const onReload = () => {
        mutate([props.keyName, props.name, pageIndex, props.pageSize]);
    };

    return (
        <div>
            <MyHead title={`${props.name}·创作·Evian张的博客`} keywords={`${props.name},software,blog,Evian-Zhang`}/>
            <Layout>
                <Header style={{height: "auto"}}>
                    <WritingsHeader/>
                </Header>
                <Content>
                    <Row>
                        <Col span={24}>
                            <div style={{width: "100%", textAlign: "center"}}>
                                <Typography>
                                    <Title>
                                        {props.title(props.name)}
                                    </Title>
                                </Typography>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={20}>
                            <ArticleListWithPagination
                                datasource={articleMetas}
                                totalCount={totalCount}
                                pageSize={props.pageSize}
                                loading={data === undefined || isValidating}
                                hasError={error !== undefined}
                                onChange={onChange}
                                onReload={onReload}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    );
};

export default DetailPage;