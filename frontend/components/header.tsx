import { PageHeader, Typography, Button } from 'antd'

import Link from 'next/link'

const {Title} = Typography;

const MyHeader = () => {
    return (
        <div>
            <Link href="/">
                <Button type="link" size="large">
                    Evian张的博客
                </Button>
            </Link>
        </div>
        // <AppBar position="static">
            
        // </AppBar>
    );
};

export default MyHeader;