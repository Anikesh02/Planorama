import { getProject } from '@/actions/projects';
import SprintCreationForm from '@/app/(main)/project/components/create-sprint';
import { notFound } from 'next/navigation';
import SprintBoard from '../components/sprint-board';

const ProjectPage = async ({params}) => {
  const {projectId} = params;

  const project = await getProject(projectId)
  if(!project){
    notFound();
  }

  return (
    <div container mx-auto>
      {/* Sprint Creation  */}
      <SprintCreationForm
      projectTitle={project.name}
      projectId={projectId}
      projectKey = {project.key}
      sprintKey={project.sprints?.length+1}
      />

      {/* Sprint Board  */}
      {project.sprints.length>0?(
        <SprintBoard
          sprints={project.sprints}
          projectId={projectId}
          orgId={project.organizationId}
        />
      ):(
        <div>Create a Sprint from button above</div>
      )}
    </div>
  )
}

export default ProjectPage