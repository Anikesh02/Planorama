"use client"
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import IssueDetailsDialog from './issue-details-dialog';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import UserAvatar from './user-avatar';

const priorityColor = {
  LOW: "border-green-600",
  MEDIUM: "border-yellow-300",
  HIGH: "border-orange-400",
  URGENT: "border-red-400",
};

const IssueCard = ({
  issue,
  showStatus = false,
  onDelete = () => {},
  onUpdate = () => {},
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const onDeleteHandler = (...params) => {
    router.refresh();
    onDelete(...params);
  }

  const onUpdateHandler = (...params) => {
    router.refresh();
    onUpdate(...params);
  }

  const created = formatDistanceToNow(new Date(issue.createdAt), {addSuffix : true,});

  return (
    <>
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={()=>setIsDialogOpen(true)}>
    <CardHeader className={`border-t-2 ${priorityColor[issue.priority]} rounded-lg`}>
      <CardTitle>{issue.title}</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-2 -mt-3">
      {showStatus && <Badge>{issue.status}</Badge>}
      <Badge variant="outline" className="-ml-1">{issue.priority}</Badge>
      
    </CardContent>
    <CardFooter className="flex flex-col items-start space-y-3">
      
      <UserAvatar user={issue.assignee} />
      <div className='text-xs text-gray-400 w-full'>Created {created}</div>
    </CardFooter>
    </Card>
    {isDialogOpen && <IssueDetailsDialog
    isOpen={isDialogOpen}
    onClose={()=>setIsDialogOpen(false)}
    issue={issue}
    onDelete={onDeleteHandler}
    onUpdate={onUpdateHandler}
    borderCol={priorityColor[issue.priority]}
    />}
    </>
  )
}

export default IssueCard