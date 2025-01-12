"use client"

import { useState } from 'react';
import SprintManager from './sprint-manager';

const SprintBoard = ({sprints, projectId, orgId}) => {
    const [currentSprint, setCurrentSprint] = useState(
        sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
      );
  return (
    <div>
        {/* Sprint Manager  */}
        <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
        projectId={projectId}
        />

        {/* Kanban Board  */}
    </div>
  )
}

export default SprintBoard