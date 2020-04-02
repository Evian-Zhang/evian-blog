import { GetServerSideProps } from 'next'

import MyHead from '../components/head'
import MyHeader from '../components/header'

interface WritingsProps {
    props: {
        pageIndex?: number
    }
}

const Writings = (props: WritingsProps) => {
    console.log(props)
    return (
        <div>
            <MyHead title="我的创作·Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <MyHeader/>

        </div>
    )
};

function isStringArray(value: string | string[]): value is string[] {
    return Array.isArray(value);
}

export const getServerSideProps: GetServerSideProps = async context => {
    let writingsProps: WritingsProps = {
        props: {}
    };
    let pageIndex = context.query.pageIndex;
    if (pageIndex) {
        if (!isStringArray(pageIndex)) {
            let pageIndexInt = parseInt(pageIndex);
            if (!isNaN(pageIndexInt)) {
                writingsProps.props.pageIndex = pageIndexInt;
            }
        };
    }
    return writingsProps;
}

export default Writings;