import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  let statusCode;
  let message;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    message = error.statusText;
  }

  message ||= "An error occurred!";

  return (
    <div>
      <div>
        <strong>Error</strong>
        {statusCode && <span>&ensp;({statusCode})</span>}
      </div>

      <p>{message}</p>
    </div>
  );
};
