import { Series, FetchStatus } from '../interfaces';

import Link from 'next/link';
import { List, Row, Col, Button, Spin, Divider } from 'antd';

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

const SeriesListItem = (props: { series: Series }) => {
    return (
        <Row>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{overflowX: "auto"}}>
                <Link href={`/writings/series/${props.series.name}`}>
                    <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                        {props.series.name}
                    </a>
                </Link>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6} xl={6} style={{overflowX: "auto"}}>
                共{props.series.articleCount}篇文章
            </Col>
            <Col xs={24} sm={12} md={6} lg={6} xl={6} style={{overflowX: "auto"}}>
                最后更新于{new Date(props.series.lastReviseDate * 1000).toLocaleDateString()}
            </Col>
        </Row>
    );
}

const SeriesList = (props: { series: Series[] }) => {
    return (
        <List
            dataSource={props.series}
            renderItem={(series) => {
                return (
                    <div>
                        <SeriesListItem series={series}/>
                        <Divider/>
                    </div>
                );
            }}
        />
    );
};

interface SeriesListProps {
    fetchStatus: FetchStatus,
    series: Series[],
    onReload: () => void
}

const SeriesListPage = (props: SeriesListProps) => {
    switch (props.fetchStatus) {
        case FetchStatus.Success: return <SeriesList series={props.series}/>;
        case FetchStatus.Fetching: return <LoadingPage/>;
        case FetchStatus.Failure: return <ErrorPage onReload={props.onReload}/>;
    }
};

export default SeriesListPage;