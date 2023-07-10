const initialState = {
    devices: [],
    metrics: [],
    stats: {}
};

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DEVICES':
            return {
                ...state,
                devices: action.payload,
            };
        case 'LOAD_STATS':
            return {
                ...state,
                stats: action.payload,
            };
        case 'LOAD_METRICS':
            return {
                ...state,
                metrics: action.payload,
            };
        case 'CLEAR_STATS':
            return {
                ...state,
                stats: {},
            };
        case 'CLEAR_METRICS':
            return {
                ...state,
                metrics: [],
            };
        default:
            return state;
    }
};

export default deviceReducer;
