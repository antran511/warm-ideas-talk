import React from "react";
import { NotificationProvider } from "@refinedev/core";
import {
  showNotification,
  updateNotification,
  hideNotification,
  cleanNotifications,
} from "@mantine/notifications";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconCheck, IconRotate2, IconX } from "@tabler/icons-react";

export const notificationProvider: NotificationProvider = {
  open: ({ message, key, type }) => {
    showNotification({
      id: key,
      message: message,
      autoClose: false,
    });
  },
  close,
};
