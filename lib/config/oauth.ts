import { GitHub } from "arctic";
import {
  APP_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "~/constants/envs";

export const github = new GitHub(
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  `${APP_URL}/login/github/callback`,
);
