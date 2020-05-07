import { Project } from '../interfaces';
import { ProjectsHeader } from '../components/header';
import MyFooter from '../components/footer';
import MyHead from '../components/head';
import { getProjects } from '../api/projects/project-api';

import { Layout, Row, Col, Card } from 'antd';
import { GetStaticProps } from 'next';

const { Header, Content, Footer } = Layout;

const colResponsiveProps = {
    xs: 24,
    sm: 16,
    md: 8,
    lg: 8,
    xl: 8
};

const ProjectList = (props: { projects: Project[] }) => {
    return (
        <Row justify="space-around" gutter={[24, 24]}>
            {
                props.projects.map(project => {
                    return (
                        <Col {...colResponsiveProps} key={project.name}>
                            <Card
                                title={
                                    <a rel="noopener noreferrer" style={{textDecoration: "none"}} href={project.url}>
                                        {project.name}
                                    </a>}
                                style={{height: 200}}
                            >
                                <div style={{overflowY: "scroll"}}>
                                    {project.description}<br />
                                    {project.languages.length > 0 && 
                                        <div>
                                            编程语言：{project.languages.join(', ')}
                                        </div>
                                    }
                                    {project.frameworks.length > 0 && 
                                        <div>
                                            框架：{project.frameworks.join(', ')}
                                        </div>
                                    }
                                </div>
                            </Card>
                        </Col>
                    );
                })
            }
        </Row>
    );
};

interface ProjectPageProps {
    projects: Project[]
}

const ProjectPage = (props: ProjectPageProps) => {
    return (
        <Layout>
            <MyHead title="我的编程·Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <Header style={{height: "auto"}}>
                <ProjectsHeader/>
            </Header>
            <Content>
                <Row justify="center">
                    <Col span={20}>
                        <ProjectList projects={props.projects}/>
                    </Col>
                </Row>
            </Content>
            <Footer>
                <MyFooter/>
            </Footer>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async context => {
    const projects = await getProjects();
    return {
        props: {
            projects
        }
    }
};

export default ProjectPage;