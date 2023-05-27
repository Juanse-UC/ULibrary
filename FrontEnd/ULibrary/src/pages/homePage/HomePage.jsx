import React from 'react'
import { logOut } from '../../redux/thunks/authUserThunk';
import { useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar';
import { Box, Container } from '@mui/material';
import Books from './components/Books';


const HomePage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <>
     <NavBar />
     <Box width= '100%'>
      <Books />
     </Box>
    </>
  )
}

export default HomePage