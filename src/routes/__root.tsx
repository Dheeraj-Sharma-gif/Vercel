import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { carryOverIfNeeded } from "@/lib/tracker/store";
import { AuroraBackground } from "@/components/tracker/AuroraBackground";
import { cn } from "@/lib/utils";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuroraBackground />
      <div className="max-w-md text-center">
        <h1 className="font-serif text-8xl text-aurora">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to board
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuroraBackground />
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-aurora">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Founder's Weekly — Priority Tracker" },
      {
        name: "description",
        content:
          "A focused weekly task tracker for startup founders — one owner per task, specific blockers, earned priority.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      activeProps={{ className: cn("text-foreground") }}
      activeOptions={{ exact: true }}
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          <span
            className={cn(
              "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-aurora-3 via-aurora-2 to-aurora-1 transition-transform duration-300 group-hover:scale-x-100",
              isActive && "scale-x-100",
            )}
          />
        </>
      )}
    </Link>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    carryOverIfNeeded();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuroraBackground />
      <div className="relative min-h-screen">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-40 border-b border-white/5 glass-strong"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link to="/" className="group flex items-baseline gap-2">
              <span className="relative">
                <span className="absolute -inset-2 -z-10 rounded-full bg-aurora-3/30 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="font-serif text-2xl italic text-aurora">Founder's</span>
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Weekly · OS
              </span>
            </Link>
            <nav className="flex items-center gap-8">
              <NavLink to="/">Board</NavLink>
              <NavLink to="/archive">Archive</NavLink>
              <NavLink to="/team">Team</NavLink>
            </nav>
          </div>
        </motion.header>
        <main className="relative mx-auto max-w-7xl px-6 py-10">
          <Outlet />
        </main>
      </div>
      <Toaster richColors position="bottom-right" theme="dark" />
    </QueryClientProvider>
  );
}
