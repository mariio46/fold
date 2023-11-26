import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Todos, Users } from '@prisma/client';

async function getUsers() {
    const res = await fetch(`${process.env.BASE_URL}/api/users`, { next: { revalidate: 0 } });
    const json = res.json();
    return json;
}

export default async function Users() {
    const users = await getUsers();
    return (
        <div className='mx-auto my-8 max-w-[1480px]'>
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>All users in your website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Todos Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user: Users, i: number) => (
                                <TableRow key={user.id}>
                                    <TableCell className='font-medium'>{i + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    {/* @ts-ignore */}
                                    <TableCell>{user._count.todos}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
