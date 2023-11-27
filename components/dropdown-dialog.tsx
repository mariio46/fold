import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from './ui/button';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { TrashIcon } from '@radix-ui/react-icons';

interface Props {
    trigger_text: string;
    title?: string;
    variants?: any;
    description: string;
    cancel_text?: string;
    submit_text?: string;
    processing?: boolean;
    action: () => void;
}

export function DropdownDialog({
    trigger_text,
    variants = 'default',
    title = 'Are you absolutely sure?',
    description,
    cancel_text = 'Cancel',
    submit_text = 'Continue',
    action,
}: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                    <TrashIcon className='mr-2' />
                    {trigger_text}
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancel_text}</AlertDialogCancel>
                    <AlertDialogAction onClick={action} className={buttonVariants({ variant: variants })}>
                        {submit_text}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
