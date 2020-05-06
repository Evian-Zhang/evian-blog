import { getArticlesOfTag, getArticlesCountOfTag } from '../../../api/tag-api';
import { ArticleMeta } from '../../../interfaces';
import MyHead from '../../../components/head';
import DetailPage from '../../../components/detailPage';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const PAGE_SIZE = 8;

interface TagDetailPageProps {
    totalCount: number,
    initialArticleMetas: ArticleMeta[]
}

const TagDetailPage = (props: TagDetailPageProps) => {
    const router = useRouter();
    const tagName = router.query.tagName as string;

    const title = (name: string) => name;

    return (
        <div>
            <MyHead title={`${tagName}·创作·Evian张的博客`} keywords={`${tagName},software,blog,Evian-Zhang`}/>
            <DetailPage
                fetcher={getArticlesOfTag}
                name={tagName}
                keyName="tagDetailPage"
                totalCount={props.totalCount}
                initialData={props.initialArticleMetas}
                pageSize={PAGE_SIZE}
                title={title}
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const tagName = context.params.tagName as string;
    const totalCount = await getArticlesCountOfTag(tagName);
    const initialArticleMetas = await getArticlesOfTag(tagName, 0, PAGE_SIZE);
    return {
        props: {
            totalCount,
            initialArticleMetas
        }
    };
};

export default TagDetailPage;