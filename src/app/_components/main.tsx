import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import PageLayout from './PageLayout';
import { CartProvider } from "../_context/cart-context";
import { SigninLink } from './signlink';


export async function MyApp({
  children,
}: Readonly<{ children: React.ReactNode }>) {  
  const session = await auth();

  return (
    <HydrateClient>
      <CartProvider>
        <div className="flex h-screen">
          <header>
            {!session && <SigninLink />}
          </header>
            {session ? (
              <PageLayout>
                {children}
              </PageLayout>
            ) : (
              "Not signed in"
            )}
        </div>
      </CartProvider>
    </HydrateClient>
  );
} 