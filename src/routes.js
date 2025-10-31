// routes.js
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "profile/:id",
            element: <UserProfile />,
            children: [
              {
                path: "posts",
                element: <UserPosts />
              },
              {
                path: "friends",
                element: <UserFriends />
              }
            ]
          }
        ]
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
];