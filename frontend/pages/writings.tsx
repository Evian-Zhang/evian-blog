import MyHead from '../components/head'
import MyHeader from '../components/header'
import rootReducer, { RootState, useTypedSelector } from '../redux/writings/reducers'

import { createStore } from 'redux'
import { Provider, useDispatch } from 'react-redux'

const PAGE_SIZE = 20;

const Writings = () => {
    const dispatch = useDispatch();
    const pageIndex = useTypedSelector(store => store.pageIndex);
    return (
        <div>
            <MyHead title="我的创作·Evian张的博客" keywords="software,blog,Evian-Zhang" />
            <MyHeader/>

        </div>
    );
};

const WrappedWritings = () => {
    const store = createStore(rootReducer);
    return (
        <Provider store={store}>
            <Writings/>
        </Provider>
    );
};

export default WrappedWritings;