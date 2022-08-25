import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function UpdateProfile(clickOpen) {
  const [open, setOpen] = React.useState(false);
  const[editopen, setEditopen] = React.useState(false);

  const handleClickEdit = () => {
    setEditopen(true);
  };
  const clickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditopen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Profile</DialogTitle>
         <AccountCircle />
        <DialogContent>
          <DialogContentText>name: {'TEst Test'}</DialogContentText>
          <DialogContentText>email: {'test@test.test'}</DialogContentText>
          <DialogContentText>Password: {'********'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickEdit}>Edit Profile</Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog Page */}
      <Dialog open={editopen} onClose={handleClose}>
        <DialogTitle>Upadte Profile</DialogTitle>
         <AccountCircle />
        <DialogContent>
          <DialogContentText>name: {'TEst Test'}</DialogContentText>
          <DialogContentText>email: {'test@test.test'}</DialogContentText>
          <DialogContentText>Password: {'********'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickEdit}>Update Profile</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
