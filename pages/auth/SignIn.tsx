import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import Image from "next/image";

const Signin = ({ csrfToken, providers }: { csrfToken: any; providers: any }) => {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name} style={{ marginBottom: 0 }}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </div>
        ))}
    </div>
  );
};

export default Signin;

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
