import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import * as icons from '@tabler/icons-react';
import { Icon } from './icon';
import { DropdownMenuItem } from './ui/dropdown-menu';

interface Props {
    trigger_text: string;
    title?: string;
    description: string;
    children: React.ReactNode;
    icon: keyof typeof icons;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function DropdownDialog({
    trigger_text,
    title = 'Are you absolutely sure?',
    description,
    children,
    icon,
    open,
    setOpen,
}: Props) {
    return (
        <>
            <DropdownMenuItem
                onSelect={(event) => {
                    event.preventDefault();
                    setOpen(true);
                }}>
                <Icon name={icon} className='mr-2' />
                {trigger_text}
            </DropdownMenuItem>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
