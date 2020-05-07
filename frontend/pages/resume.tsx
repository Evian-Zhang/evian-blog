import { getResume } from '../api/resume/resume-api';
import MyHead from '../components/head';
import { ResumeHeader } from '../components/header';
import MyFooter from '../components/footer';
import { IMAGE_BASE_URL } from '../utils/config';

import marked, { Renderer } from 'marked';
import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

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

const ResumePage = (props: { resumeBody: string }) => {
    // remain for next.js web worker
    const [body, setBody] = useState(props.resumeBody);
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
            <MyHead title={`个人简介·Evian张的博客`} keywords={`resume,blog,Evian-Zhang`}/>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/styles/atom-one-dark.min.css"/>
            </Head>
            <Layout>
                <Header style={{height: "auto"}}>
                    <ResumeHeader/>
                </Header>
                <Content>
                    <Row justify="center">
                        <Col span={20}>
                            <div id="resume_body" dangerouslySetInnerHTML={{__html: body}}/>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    <MyFooter/>
                </Footer>
            </Layout>
            <style jsx>{`
                #resumeBody img {
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

export const getStaticProps: GetStaticProps = async context => {
    let resume = await getResume();
    let resumeBody = toHTML(resume);
    return {
        props: {
            resumeBody
        }
    };
};

export default ResumePage;