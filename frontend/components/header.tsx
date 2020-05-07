import { PageHeader, Button } from 'antd';

import Link from 'next/link';

const HomeHeader = () => {
    return (
        <PageHeader
            title={
                <Link href="/">
                    <Button type="link" size="large">
                        Evian张的博客
                    </Button>
                </Link>
            }
        />
    );
}

const WritingsHeader = () => {
    return (
        <PageHeader
            title={
                <Link href="/">
                    <Button type="link" size="large">
                        Evian张的博客
                    </Button>
                </Link>
            }
            subTitle={
                <Link href="/writings">
                    <Button type="link">
                        我的创作
                    </Button>
                </Link>
            }
        />
    );
};

const ProjectsHeader = () => {
    return (
        <PageHeader
            title={
                <Link href="/">
                    <Button type="link" size="large">
                        Evian张的博客
                    </Button>
                </Link>
            }
            subTitle={
                <Link href="/projects">
                    <Button type="link">
                        我的编程
                    </Button>
                </Link>
            }
        />
    );
}

const ResumeHeader = () => {
    return (
        <PageHeader
            title={
                <Link href="/">
                    <Button type="link" size="large">
                        Evian张的博客
                    </Button>
                </Link>
            }
            subTitle={
                <Link href="/resume">
                    <Button type="link">
                        个人介绍
                    </Button>
                </Link>
            }
        />
    );
}

const MyHeader = () => {
    return (
        <div>
            <PageHeader
                title={
                    <Link href="/">
                        <Button type="link" size="large">
                            Evian张的博客
                        </Button>
                    </Link>
                }
            />
        </div>
    );
};

export { HomeHeader, WritingsHeader, ProjectsHeader, ResumeHeader };

export default MyHeader;