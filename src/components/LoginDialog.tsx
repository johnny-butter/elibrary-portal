import React, { useState } from 'react';

import {
  Button,
  Divider,
  TextField,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { Google, Facebook } from '@mui/icons-material';

import { ApiError, UsersService } from '../services/elibraryAPI';

import { Notifybar } from '../components';

import { notifyApiErr } from '../utils';

const { usersApiAuth } = UsersService;

// Scope: https://developers.google.com/people/v1/how-tos/authorizing#profile-scopes
const googleOauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
let googleOauthParams = googleOauthUrl.searchParams;
googleOauthParams.append('client_id', process.env.REACT_APP_OAUTH_GOOGLE_CLIENT_ID || '');
googleOauthParams.append('redirect_uri', process.env.REACT_APP_OAUTH_REDIRECT_URI || '');
googleOauthParams.append('response_type', 'code');
googleOauthParams.append('scope', 'profile email');
googleOauthParams.append('state', 'google,login');

// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
const fbOauthUrl = new URL('https://www.facebook.com/v13.0/dialog/oauth');
let fbOauthParams = fbOauthUrl.searchParams;
fbOauthParams.append('client_id', process.env.REACT_APP_OAUTH_FB_CLIENT_ID || '');
fbOauthParams.append('redirect_uri', process.env.REACT_APP_OAUTH_REDIRECT_URI || '');
fbOauthParams.append('scope', 'public_profile,email');
fbOauthParams.append('state', 'fb,login');

interface Props {
  formOpen: boolean
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  updateToken: (newValue: string, options?: Cookies.CookieAttributes | undefined) => void
}

export const LoginDialog = (props: Props) => {
  const [notifyMsg, setNotifyMsg] = useState("");
  const [notifyOpen, setNotifyOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    props.setFormOpen(false);
  };

  const handleLogin = () => {
    usersApiAuth({username: username, password: password})
      .then((authOut) => {
        props.updateToken(authOut.token);
        props.setFormOpen(false);

        window.location.reload();
      })
      .catch((err: ApiError) => {
        notifyApiErr(err.body, setNotifyMsg, setNotifyOpen);
      });
  };

  return (
    <div>
      <Dialog open={props.formOpen} onClose={handleClose}>
        <Notifybar severity="error" content={notifyMsg} open={notifyOpen} setOpen={setNotifyOpen} />
        <DialogTitle>
          LOGIN
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2}>
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
          <Divider>OR</Divider>
          <TextField
            autoFocus
            id="username"
            label="USERNAME"
            variant="standard"
            margin="dense"
            fullWidth
            onChange={(envet) => {setUsername(envet.target.value)}}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="password"
            type="password"
            label="PASSWORD"
            variant="standard"
            margin="dense"
            fullWidth
            onChange={(envet) => {setPassword(envet.target.value)}}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleLogin}>LOGIN</Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            DON'T HAVE AN ACCOUNT? <a href="userProfile">REGISTER</a> HERE
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
