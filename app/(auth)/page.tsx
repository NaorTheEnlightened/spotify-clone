import { ModeToggle } from '@/components/mode-toggle';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import UserProfileMenu from '@/components/user-profile-menu';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <ModeToggle />
      {session ? (
        <UserProfileMenu session={session} />
      ) : (
        <>
          <div>You are not signed in</div>{' '}
          <Button asChild>
            <Link href={'login'}>Login</Link>
          </Button>
        </>
      )}
    </div>
  );
}
