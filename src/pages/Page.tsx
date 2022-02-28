import { useCookie } from 'react-use';

import { OpenAPI } from '../services/elibraryAPI';

import { Navbar } from '../components';

import Grid from '@mui/material/Grid';

interface IPageProp {
    content: JSX.Element
}

export const Page = (props: IPageProp): JSX.Element => {
    const [token, updateToken, deleteToken] = useCookie('token');

    if (token) OpenAPI.TOKEN = token;

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <Navbar token={token} updateToken={updateToken} deleteToken={deleteToken}></Navbar>
            </Grid>
            <Grid item xs={12}>
                {props.content}
            </Grid>
        </Grid>
    )
}
