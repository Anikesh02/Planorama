import { getOrganization } from "@/actions/organization";
import ProjectList from "@/app/(main)/organization/[orgId]/_components/project-list";
import OrgSwitcher from "@/components/org-switcher";

const Organization = async ({params}) => {
    const {orgId} = params;
    const organization =  await getOrganization(orgId);
    if(!organization){
        return <div>Organization Not Found</div>
    }
  return (
    <div className="container mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
            <h1 className="text-5xl font-bold gradient-title pb-2">{organization.name}&apos;s Project</h1>

            {/* Organization Switch  */}
            <OrgSwitcher />
        </div>
        <div className="mb-4">
            <ProjectList orgId = {organization.id} />
        </div>
        <div className="mt-8">Show User Assigned And Reported Issues Here</div>

    </div>
  )
}

export default Organization