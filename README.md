# TweetX Demo Project

Demo project for job application

## Project Structure

The project is structured with a focus on modularity and separation of concerns. Key components include:

- **layouts folder:** Contains common layouts, such as app layout and auth layout.
- **moment.js:** Utilized for date calculations.
- **services folder:** Connects with Firebase for data fetching, separating business logic from client-side code.
- **components folder:** Reusable UI components.
- **pages folder:** Various pages, including login, register, feed, etc.
- **config folder:** Secret credential configuration, such as Firebase configurations.
- **Tailwind CSS and MUI:** Styling libraries for simplicity.

## Dependencies

Major dependencies include:

- Firebase: Backend for data storage and authentication.
- Moment.js: Library for handling date and time.
- Tailwind CSS and MUI: Styling frameworks for simplicity.


## Technologies Used

- React: Frontend library for building user interfaces.
- Firebase: Backend services for authentication and data storage.
- Moment.js: Library for handling date and time.
- Tailwind CSS and MUI: Styling frameworks for a clean and consistent UI.


## Design Choices
In the data modeling process, the project utilizes following and followers maps to store user relationships. This design choice offers the following advantages:

- Efficient User Validation: Checking if a user has already followed another user is streamlined with a simple conditional statement. For example: if (!followerDoc.followers[user.uid]) return false;.
- Optimized Follower Count: Calculating the number of followers is expedited by using Object.keys(user.following).length rather than querying a collection and calling Firebase.


# Client-Side Validation
Client-side validation is implemented within React components to ensure data integrity and a smooth user experience.

# Pagination
Pagination is extensively utilized to enhance client-side performance, especially when dealing with large datasets.

# Styling
Styling is done using Tailwind CSS and MUI, providing a clean and responsive UI.