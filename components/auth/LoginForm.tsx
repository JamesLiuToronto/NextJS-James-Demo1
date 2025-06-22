'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie'
import type { LoginUser } from '@/types/user'

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Invalid email',
    })
    .min(1, {
      message: 'Email is required',
    }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setError('')
    try {
      const response = await fetch('http://localhost:3001/users')
      if (!response.ok) {
        setError('Login service unavailable')
        return
      }
      const users: LoginUser[] = await response.json()
      const user = users.find((u) => u.email === data.email && u.password === data.password)
      if (user) {
        Cookies.set('isLoggedIn', 'true')
        router.push('/')
      } else {
        setError('Invalid email or password')
      }
    } catch {
      setError('Invalid email or password')
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Log into your account with your credentials
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        {error && (
          <div className='text-red-500 text-sm mb-2'>{error}</div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                      placeholder='Enter email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      className='bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                      placeholder='Enter password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='w-full'>Sign In</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;