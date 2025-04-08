"use client";

// React Imports
import { useRef, useState } from "react";
import type { MouseEvent } from "react";

// Next Imports
import { useRouter } from "next/navigation";

// MUI Imports
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import api from "@/app/auth/axios.config";

// Styled component for badge content
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: 10px;
    right: -3px;
  }
`;

interface MyFormProps {
  /** The text to display inside the button */
  notifications: any;
  refreshList: Function;
}

const NotificationsDropdown = ({ notifications, refreshList }: MyFormProps) => {
  // States
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Refs
  // Hooks
  // const router = useRouter()

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false);
  };

  const handleDropdownClose = (
    notification?: any,
    event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent)
  ) => {
    console.log({ notification });
    if (
      anchorRef.current &&
      anchorRef.current.contains(event?.target as HTMLElement)
    ) {
      return;
    }
    api
      .put("/api/notifications/", { id: notification.id })
      .then(() => {
        refreshList();
      })
      .catch((err) => {
        console.log({ err });
      });
    if (notification) {
        console.log()
      if (notification.owner !== notification.requester) {
        router.push("/manage_vacation");
      } else {
        router.push("/my_vacation");
      }
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton size="large" onClick={handleDropdownOpen}>
        <NotificationsNoneIcon fontSize="large" onClick={handleDropdownOpen} />
        <CartBadge
          ref={anchorRef}
          badgeContent={notifications.length}
          color="error"
          overlap="circular"
        />
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        placement="bottom-end"
        anchorEl={anchorRef.current}
        className="min-is-[240px] !mbs-4 z-[1]"
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "right top" : "left top",
            }}
          >
            <Paper className="shadow-lg">
              <ClickAwayListener
                onClickAway={(e) =>
                  handleDropdownClose(null, e as MouseEvent | TouchEvent)
                }
              >
                <MenuList>
                  <Divider className="mlb-1" />
                  {notifications.map((notification: any, index: number) => (
                    <MenuItem
                      key={index}
                      style={{ height: "50px" }}
                      className="gap-3 flex items-center justify-between"
                      onClick={(e) => handleDropdownClose(notification, e)}
                    >
                      <Typography color="text.primary">
                        {notification.message}
                      </Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default NotificationsDropdown;
