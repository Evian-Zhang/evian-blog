import { getArticleTitles, getArticle } from 'api/writings/article-api';
import { Article } from 'interfaces';
import MyHead from 'components/head';
import { WritingsHeader } from 'components/header';
import MyFooter from 'components/footer';
import { IMAGE_BASE_URL } from 'utils/config';

import marked, { Renderer } from 'marked';
import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Layout, Row, Col, Typography, Tag } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

class MyRenderer extends Renderer {
    heading(text, level) {
        return `<h${level}>
    <a name="${text}" class="anchor" href="#${text}">
        ${text}
    </a>
</h${level}>
`;
    }
    image(href, title, text) {
        if (href.startsWith("evian://")) {
            const uuid = href.slice(8);
            const newHref = `${IMAGE_BASE_URL}/${uuid}`;
            return super.image(newHref, title, text);
        } else {
            return super.image(href, title, text);
        }
    }
}

function toHTML(markdown: string) {
    const rawHTML = marked(markdown, {
        renderer: new MyRenderer
    });

    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const html = DOMPurify.sanitize(rawHTML);
    return html;
}

const ArticlePage = (props: { article: Article }) => {
    const { article } = props;

    // remain for next.js web worker
    const [body, setBody] = useState(article.body);
    useEffect(() => {
        
    }, []);

    const mathJaxSetup = `
        MathJax = {
            tex: {
                inlineMath: [['$', '$']]
            }
        };
    `;

    return (
        <div>
            <MyHead title={`${article.title}·创作·Evian张的博客`} keywords={`${article.title},${article.tags.join(',')},software,blog,Evian-Zhang`}/>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/styles/atom-one-dark.min.css"/>
            </Head>
            <Layout>
                <Header style={{height: "auto"}}>
                    <WritingsHeader/>
                </Header>
                <Content>
                    <Row>
                        <Col span={24}>
                            <div style={{width: "100%", textAlign: "center"}}>
                                <Typography>
                                    {article.series && 
                                        <span>
                                            <Link href={`/writings/series/${article.series}`}>
                                                <a rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                                    {article.series}
                                                </a>
                                            </Link>
                                            系列[{article.seriesIndex + 1}]
                                        </span>
                                    }
                                    <Title>
                                        {article.title}
                                    </Title>
                                    <div>
                                        {article.tags.map((tag) => {
                                            return (
                                                <Link
                                                    href={`/writings/tag/${tag}`}
                                                    key={`${article.title}/${tag}`}
                                                >
                                                    <Tag>
                                                        <a
                                                            rel="noopener noreferrer"
                                                            style={{textDecoration: "none"}}
                                                        >
                                                                {tag}
                                                        </a>
                                                    </Tag>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </Typography>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={20}>
                            <div id="article_body" dangerouslySetInnerHTML={{__html: body}}/>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    <MyFooter/>
                </Footer>
            </Layout>
            <style jsx>{`
                #articleBody img {
                    max-width: 80%
                }
            `}</style>
            <script dangerouslySetInnerHTML={{__html: mathJaxSetup}}></script>
            <script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
            <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/highlight.min.js"></script>
            <script>
                hljs.initHighlightingOnLoad();
            </script>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const articleTitles = await getArticleTitles();
    const paths = articleTitles.map(title => ({
        params: {
            articleTitle: title
        }
    }));
    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async context => {
    const articleTitle = context.params.articleTitle as string;
    let article = await getArticle(articleTitle);
    article.body = toHTML(article.body);
    return {
        props: {
            article
        }
    };
};

export default ArticlePage;