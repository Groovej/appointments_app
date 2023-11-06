# README

This application was building with using Device for authorisation thing and React for UI without additional dependencies.

All users can schedule new appointment with coach and see incoming events.
To login use client123@empty.com, and password client111.
To login to Coach account use coach123@empty.com, and password coach111.

Also you  can login to mentor account and see all scheduled sessions.

Application can't be builded with schema described on tech assessment and store sessions on Sessions table. Sessions table is used on application to store sessions of authorised users, so it was renamed to timetables table. All existed data tables are described on migrations folder.

User can have one of roles:
  * Client can schedule a meeting with coach;
  * Coach - can see all his scheduled meetings and book a new meeting with other coaches.
