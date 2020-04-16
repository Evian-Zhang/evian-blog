import ActionType from '../actionType'

const setPageIndex = (page_index: number) => {
    return {
        type: ActionType.PageIndex,
        payload: page_index
    };
};

export default {setPageIndex};