import { AppProps } from 'next/app';

import 'antd/dist/antd.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
};

export default MyApp