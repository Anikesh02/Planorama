import { getProject } from '@/actions/projects';
import { notFound } from 'next/navigation';
import React from 'react'

const ProjectPage = async ({params}) => {
  const {projectId} = params;

  const project = await getProject(projectId)
  if(!project){
    notFound();
  }

  return (
    <div>
      
    </div>
  )
}

export default ProjectPage