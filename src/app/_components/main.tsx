import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { SigninLink } from './signlink';
import { Navbar } from './navbar';


export async function MyApp({
    children,
  }: Readonly<{ children: React.ReactNode }>) {  
    const session = await auth();
  
    return (
      <HydrateClient>
        <header>
          { session ? <Navbar /> : <SigninLink /> }
        </header>
        <main>
          { session ? children : "Not signed in" }
        </main>
      </HydrateClient>
    );
  }