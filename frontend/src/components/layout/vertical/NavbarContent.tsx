"use client";
// Next Imports
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
// MUI Imports
import { styled } from '@mui/material/styles';

// Third-party Imports
import classnames from "classnames";

// Component Imports
import NavToggle from "./NavToggle";
import NavSearch from "@components/layout/shared/search";
// import ModeDropdown from "@components/layout/shared/ModeDropdown";
import UserDropdown from "@components/layout/shared/UserDropdown";
import NotificationsDropDown from "@components/layout/shared/NotificationsDropdown";
import api from "@/app/auth/axios.config";
// Util Imports
import { verticalLayoutClasses } from "@layouts/utils/layoutClasses";



const NavbarContent = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  useEffect(() => {
    api
      .get("/api/notifications")
      .then((res) => {
        const { data } = res;
        console.log({ data });
        setNotifications(data);
      })
      .catch((err) => {
        console.log("============= err =============", err);
      });
  }, [refreshList]);

  const updateList = () => { setRefreshList(!refreshList) }



  return (
    <div
      className={classnames(
        verticalLayoutClasses.navbarContent,
        "flex items-center justify-between gap-4 is-full"
      )}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <NavToggle />
        <NavSearch />
      </div>
      <div className="flex items-center">
        {/* <Link
          className='flex mie-2'
          href={`https://github.com/themeselection/${process.env.NEXT_PUBLIC_REPO_NAME}`}
          target='_blank'
        >
          <img
            height={24}
            alt='GitHub Repo stars'
            src={`https://img.shields.io/github/stars/themeselection/${process.env.NEXT_PUBLIC_REPO_NAME}`}
          />
        </Link> */}
        {/* <ModeDropdown /> */}
{/*         <Badge
          color="error"
          ref={anchorRef}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={notifications.length}
          max={99}
        > */}
          <NotificationsDropDown
            notifications={notifications}
            refreshList={updateList}
            />

        <UserDropdown />
      </div>
    </div>
  );
};

export default NavbarContent;
