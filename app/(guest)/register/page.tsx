import PrimaryLink from '@/components/primary-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
    return (
        <Card className='w-full max-w-lg'>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Hii, enter the fields below to register.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            id='name'
                            name='name'
                            type='name'
                            autoComplete='name'
                            className='mt-1 block w-full'
                            autoFocus
                            required
                        />
                    </div>

                    <div className='mt-4'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
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
                            required
                            className='mt-1 block w-full'
                        />
                    </div>

                    <div className='mt-4'>
                        <Label htmlFor='password_confirmation'>Confirm Password</Label>
                        <Input
                            id='password_confirmation'
                            name='password_confirmation'
                            autoComplete='password_confirmation'
                            type='password'
                            className='mt-1 block w-full'
                            required
                        />
                    </div>

                    <div className='mt-4 flex items-center justify-between'>
                        <PrimaryLink href={'/'}>back</PrimaryLink>
                        <div>
                            <PrimaryLink href={'/login'}>login?</PrimaryLink>
                            <Button className='ml-4' type='submit'>
                                Register
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
