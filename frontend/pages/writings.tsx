import MyHead from '../components/head';
import MyHeader from '../components/header';
import rootReducer, { RootState, useTypedSelector } from '../redux/writings/reducers';
import { getArticleMetas } from '../api/article-api';
import { ArticleMetasWithPagination } from '../interfaces';

import { createStore } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { isNumber } from 'util';

const PAGE_SIZE = 20;

const Writings = () => {
    const dispatch = useDispatch();
    const pageIndex = useTypedSelector(store => store.pageIndex);
    const articleMetas = useTypedSelector(store => store.articleMetas);
    return (
        <div>
            <MyHead title="我的创作·Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <MyHeader/>

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
    const preloadedState = {
        articleMetas: props.articleMetasWithPagination
    };
    const store = createStore(rootReducer, preloadedState);
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
        if (isNumber(errorCode)) {
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