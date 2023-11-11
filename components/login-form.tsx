'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { registerFormSchema } from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { z } from 'zod';
import OAuthLogin from './oauth-login';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { ImSpinner2 } from 'react-icons/im';
import { signIn, useSession } from 'next-auth/react';

type registerFormSchemaType = z.infer<typeof registerFormSchema>;

export default function LoginForm() {
  const { data: session, status } = useSession();
  const [seePassword, setSeePassword] = useState(false);
  const form = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<registerFormSchemaType> = (data) => {
    const { email, password } = data;
    try {
      signIn('credentials', { email, password, callbackUrl: '/' });
    } catch (error: any) {
      form.setError('email', {
        message: error.message,
      });
    }
  };

  return (
    <div className="flex-center">
      {session ? (
        <span>
          {session?.user?.name} {session?.user?.email}
        </span>
      ) : (
        <span>Not logged in</span>
      )}
      <Card className="w-[350px] shadow-2xl">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Continue to _</CardDescription>
        </CardHeader>
        <CardContent>
          <OAuthLogin />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <motion.div>
                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div className="relative mt-2">
                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password..."
                          {...field}
                          type={seePassword ? 'text' : 'password'}
                        />
                      </FormControl>
                      {!seePassword ? (
                        <AiFillEyeInvisible
                          onClick={() => setSeePassword(!seePassword)}
                          size={24}
                          className="absolute w-5 cursor-pointer right-3 top-8 hover:text-muted-foreground transition-all"
                        />
                      ) : (
                        <AiFillEye
                          onClick={() => setSeePassword(!seePassword)}
                          size={24}
                          className="absolute w-5 cursor-pointer right-3 top-8 hover:text-muted-foreground transition-all"
                        />
                      )}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  type="submit"
                  className={cn('w-full', {
                    // hidden: formStep == 0,
                  })}
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <ImSpinner2 className="animate-spin" />
                    </>
                  ) : (
                    <span>Log In</span>
                  )}
                </Button>

                <Separator className="my-4" />
                <div className="flex-center text-xs">
                  <span className="text-[#a7a7a7]">No account yet?</span>
                  <Link
                    href="/register"
                    className="ml-2 underline font-bold"
                  >
                    Register
                  </Link>
                  .
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
