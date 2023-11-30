import PrimaryLink from '@/components/primary-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Login / ${process.env.APP_NAME}`,
};

export default function Login() {
    return (
        <Card className='w-full max-w-lg'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Welcome back, enter your credentials to continue.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            autoFocus
                            autoComplete='email'
                            className='mt-1 block w-full'
                            required
                        />
                    </div>

                    <div className='mt-4'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='password'
                            className='mt-1 block w-full'
                            required
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className='mt-4 justify-between'>
                <PrimaryLink href={'/'}>back</PrimaryLink>
                <div>
                    <PrimaryLink href={'/register'}>register?</PrimaryLink>
                    <Button className='ml-4'>Log in</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
