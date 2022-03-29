import {
    Alert,
    AlertColor,
    Collapse,
    IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

interface Props {
  severity: AlertColor
  content: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Notifybar = (props: Props): JSX.Element => {
  const closeBtn = (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {props.setOpen(false);}}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  )

  return (
    <Collapse in={props.open}>
      <Alert
        action={closeBtn}
        sx={{ mb: 2 }}
        severity={props.severity}
        >
        {props.content}
      </Alert>
    </Collapse>
  )
}
