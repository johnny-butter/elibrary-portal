import { useCookie } from 'react-use';

import { OpenAPI } from '../services/elibraryAPI';

import { Navbar } from '../components';

import Grid from '@mui/material/Grid';

interface INavbarProp {
    cartCnt?: number
    setCartCnt?: React.Dispatch<React.SetStateAction<number>>
}

interface IPageProp {
    content: JSX.Element
    navbarProp?: INavbarProp
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
                <Navbar
                    token={token}
                    updateToken={updateToken}
                    deleteToken={deleteToken}
                    cartCnt={props.navbarProp?.cartCnt}
                    setCartCnt={props.navbarProp?.setCartCnt}
                ></Navbar>
            </Grid>

            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                {props.content}
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}
