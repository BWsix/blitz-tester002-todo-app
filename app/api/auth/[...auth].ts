import { passportAuth, PublicData } from "blitz"
import db, { Role } from "db"
import { Strategy as GitHubStrategy } from "passport-github2"

const PRODUCTION_CALLBACK_URL = ""
const DEV_CALLBACK_URL = "http://localhost:3000/api/auth/github/callback"

function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(process.env.GITHUB_CLIENT_ID, "GITHUB_CLIENT_ID env variable must be provided.")
assert(process.env.GITHUB_CLIENT_SECRET, "GITHUB_CLIENT_SECRET env variable must be provided.")

export default passportAuth(({ ctx, req, res }) => ({
  successRedirectUrl: "/",
  strategies: [
    {
      strategy: new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          callbackURL:
            process.env.NODE_ENV === "production" ? PRODUCTION_CALLBACK_URL : DEV_CALLBACK_URL,
          scope: ["user:email"],
        },
        async function (
          _token: string,
          _tokenSecret: string,
          profile: any,
          done: (err: Error | null, data?: { publicData: PublicData }) => void
        ) {
          console.log(profile)
          const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            return done(new Error("GitHub OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            role: user.role as Role,
            source: "github",
            githubUsername: profile.username,
          }
          done(null, { publicData })
        }
      ),
    },
  ],
}))
