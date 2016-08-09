var remote = require('electron').remote;

/**
 * Exposes to the renderer process any used API running on main process
 */

var remoteApi = remote.require('../api/api');

var electronApi = {
    staticData: remoteApi.staticData
};