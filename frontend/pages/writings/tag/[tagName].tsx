import { getTags, getArticlesOfTag } from '../../../api/tag-api';
import { ArticleMetasWithPagination } from '../../../interfaces';
import MyHead from '../../../components/head';
import DetailPage from '../../../components/detailPage';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

const PAGE_SIZE = 8;

interface TagDetailPageProps {
    initialArticleMetasWithPagination: ArticleMetasWithPagination
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
                initialData={props.initialArticleMetasWithPagination}
                pageSize={PAGE_SIZE}
                title={title}
            />
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const tags = await getTags();
    const paths = tags.map(tag => ({
        params: {
            tagName: tag.name
        }
    }));
    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async context => {
    const tagName = context.params.tagName as string;
    const initialArticleMetasWithPagination = await getArticlesOfTag(tagName, 0, PAGE_SIZE);
    return {
        props: {
            initialArticleMetasWithPagination
        }
    };
};

export default TagDetailPage;