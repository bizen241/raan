import * as compression from "compression";
import * as express from "express";
import * as helmet from "helmet";
import { join } from "path";
import * as serveStatic from "serve-static";
import { useApi } from "./api";
import { useAuth } from "./auth";
import { Env } from "./env";
import { useLimiter } from "./limiter";
import { authRouter } from "./routes/auth";
import { fallbackRouter } from "./routes/fallback";
import { logoutRouter } from "./routes/logout";
import { useSession } from "./session";

export const createApp = (env: Env, app: express.Express = express()) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        reportOnly: true,
        directives: {
          reportTo: env.report.csp
        }
      },
      expectCt: {
        reportUri: env.report.expectCt
      }
    })
  );

  useSession(env, app);
  useAuth(env, app);

  app.use(compression());
  app.use(serveStatic(join(process.cwd(), "dist")));

  useLimiter(app);
  useApi(env, app);

  app.use("/auth", authRouter);
  app.use("/logout", logoutRouter);
  app.use("*", fallbackRouter);

  return app;
};
