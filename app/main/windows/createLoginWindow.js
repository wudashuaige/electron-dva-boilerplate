import { BrowserWindow } from 'electron'
import { loginWinOptions } from '../config/win.conf.js'

export default function createLoginWindow(wm) {
  const loginWindow = new BrowserWindow(loginWinOptions)
  loginWindow.loadURL(`${global.appFilePath}#login`)

  wm.add('loginWindow', loginWindow)

  loginWindow.webContents.on('did-finish-load', () => {
    if (!loginWindow) {
      throw new Error('"loginWindow" is not defined');
    }
    loginWindow && loginWindow.show();
    loginWindow && loginWindow.focus();
  });

  loginWindow.on('closed', () => {
    wm.close('loginWindow')
    if (!wm.get('mainWindow')) {
      global.confWindowShouldClose = true
      wm.close('confWindow')
    }
  });

  return loginWindow
}
