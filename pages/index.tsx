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
        <div className="home-how-it-works">
          <div className="image">
            <img src="/assets/AI.png" alt="" />
          </div>
          <div className="home-how-it-works-wrap">
            <div className="box">
              <h4>Sentiment Analysis</h4>
              <p>To Categorize the feedback type</p>
            </div>
            <div className="box">
              <h4>Natural language analysis</h4>
              <p>To identify issues from the feedback</p>
            </div>
            <div className="box">
              <h4>Dialogue prediction</h4>
              <p>Create a suggestion for solving issues</p>
            </div>
          </div>
        </div>
        <div className="home-get-started">
          <div className="text">
            <h4>Tried of going through tons of feedback</h4>
            <p>
              Lets start for quickly identify and address pressing issues, <br />
              improve the user experience, and make data-driven
              <br /> decisions about the website's development with ease.
            </p>
            <button
              onClick={() => {
                session ? router.push("/") : signIn();
              }}
            >
              START YOUR PROJECT
            </button>
          </div>
          <div className="image">
            <img src="/assets/project.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
