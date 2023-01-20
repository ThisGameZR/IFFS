import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>IFFS - Home</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {session && (
          <>
            <h1>Logged in as {session?.user?.email}</h1>
            <img
              style={{ borderRadius: "50%" }}
              src={session?.user?.image as string}
              alt="Picture of the author"
              width={200}
              height={200}
            />
            <a href="/project">project</a>
          </>
        )}
        <button
          style={{
            padding: "1rem",
            fontSize: "1.5rem",
            cursor: "pointer",
            border: "1px solid black",
          }}
          onClick={() => (session ? signOut() : signIn())}
        >
          {session ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
    </>
  );
}
