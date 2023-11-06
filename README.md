# README

This application was building with using Device for authorisation and React for UI without additional dependencies.
UI can be deployed as standalone app without changing the codebase.

All users can schedule new appointment with coach and see incoming events.
To login use client123@empty.com and password 1111111.

Application can't be builded with schema described on tech assessment and store sessions on Sessions table. Sessions is term of Rails scope to store authenticated users so it little bit confusing use this term as model. All appointments is stored on timetables table and structure of table is the same as was descibed on assessment. All existed data tables are described on migrations folder.

User can have one of roles:
  * Client can schedule a meeting with coach;
  * Coach - can see all his scheduled meetings and book a new meeting with other coaches.

To run app in development mode clone the repository, and install dependencies: Ruby and Node. Install bundler gem.
Run `bundle install` and `yarn install`.

App run by `foreman start -f Procfile.dev`.
