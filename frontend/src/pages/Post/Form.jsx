import {useState , useContext , useEffect} from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Post from "./Post"
import { GlobalContext } from "../../context/context";
import axios from 'axios'
import { Link ,useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const FacebookPost = () => {
  let { state } = useContext(GlobalContext);
  const [text , setText] = useState("")

  const [postList , setPostList] = useState([{}])

  const getPosts = async () => {
    try {
      let response = await axios.get(`${state.baseUrl}/posts/${state.user.id}`, {
        headers: {
          Authorization: `Bearer ${state.loginToken}`,
        }
      });
      if (response.status === 200) {
        setPostList(response.data)
        return;
      }
      }
     catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getPosts();
  }, [])




  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        let response = await axios.post(
          `${state.baseUrl}/posts`,
          {
            user_id:state.user.id,
            text :text
          },
          {
            headers: {
              Authorization: `Bearer ${state.loginToken}`,
            }
          }
        );

        if (response.status === 200) {
            
          setText("")
          getPosts();
          alert("Post Ready");
          
        } else {
          alert(response.data.detail);
          return;
        }
      } catch (error) {
          if (error.response?.status === 403) {
              alert(error.response?.data.detail);
            }
            if (error.response?.status === 404) {
                alert(error.response?.data.detail);
            }
        alert(error.response?.data.detail);
      }
  };
  const cookies = new Cookies();
  let navigate = useNavigate();
  const logout = () => {
    cookies.set("token", "", { path: "*" });
    navigate("/");
  };

  return (
    <>
    <Box sx={{py:"10px",display:"flex",justifyContent:"flex-end",borderBottom:"1px solid gray"}}>
      <Link to="/profile">
    <Button variant="contained" type="button" color="primary">
          Profile
        </Button>
      </Link>
    <Button variant="contained" onClick={logout} type="button" sx={{bgcolor:"red",mx:"5px"}}>
          logout
        </Button>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 1,
        p: 2,
        width:"80vw",
        justifyContent:"center",
        mx:"auto",
        mt:"10px",
        borderRadius: 4,
      }}
    >
      <form onSubmit={(e)=>{handleSubmit(e)}}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ mr: 2 }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h6">John Doe</Typography>
      </Box>
      <TextField
        multiline
        placeholder="What's on your mind?"
        value={text}
        onChange={(e)=>{setText(e.target.value)}}
        sx={{ mt: 2,width:"100%" }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" type="submit" color="primary">
          Post
        </Button>
      </Box>
      </form>
    </Box>
    <Box sx={{display:"flex",flexDirection:"column",mt:"10px",justifyContent:"center",alignItems:"center",mx:"auto",width:"80vw"}}>
      <Post post={postList}/>
    </Box>
    </>
  );
};

export default FacebookPost;

