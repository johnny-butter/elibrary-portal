import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookie } from 'react-use';

import queryString from 'query-string';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { ApiError, UsersService } from '../services/elibraryAPI';

import { Notifybar } from '../components';

import { notifyApiErr } from '../utils';

enum oauthAction {
  register = 'register',
  login = 'login',
}

const { usersApiAuth, usersApiCreateUser } = UsersService;

export const OauthCallback = (): JSX.Element => {
  const history = useHistory();

  const [notifyMsg, setNotifyMsg] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);

  const [, updateToken, ] = useCookie('token');

  const queryParams = queryString.parse(window.location.search);
  const oauthState = queryParams.state?.toString().split(',');

  useEffect(() => {
    switch (oauthState?.[1].toString()) {
      case oauthAction.register:
        usersApiCreateUser({oauth_type: oauthState?.[0].toString(), oauth_code: queryParams.code?.toString()})
          .then((authOut) => {
            updateToken(authOut.token);
          })
          .catch((err: ApiError) => {
            notifyApiErr(err.body, setNotifyMsg, setNotifyOpen);
          })
          .finally(() => {setTimeout(() => {history.push('/');}, 5000)});
        break;
      case oauthAction.login:
        usersApiAuth({oauth_type: oauthState?.[0].toString(), oauth_code: queryParams.code?.toString()})
          .then((authOut) => {
            updateToken(authOut.token);
          })
          .catch((err: ApiError) => {
            notifyApiErr(err.body, setNotifyMsg, setNotifyOpen);
          })
          .finally(() => {setTimeout(() => {history.push('/');}, 5000)});
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Notifybar severity='error' content={notifyMsg} open={notifyOpen} setOpen={setNotifyOpen} />
      <Box sx={{ width: '100%', paddingTop: '30%' }}>
        <LinearProgress />
      </Box>
    </>
  );
}
