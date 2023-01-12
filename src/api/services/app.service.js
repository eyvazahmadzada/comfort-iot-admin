import fetch from '../interceptor';

const appService = {};

appService.login = (data) => {
    return fetch({
        url: '/login',
        method: 'post',
        data
    });
};

appService.verifyToken = (token) => {
    return fetch({
        url: '/verify_token',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

appService.getRooms = (data) => {
    return fetch({
        url: '/rooms',
        method: 'post',
        data
    });
};

appService.getRoom = (roomName) => {
    return fetch({
        url: `/rooms/${roomName}`,
        method: 'get'
    });
};

appService.getAverageValues = () => {
    return fetch({
        url: '/rooms/average_values',
        method: 'get'
    });
};

appService.getAHPImportance = () => {
    return fetch({
        url: '/ahpImportances',
        method: 'get'
    });
};

appService.updateAHPImportance = (data) => {
    return fetch({
        url: '/ahpImportances',
        method: 'put',
        data
    });
};

export default appService;
