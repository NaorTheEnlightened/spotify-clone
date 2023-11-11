import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoOpenOutline } from 'react-icons/io5';

function AuthModal() {
  return (
    <div className="flex-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/60">
      <div className="flex-center flex-col w-[500px] m-auto h-auto gap-2 rounded-md bg-black p-8">
        <Image
          alt="logo"
          src="/logo.png"
          className="my-2"
          width={145}
          height={145}
        />

        <h1 className="text-3xl font-bold pt-3 text-center">
          Millions of songs.
          <br />
          Free on Spotify.
        </h1>

        <Button asChild className="p-5 mt-4">
          <Link href="/login">
            Log In
            <IoOpenOutline className="ml-2 mb-0.5 w-5 h-5" />
          </Link>
        </Button>

        <Link className="flex-center py-4 px-10" href="/register">
          <p className="text-[#a7a7a7]">New to Spotify?</p>
          <p className="ml-2 font-bold">Sign up free</p>
          <IoOpenOutline className="mx-1.5" size={20} />
        </Link>
      </div>
    </div>
  );
}

export default AuthModal;
