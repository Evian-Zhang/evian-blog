import { PageHeader, Button } from 'antd';

import Link from 'next/link';

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

export default MyHeader;