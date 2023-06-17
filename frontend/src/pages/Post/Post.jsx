import { useContext } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Stack } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { GlobalContext } from "../../context/context";
const FacebookPost = ({post}) => {
  let { state } = useContext(GlobalContext);



  return (
    <>
    
    {post.length > 1 ? post.map((p, index) => (
      <Box
      key={index}
      sx={{
        my:"20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: 1,
        width:"100%",
        p: 2,
        borderRadius: 4,
      }}
    >
      <Box sx={{ display: "flex",mb:"3px", alignItems: "center" }}>
        <Avatar sx={{ mr: 2 }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h6">{state.user.fullname}</Typography>
      </Box>
      <Typography variant="body1" sx={{mt:"5px" ,ml:"20px"}}>
        {p.text}
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <IconButton>
          <ThumbUpIcon />
        </IconButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Stack>
    </Box>
    ))     :
    post.length === 1 ?
    <Box
      sx={{
        my:"20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: 1,
        width:"100%",
        p: 2,
        borderRadius: 4,
      }}
    >
      <Box sx={{ display: "flex",mb:"3px", alignItems: "center" }}>
        <Avatar sx={{ mr: 2 }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h6">{state.user.fullname}</Typography>
      </Box>
      <Typography variant="body1" sx={{mt:"5px" ,ml:"20px"}}>
        {post.text}
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <IconButton>
          <ThumbUpIcon />
        </IconButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Stack>
    </Box>
    :""
    }
    </>
  );
};

export default FacebookPost;

