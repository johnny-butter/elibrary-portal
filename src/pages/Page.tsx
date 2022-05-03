import { useState } from 'react';

import { useCookie } from 'react-use';

import { OpenAPI } from '../services/elibraryAPI';

import {
    Navbar,
    Notifybar,
} from '../components';

import {
    Grid,
    AlertColor,
} from '@mui/material';

interface INavbarProp {
    cartCnt?: number
    setCartCnt?: React.Dispatch<React.SetStateAction<number>>
}

interface INotifybarProp {
    severity: AlertColor
    content: string
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IPageProp {
    content: JSX.Element
    navbarProp?: INavbarProp
    notifybarProp?: INotifybarProp
}

export const Page = (props: IPageProp): JSX.Element => {
    const [token, updateToken, deleteToken] = useCookie('token');

    const [notifyOpen, setNotifyOpen] = useState(false);

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

            <Grid item xs={12}>
                <Notifybar
                    severity={props.notifybarProp?.severity ?? 'error'}
                    content={props.notifybarProp?.content ?? ''}
                    open={props.notifybarProp?.open ?? notifyOpen}
                    setOpen={props.notifybarProp?.setOpen ?? setNotifyOpen}
                />
            </Grid>

            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                {props.content}
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}
