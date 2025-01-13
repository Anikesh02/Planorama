"use client"

import { Button } from "@/components/ui/button";
import statuses from "@/data/status";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Plus } from "lucide-react";
import { useEffect, useState } from 'react';
import SprintManager from './sprint-manager';
import IssueCreationDrawer from "./create-issue";
import useFetch from "@/hooks/use-fetch";
import { getIssuesForSprint } from "@/actions/issues";
import { BarLoader } from "react-spinners";
import IssueCard from "@/components/issue-card";

const SprintBoard = ({sprints, projectId, orgId}) => {
    const [currentSprint, setCurrentSprint] = useState(
        sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
      );

      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const [selectedStatus, setSelectedStatus] = useState(null);

      const handleAddIssue = (status) => {
        setSelectedStatus(status);
        setIsDrawerOpen(true)
      }

      const {
        loading: issuesLoading,
        error: issuesError,
        fn: fetchIssues,
        data: issues,
        setData: setIssues,
      } = useFetch(getIssuesForSprint)


      useEffect(()=>{
        if(currentSprint.id){
            fetchIssues(currentSprint.id);
        }
      },[currentSprint.id])

      const [filteredIssues, setFilteredIssues] = useState(issues);

      const handleIssueCreated = () => {
        fetchIssues(currentSprint.id);
      }
      if(issuesError) return <div>Error loading issues</div>

      const onDragEnd = () => {}

  return (
    <div>
        {/* Sprint Manager  */}
        <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
        projectId={projectId}
        />

        {issuesLoading && (
            <BarLoader width={"100%"} className="mt-4" color='#36d7b7' />
        )}

        {/* Kanban Board  */}
        <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 p-4 bg-slate-900 rounded-lg'>
            {statuses.map((column)=>(
                <Droppable key={column.key} droppableId={column.key}>
                    {(provided)=>{
                       return (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                            <h3 className="font-semibold mb-1 text-center">{column.name}</h3>
                            {/* Issues  */}
                            {issues?.filter((issue)=>issue.status === column.key).map((issue, index)=>(
                                <Draggable key={issue.id} draggableId={issue.id} index={index}>
                                {(provided)=>{
                                    return ( <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                            <IssueCard issue={issue} />
                                        </div>
                                    )
                                }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {column.key === "TODO" && currentSprint.status !== "COMPLETED" && (
                                <Button variant="ghost" className="w-full" onClick={()=>handleAddIssue(column.key)}>
                                    <Plus className="mr-2 h-4 w-4" />Create Issue
                                </Button>
                            )
                            
                            }
                        </div>
                       )
                    }}
                </Droppable>
            ))}
        </div>
        </DragDropContext>
        <IssueCreationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sprintId={currentSprint.id}
        status={selectedStatus}
        projectId={projectId}
        onIssueCreated={handleIssueCreated}
        orgId={orgId}
        />
    </div>
  )
}

export default SprintBoard