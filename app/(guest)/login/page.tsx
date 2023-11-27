import PrimaryLink from '@/components/primary-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

                    <div className='mt-4 block'>
                        <label className='flex items-center'>
                            <Checkbox name='remember' />
                            <span className='ml-2 text-sm text-muted-foreground'>Remember me</span>
                        </label>
                    </div>

                    <div className='mt-4 flex items-center justify-between'>
                        <PrimaryLink href={'/'}>back</PrimaryLink>
                        <div>
                            <PrimaryLink href={'/register'}>register?</PrimaryLink>
                            <Button className='ml-4'>Log in</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
