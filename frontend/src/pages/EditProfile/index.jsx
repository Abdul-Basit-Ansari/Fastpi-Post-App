import React, { useState } from "react";
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
import { GlobalContext } from "../../context/context";
import axios from 'axios'
import { useNavigate , Link } from "react-router-dom";
import Cookies from "universal-cookie";


const EditProfilePage = () => {
  let navigate = useNavigate()  
  let { state } = useContext(GlobalContext);
  const [fullname, setFullname] = useState(state.user?.fullname);
  const [username, setUsername] = useState(state.user?.username);
  const [email, setEmail] = useState(state.user?.email);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");


  const cookies = new Cookies();
  const logout = () => {
    cookies.set("token", "", { path: "*" });
    navigate("/");
  };


  const handleSave = async (e) => {
    e.preventDefault()
    try {
        let response = await axios.patch(
          `${state.baseUrl}/users/${state.user?.id}/`,
          {
            fullname: fullname,
            username: username,
            email: email,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${state.loginToken}`,
            }
          }
        );

        if (response.status === 200) {
            
            navigate("/profile")
          
        } else {
          setMsg(response.data.detail);
          return;
        }
      } catch (error) {
          if (error.response?.status === 403) {
              setMsg(error.response?.data.detail);
            }
            if (error.response?.status === 404) {
                setMsg(error.response?.data.detail);
            }
        setMsg(error.response?.data.detail);
      }
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
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Avatar sx={{ width: 120, height: 120, mx: "auto" }}>
          <PersonIcon sx={{ width: 80, height: 80 }} />
        </Avatar>
        <Typography variant="h4" sx={{ mt: 2 }}>
          Edit Profile
        </Typography>
      </Box>
      <form onSubmit={(e)=>{handleSave(e)}}>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="FullName"
              variant="outlined"
              fullWidth
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="UserName"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 ,display:"flex",justifyContent:"space-between"}}>
        <Link to="/profile">
        <Button variant="contained" type="button" sx={{backgroundColor:"gray"}}>
          Profile
        </Button>
        </Link>
        <Button variant="contained" type="submit" color="primary">
          Save Changes
        </Button>
      </Box>
      </form>
    </Container>
      <Box fullWidth sx={{ mt: 4 ,display:"flex",justifyContent:"center"}}>
      <Typography variant="h4" sx={{ mt: 2 }}>
          {msg? msg :""}
        </Typography>
      </Box>
      </>
  );
};

export default EditProfilePage;