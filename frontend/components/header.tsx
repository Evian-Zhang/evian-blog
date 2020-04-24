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

export { HomeHeader, WritingsHeader };

export default MyHeader;