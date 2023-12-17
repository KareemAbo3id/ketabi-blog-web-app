import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { IconButton, Tooltip } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

function UserHeroBlogTitleInput() {
    const [blogTitleText, setBlogTitleText] = useState("");

    const inputBaseWrittingHandler = (e) => {
        setBlogTitleText(e.target.value);
        console.log(blogTitleText);
    };

    return (
        <Paper
            component="form"
            sx={{
                ":focus-within": {
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 45px 90px",
                },
                boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px 0px",
                p: "10px 5px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderRadius: 2,
            }}
        >
            <InputBase
                onChange={inputBaseWrittingHandler}
                name="blog-title"
                value={blogTitleText}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type a title of new blog post."
                inputProps={{
                    "aria-label": "Type a title of new blog post.",
                }}
            />

            <IconButton
                disabled={blogTitleText.length < 1 ? true : false}
                color="primary"
                sx={{ p: "10px" }}
                aria-label="create-blog-btn"
            >
                <Tooltip title="Create Blog">
                    <CreateIcon />
                </Tooltip>
            </IconButton>
        </Paper>
    );
}

export default UserHeroBlogTitleInput;
