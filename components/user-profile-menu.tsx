'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

interface UserProfileMenuProps {
  session: any;
}

function UserProfileMenu(props: UserProfileMenuProps) {
  return (
    <div>
      {' '}
      <div>
        Signed in as {props.session.user?.email} <br />
        <Button onClick={() => signOut({ callbackUrl: '/' })}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default UserProfileMenu;
