import { AppProps } from 'next/app';

import 'antd/dist/antd.css';

export function reportWebVitals(metric) {
    console.log(metric);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
};

export default MyApp;