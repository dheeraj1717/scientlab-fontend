import { getAllDevices, getDeviceStats, getChartMetrics } from '../../services/DashboardService';

export const getDevices = (token) => {
    return async (dispatch) => {
        const devices = await getAllDevices(token)
        dispatch(loadDevices(devices));

    };
}

export const getStats = (device, location, token) => {
    return (dispatch) => {
        getDeviceStats(device, location, token).then(stats => {
            dispatch(loadStats(stats));
        })
    };
}

export const getMetrics = (request, token, type) => {
    return (dispatch) => {
        getChartMetrics(request, token, type).then(metrics => {
            dispatch(loadMetrics(metrics));
        })
    };
}

export const loadDevices = (data) => {
    return {
        type: 'LOAD_DEVICES',
        payload: data,
    };
};

export const loadStats = (data) => {
    return {
        type: 'LOAD_STATS',
        payload: data,
    };
};

export const loadMetrics = (data) => {
    return {
        type: 'LOAD_METRICS',
        payload: data,
    };
};

export const clearStats = () => {
    return {
        type: 'CLEAR_STATS'
    };
};

export const clearMetrics = () => {
    return {
        type: 'CLEAR_METRICS'
    };
};