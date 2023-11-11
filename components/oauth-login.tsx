import { Separator } from './ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

function OAuthLogin() {
  const providers = [
    {
      provider: 'google',
      iconNode: <FcGoogle className="w-5 h-5" />,
    },
    {
      provider: 'github',
      iconNode: <AiOutlineGithub className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {providers.map((p) => (
        <OAuthLoginBtn
          key={p.provider}
          provider={p.provider}
          iconNode={p.iconNode}
        />
      ))}
      <div className="flex-center my-4">
        <Separator className="fixed max-w-xs" />
        <span className="z-10 px-4 text-xs bg-card">or</span>
      </div>
    </>
  );
}

interface OAuthLoginBtnProps {
  provider: string;
  iconNode: React.ReactNode;
}

function OAuthLoginBtn(props: OAuthLoginBtnProps) {
  return (
    <div>
      <Button
        variant="outline"
        className="w-full mt-2.5 flex justify-start items-center gap-11"
        onClick={() => signIn(props.provider)}
      >
        {props.iconNode}
        <span className="">
          Continue with {/* Uppercase provider's first letter */}
          {props.provider.charAt(0).toUpperCase() +
            props.provider.slice(1)}
        </span>
      </Button>
    </div>
  );
}

export default OAuthLogin;
