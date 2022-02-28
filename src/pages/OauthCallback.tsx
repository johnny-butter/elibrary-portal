import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookie } from 'react-use';

import queryString from 'query-string';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { ApiError, UsersService } from '../services/elibraryAPI';

const { usersApiAuth, usersApiCreateUser } = UsersService;

export const OauthCallback = (): JSX.Element => {
  const history = useHistory();

  const [, updateToken, ] = useCookie('token');

  const queryParams = queryString.parse(window.location.search);
  const oauthState = queryParams.state?.toString().split(',');

  useEffect(() => {
    switch (oauthState?.[1].toString()) {
      case 'register':
        usersApiCreateUser({oauth_type: oauthState?.[0].toString(), oauth_code: queryParams.code?.toString()})
          .then((authOut) => {
            updateToken(authOut.token);

            history.push('/');
          })
          .catch((err: ApiError) => console.error(err));
        break;
      case 'login':
        usersApiAuth({oauth_type: oauthState?.[0].toString(), oauth_code: queryParams.code?.toString()})
          .then((authOut) => {
            updateToken(authOut.token);

            history.push('/');
          })
          .catch((err: ApiError) => console.error(err));
        break;
    }
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
}
