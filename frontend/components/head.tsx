import Head from 'next/head'

interface MyHeadProps {
    title: string,
    keywords: string
}

const MyHead = (props: MyHeadProps) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="keywords" content={props.keywords} />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <link rel="stylesheet" href="https://fonts.lug.ustc.edu.cn/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
    );
};

export default MyHead;