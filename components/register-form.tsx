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
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { z } from 'zod';
import OAuthLogin from './oauth-login';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { ImSpinner2 } from 'react-icons/im';
import { register } from '@/actions/register';
import { useRouter } from 'next/navigation';

type registerFormSchemaType = z.infer<typeof registerFormSchema>;

enum FormSteps {
  EmailPass = 0,
  Other = 1,
}

export default function RegisterForm() {
  // const { toast } = useToast();
  // const [formStep, setFormStep] = useState(FormSteps.EmailPass);
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);
  const form = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: registerFormSchemaType) {
    // if (data.confirmPassword !== data.password) {
    //   toast({
    //     title: 'Passwords do not match',
    //     variant: 'destructive',
    //   });
    //   return;
    // }
    // form.setError('email', {
    //   type: 'required',
    //   message: 'Email is required',
    // });
    // return;

    try {
      await register(data.email, data.password);
      router.push('/');
    } catch (error: any) {
      form.setError('email', {
        message: error.message,
      });
    }
    // alert(JSON.stringify(data, null, 4));
  }

  const nextStepValidation = () => {
    // validation
    form.trigger(['email']);
    const emailState = form.getFieldState('email');

    if (!emailState.isDirty || emailState.invalid) return;
    // setFormStep(FormSteps.Password);
  };

  return (
    <div className="flex-center">
      <Card className="w-[350px] shadow-2xl">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>to get started, sign up now</CardDescription>
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
                    <span>Save</span>
                  )}
                </Button>

                <Separator className="my-4" />
                <div className="flex-center text-xs">
                  <span className="text-[#a7a7a7]">
                    Already have an account?
                  </span>
                  <Link href="/login" className="ml-2 underline font-bold">
                    Log in here
                  </Link>
                  .
                </div>

                {/* <Button
                  type="button"
                  variant={'ghost'}
                  className={cn('w-full bg-primary text-accent', {
                    hidden: formStep == FormSteps.Other,
                  })}
                  onClick={nextStepValidation}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => {
                    setFormStep((prev) => prev - 1);
                  }}
                  className={cn({
                    hidden: formStep == 0,
                  })}
                >
                  Go Back
                </Button> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
