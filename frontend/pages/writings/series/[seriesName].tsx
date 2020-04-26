import { getSeries, getArticlesOfSeries, getArticlesCountOfSeries } from '../../../api/series-api';
import { ArticleMeta } from '../../../interfaces';
import MyHead from '../../../components/head';
import DetailPage from '../../../components/detailPage';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

const PAGE_SIZE = 8;

interface SeriesDetailPageProps {
    totalCount: number,
    initialArticleMetas: ArticleMeta[]
}

const SeriesDetailPage = (props: SeriesDetailPageProps) => {
    const router = useRouter();
    const seriesName = router.query.seriesName as string;

    const title = (name: string) => `${name}系列`;

    return (
        <div>
            <MyHead title={`${seriesName}·创作·Evian张的博客`} keywords={`${seriesName},software,blog,Evian-Zhang`}/>
            <DetailPage
                fetcher={getArticlesOfSeries}
                name={seriesName}
                keyName="seriesDetailPage"
                totalCount={props.totalCount}
                initialData={props.initialArticleMetas}
                pageSize={PAGE_SIZE}
                title={title}
            />
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const series = await getSeries();
    const paths = series.map(series => ({
        params: {
            seriesName: series.name
        }
    }));
    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async context => {
    const seriesName = context.params.seriesName as string;
    const totalCount= await getArticlesCountOfSeries(seriesName);
    const initialArticleMetas = await getArticlesOfSeries(seriesName, 0, PAGE_SIZE);
    return {
        props: {
            totalCount,
            initialArticleMetas
        }
    };
};

export default SeriesDetailPage;