import React from 'react';
import CustomNotification from '../CustomNotification/CustomNotification';

const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <>
      {notifications.map((notification) => (
        <CustomNotification
          key={notification.id}
          isOpen={notification.isOpen}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          position={notification.position}
          onClose={() => onRemove(notification.id)}
        />
      ))}
    </>
  );
};

export default NotificationContainer;
