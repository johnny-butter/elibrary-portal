import { AlertColor } from '@mui/material';

import'moment-timezone';
import moment from 'moment';

interface notifyKwargs {
  severity?: AlertColor
  setNotifySeverity?: React.Dispatch<React.SetStateAction<AlertColor>>
}

export const notify = (
  content: string,
  setNotifyMsg: React.Dispatch<React.SetStateAction<string>>,
  setNotifyOpen: React.Dispatch<React.SetStateAction<boolean>>,
  kwargs?: notifyKwargs,
): void => {
  setNotifyMsg(content);
  setNotifyOpen(true);

  if (kwargs && kwargs.setNotifySeverity) {
    kwargs.setNotifySeverity(kwargs.severity || 'error');
  }
}

export const notifyApiErr = (
  body: any,
  setNotifyMsg: React.Dispatch<React.SetStateAction<string>>,
  setNotifyOpen: React.Dispatch<React.SetStateAction<boolean>>,
  notifyKwargs?: notifyKwargs
): Promise<any> => {
  return Promise.resolve(body)
    .then((respBody) => {
      notify(respBody['error_message'], setNotifyMsg, setNotifyOpen, notifyKwargs);
    });
}

export const convLocalTimeStr = (timeStr: string, timeFormat: string): string => {
  return moment(timeStr).tz(moment.tz.guess()).format(timeFormat);
}
