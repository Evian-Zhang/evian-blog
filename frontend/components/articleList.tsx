import { ArticleMeta } from '../interfaces';

import Link from 'next/link';
import { List, Button, Pagination, Row, Col, Tag, Divider } from 'antd';

const colResponsiveProps = {
    xs: 24,
    sm: 16,
    md: 8,
    lg: 8,
    xl: 8
};

const ArticleListItem = (props: { articleMeta: ArticleMeta }) => {
    const { articleMeta } = props;
    const lastReviseDate = new Date(articleMeta.lastReviseDate * 1000);
    return (
        <div>
            <Row>
                <Col {...colResponsiveProps} style={{overflowX: "auto"}}>
                    <Link href={`/writings/article/${articleMeta.title}`}>
                        <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                            {articleMeta.title}
                        </a>
                    </Link>
                </Col>
                <Col {...colResponsiveProps} style={{overflowX: "auto"}}>
                    {articleMeta.series && 
                    <span>
                        <Link href={`/writings/series/${articleMeta.series}`}>
                            <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                {articleMeta.series}
                            </a>
                        </Link>
                        系列
                    </span>}
                </Col>
                <Col {...colResponsiveProps}>
                    最后更新于{lastReviseDate.toLocaleDateString()}
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{overflowX: "auto"}}>
                    {articleMeta.tags.map((tag) => {
                        return (
                            <Link href={`/writings/tag/${tag}`}>
                                <Tag>
                                    <a
                                        rel="noopener noreferrer"
                                        style={{textDecoration: "none"}}
                                        key={`${articleMeta.title}/${tag}`}
                                    >
                                            {tag}
                                    </a>
                                </Tag>
                            </Link>
                        );
                    })}
                </Col>
            </Row>
        </div>
    );
};

const ErrorPage = (props: { onReload: () => void }) => {
    return (
        <div style={{textAlign: "center", width: "100%"}}>
            数据请求错误，请<Button type="link" onClick={props.onReload}>重试</Button>
        </div>
    );
};

interface ArticleListProps {
    datasource: ArticleMeta[],
    totalCount: number,
    pageSize: number,
    loading: boolean,
    hasError: boolean,
    onChange: (page: number, pageSize?: number) => void,
    onReload: () => void,
}

const ITEM_HEIGHT = 100;

const ArticleList = (props: ArticleListProps) => {
    return (
        <div>
            {props.hasError ?
                <ErrorPage onReload={props.onReload}/> :
                    <List
                        dataSource={props.datasource}
                        renderItem={(articleMeta) => {
                            return (
                                <div>
                                    <ArticleListItem articleMeta={articleMeta}/>
                                    <Divider/>
                                </div>
                            );
                        }}
                        loading={props.loading}
                    />}
            <Pagination
                defaultPageSize={props.pageSize}
                total={props.totalCount}
                hideOnSinglePage
                showQuickJumper
                showSizeChanger={false}
                onChange={props.onChange}
            />
        </div>
    );
}

export default ArticleList;