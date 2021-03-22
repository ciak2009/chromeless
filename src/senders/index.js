/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const enqueueRequestRestartSnackbar = () => window.ipcRenderer.emit('enqueue-request-restart-snackbar');

export const requestOpenInBrowser = (url) => window.ipcRenderer.send('request-open-in-browser', url);
export const requestShowMessageBox = (message, type) => window.ipcRenderer.send('request-show-message-box', message, type);
export const requestQuit = () => window.ipcRenderer.send('request-quit');
export const requestCheckForUpdates = (isSilent) => window.ipcRenderer.send('request-check-for-updates', isSilent);
export const requestShowAppMenu = (x, y) => window.ipcRenderer.send('request-show-app-menu', x, y);
export const requestRestart = () => window.ipcRenderer.send('request-restart');

// Preferences
export const getPreference = (name) => window.ipcRenderer.sendSync('get-preference', name);
export const getPreferences = () => window.ipcRenderer.sendSync('get-preferences');
export const requestSetPreference = (name, value) => window.ipcRenderer.send('request-set-preference', name, value);
export const requestResetPreferences = () => window.ipcRenderer.send('request-reset-preferences');
export const requestOpenInstallLocation = () => window.ipcRenderer.send('request-open-install-location');

// System Preferences
export const getSystemPreference = (name) => window.ipcRenderer.sendSync('get-system-preference', name);
export const getSystemPreferences = () => window.ipcRenderer.sendSync('get-system-preferences');
export const requestSetSystemPreference = (name, value) => window.ipcRenderer.send('request-set-system-preference', name, value);

// App Management
export const requestGetInstalledApps = () => window.ipcRenderer.send('request-get-installed-apps');
export const requestInstallApp = (engine, id, name, url, icon, opts) => window.ipcRenderer.send('request-install-app', engine, id, name, url, icon, opts);
export const requestUpdateApp = (engine, id, name, url, icon, opts) => window.ipcRenderer.send('request-update-app', engine, id, name, url, icon, opts);
export const requestCancelInstallApp = (id) => window.ipcRenderer.send('request-cancel-install-app', id);
export const requestCancelUpdateApp = (id) => window.ipcRenderer.send('request-cancel-update-app', id);
export const requestUninstallApp = (id, name, engine) => {
  window.ipcRenderer.send('request-uninstall-app', id, name, engine);
};
export const requestOpenApp = (id, name) => window.ipcRenderer.send('request-open-app', id, name);

// Native Theme
export const getShouldUseDarkColors = () => window.ipcRenderer.sendSync('get-should-use-dark-colors');
