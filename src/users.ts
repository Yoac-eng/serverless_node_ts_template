import { makeHandler } from "./middy/makeLambdaHandler";
import { makeRoutesHandler } from "./middy/makeRoutesHandler";

export const listUsersHandler = makeHandler(async (request) => {
  return {
    statusCode: 200,
    body: {
      message: "Listing all users",
      users: request,
    },
  };
});

export const updateUserHandler = makeHandler(async (request) => {
  return {
    statusCode: 200,
    body: {
      message: "Updating a user",
      users: request.pathParameters?.userId,
    },
  };
});

export const getUserPostHandler = makeHandler(async (request) => {
  return {
    statusCode: 200,
    body: {
      message: "Getting a user's post",
      userId: request.pathParameters?.userId,
      postId: request.pathParameters?.postId,
    },
  };
});

export const listUserPostsHandler = makeHandler(async (request) => {
  return {
    statusCode: 200,
    body: {
      message: "Listing all user's posts",
      userId: request.pathParameters?.userId,
    },
  };
});

export const handler = makeRoutesHandler([
  {
    path: "/users",
    method: "GET",
    handler: listUsersHandler,
  },
  {
    path: "/users/{userId}",
    method: "PUT",
    handler: updateUserHandler,
  },
  {
    path: "/users/{userId}/posts",
    method: "GET",
    handler: getUserPostHandler,
  },
  {
    path: "/users/{userId}/posts/{postId}",
    method: "GET",
    handler: getUserPostHandler,
  },
]);
