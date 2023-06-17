import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useContext } from "react";
import { GlobalContext } from "../../context/context";
const ProfilePage = () => {
  let { state } = useContext(GlobalContext);
  const cookies = new Cookies();
  let navigate = useNavigate();
  const logout = () => {
    cookies.set("token", "", { path: "*" });
    navigate("/");
  };
  return (
    <>
     <Box sx={{py:"10px",display:"flex",justifyContent:"flex-end",borderBottom:"1px solid gray"}}>
      <Link to="/">
    <Button variant="contained" type="button" color="primary">
          Posts
        </Button>
      </Link>
    <Button variant="contained" onClick={logout} type="button" sx={{bgcolor:"red",mx:"5px"}}>
          logout
        </Button>
    </Box>
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Avatar sx={{ width: 120, height: 120, mx: "auto" }}>
          <PersonIcon sx={{ width: 80, height: 80 }} />
        </Avatar>
        {/* <Typography variant="h4" sx={{ mt: 2 }}>
          {state.user?.fullname}
        </Typography> */}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{state.user?.fullname}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Email:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{state.user?.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">User Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{state.user?.username}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Link to="/edit">
          <Button variant="contained" color="primary" fullWidth>
            Edit Profile
          </Button>
        </Link>
        {/* <Button  */}
      </Box>
    </Container>
    </>
  );
};

export default ProfilePage;
