import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: "https://event-api-prisma",
  issuerBaseURL: `https://dev-ezil5aozoabyhhcn.eu.auth0.com/`,
});
