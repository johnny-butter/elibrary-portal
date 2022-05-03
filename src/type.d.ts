interface INotifyProp {
  setSeverity: React.Dispatch<React.SetStateAction<import('@mui/material').AlertColor>>
  setContent: React.Dispatch<React.SetStateAction<string>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
