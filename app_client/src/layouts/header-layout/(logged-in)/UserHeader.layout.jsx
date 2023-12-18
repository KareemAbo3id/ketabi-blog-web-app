import { Fragment, useState } from "react";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

const settings = ["Dashboard", "Profile", "Logout"];

function UserHeader() {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Fragment>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={3}
            >
                <Tooltip title="Add new blog">
                    <IconButton sx={{ p: 0 }}>
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Search">
                    <IconButton sx={{ p: 0 }}>
                        <SearchIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Username">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="user" src="" />
                        <KeyboardArrowDownIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}

export default UserHeader;
