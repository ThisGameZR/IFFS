import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { sleep } from "utils/sleep";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>IFFS - Home</title>
      </Head>
      <div className="home">
        <nav className="home-nav">
          <h4>IFFS</h4>
          {status != "authenticated" ? (
            <button
              onClick={() => {
                signIn();
              }}
            >
              Start Project
            </button>
          ) : (
            <button
              onClick={async () => {
                toast.loading("Logging out");
                await sleep(1000);
                await signOut();
                toast.success("Successfully logout");
              }}
            >
              Logout
            </button>
          )}
        </nav>
        <div className="home-hero">
          <div className="home-hero-image">
            <img src="/assets/3D.png" alt="" />
          </div>
          <div className="home-hero-content">
            <h1>IFFS</h1>
            <div className="section">
              <div className="head">
                <img src="/assets/hero.png" alt="" />
                <div>
                  <h4>Effective</h4>
                  <p>Webpage Feedback Analysis</p>
                </div>
              </div>
              <div className="main">
                <p>IFFS is a web-based tool that aids in effectively managing customer feedback.</p>
                <p>
                  It has the capability to analyze vast amounts of feedback data and make it simple to recognize and
                  remove duplicate feedback, thus providing a clearer understanding of customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
