import { Tag, FetchStatus } from 'interfaces';

import Link from 'next/link';
import { Row, Col, Button, Spin, Card } from 'antd';

const ErrorPage = (props: { onReload: () => void }) => {
    return (
        <div style={{width: "100%", textAlign: "center"}}>
            数据请求错误，请<Button type="link" onClick={props.onReload}>重试</Button>
        </div>
    );
};

const LoadingPage = () => {
    return (
        <div style={{width: "100%", textAlign: "center"}}>
            <Spin size="large"/>
        </div>
    );
};

const colResponsiveProps = {
    xs: 24,
    sm: 16,
    md: 8,
    lg: 8,
    xl: 8
};

const TagList = (props: { tags: Tag[] }) => {
    return (
        <Row justify="space-around" gutter={[24, 24]}>
            {
                props.tags.map(tag => {
                    return (
                        <Col {...colResponsiveProps} key={tag.name}>
                            <Card
                                title={
                                    <Link href={`/writings/tag/${tag.name}`}>
                                        <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                            {tag.name}
                                        </a>
                                    </Link>
                                }
                                style={{height: 200}}
                            >
                                <div style={{overflowY: "scroll"}}>
                                    共{tag.articleCount}篇文章<br/>
                                    最后更新于{new Date(tag.lastReviseDate * 1000).toLocaleDateString()}
                                </div>
                            </Card>
                        </Col>
                    );
                })
            }
        </Row>
    );
};

interface TagListProps {
    fetchStatus: FetchStatus,
    tags: Tag[],
    onReload: () => void
}

const TagListPage = (props: TagListProps) => {
    switch (props.fetchStatus) {
        case FetchStatus.Success: return <TagList tags={props.tags}/>;
        case FetchStatus.Fetching: return <LoadingPage/>;
        case FetchStatus.Failure: return <ErrorPage onReload={props.onReload}/>;
    }
};

export default TagListPage;