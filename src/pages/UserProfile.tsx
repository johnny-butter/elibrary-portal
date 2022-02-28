import React, { useState, useEffect } from 'react';
import { useCookie } from 'react-use';
import { useHistory } from 'react-router-dom';

import { ApiError, UsersService, UserIn, UserOut, AuthOut } from '../services/elibraryAPI';

import { Page } from './Page'

import {
  Paper,
  Stack,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from '@mui/material';

import { Google, Facebook } from '@mui/icons-material'

const { usersApiGetUser, usersApiUpdateUser, usersApiCreateUser } = UsersService;

// Scope: https://developers.google.com/people/v1/how-tos/authorizing#profile-scopes
const googleOauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
let googleOauthParams = googleOauthUrl.searchParams;
googleOauthParams.append('client_id', process.env.REACT_APP_OAUTH_GOOGLE_CLIENT_ID || '');
googleOauthParams.append('redirect_uri', process.env.REACT_APP_OAUTH_REDIRECT_URI || '');
googleOauthParams.append('response_type', 'code');
googleOauthParams.append('scope', 'profile email');
googleOauthParams.append('state', 'google,register');

// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
const fbOauthUrl = new URL('https://www.facebook.com/v13.0/dialog/oauth');
let fbOauthParams = fbOauthUrl.searchParams;
fbOauthParams.append('client_id', process.env.REACT_APP_OAUTH_FB_CLIENT_ID || '');
fbOauthParams.append('redirect_uri', process.env.REACT_APP_OAUTH_REDIRECT_URI || '');
fbOauthParams.append('scope', 'public_profile,email');
fbOauthParams.append('state', 'fb,register');

export const UserProfile = (): JSX.Element => {
  const history = useHistory();
  const [token, updateToken,] = useCookie('token');

  const [user, setUser] = useState({} as UserOut);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [password2, setPassword2] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    usersApiGetUser()
      .then((u: UserOut) => {
        setUser(u);
        setUsername(u.username);
        setEmail(u.email);
      })
      .catch((err: ApiError) => console.error(err))
  }, []);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handlePwd2Change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword2(event.target.value);
  };

  const handleUpdateProfile = (): void => {
    if (!email) {
      alert('email can not be empty!');
      return;
    }

    let userIn: UserIn = {
      username: username,
      email: email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_staff: user.is_staff,
      password: '',
    };

    if (password && password === password2) {
      userIn.password = password;
    };

    usersApiUpdateUser(userIn)
    .then((u: UserOut) => {
      window.location.reload();
    })
    .catch((err: ApiError) => console.error(err));
  };

  const handleCreateUser = (): void => {
    if (!password) {
      alert('Password is invalid, please check!');
      return;
    }

    if (password !== password2) {
      alert('Password is invalid, please check!');
      return;
    };

    usersApiCreateUser({username: username, password: password, email: email === null ? undefined : email})
      .then((resp: AuthOut) => {
        updateToken(resp.token);
        history.push('/');
      })
      .catch((err: ApiError) => console.error(err))
  }

  let actionRow: JSX.Element;

  if (token) {
    actionRow = (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">
          <Button variant="contained" onClick={handleUpdateProfile} >UPDATE</Button>
        </TableCell>
      </TableRow>
    )
  } else {
    actionRow = (
      <React.Fragment>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="center">
            <Button variant="contained" onClick={handleCreateUser} >REGISTER</Button>
          </TableCell>
        </TableRow>
        <Divider>OR</Divider>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="center">
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                aria-label="google-login"
                variant="outlined"
                href={googleOauthUrl.href}
                startIcon={<Google />}>
              </Button>
              <Button
                aria-label="fb-login"
                variant="outlined"
                href={fbOauthUrl.href}
                startIcon={<Facebook />} >
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  };

  const userProfile = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="profile">
        <TableHead>
          <TableRow>
            <TableCell align="center">PROFILE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                <TextField
                  id="username"
                  label="USERNAME"
                  value={username}
                  onChange={handleUsernameChange}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
          </TableRow>

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                <TextField
                  id="email"
                  label="EMAIL"
                  value={email}
                  onChange={handleEmailChange}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
          </TableRow>

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                <TextField
                  id="password"
                  label="NEW PASSWORD"
                  value={password}
                  onChange={handlePwdChange}
                  type="password"
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
          </TableRow>

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                <TextField
                  id="password2"
                  label="CONFIRM NEW PASSWORD"
                  value={password2}
                  onChange={handlePwd2Change}
                  type="password"
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
          </TableRow>
          {actionRow}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Page content={userProfile}></Page>
  );
}
