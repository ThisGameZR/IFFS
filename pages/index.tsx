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
        <div className="home-features">
          <h1>IFFS Ability</h1>
          <div className="grid">
            <div className="feature-box">
              <div className="image">
                <img src="/assets/ico1.png" alt="" />
              </div>
              <h4>Criticality Identity</h4>
              <p>Visual the importance of feedback and eliminate duplicate feedback.</p>
            </div>
            <div className="feature-box">
              <div className="image">
                <img src="/assets/ico2.png" alt="" />
              </div>
              <h4>Overall Visualize</h4>
              <p>Visualize the overall feedback type of customers on the website.</p>
            </div>
            <div className="feature-box">
              <div className="image">
                <img src="/assets/ico3.png" alt="" />
              </div>
              <h4>Categorization</h4>
              <p>Auto identify each feedback seperately and categorization.</p>
            </div>
            <div className="feature-box">
              <div className="image">
                <img src="/assets/ico1.png" alt="" />
              </div>
              <h4>Suggestion</h4>
              <p>Propose some solution according to the problem or suggestion.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
