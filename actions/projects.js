"use server"

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data){
    const {userId, orgId} = auth();
    if(!userId){
        throw new Error("User not authenticated");
    }
    if(!orgId){
        throw new Error("Organization not found");
    }

    const {data:membership} = await clerkClient().organizations.getOrganizationMembershipList({organizationId: orgId,});
    const userMembership = membership.find((member)=>member.publicUserData.userId === userId);

    if(!userMembership || userMembership.role !== "org:admin"){
        throw new Error("Only Organization Admin Can Create Projects");
    }

    try {
        const project = await db.project.create({
            data:{
                name: data.name,
                key: data.key,
                description: data.description,
                organizationId: orgId
            }
        })
        return project;
    } catch (error) {
        throw new Error("Error Creating Project: " + error.message);
    }
}

export async function getProjects(orgId){
    const {userId} = auth();
    if(!userId){
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: {clerkUserId: userId},
    })

    if(!user){
        throw new Error("User not found");
    }

    const projects = await db.project.findMany({
        where: {organizationId: orgId},
        orderBy: {createdAt: "desc"},
    });
    return projects;
}

export async function deleteProjects(projectId){
    const {userId, orgId, orgRole} = auth();
    if(!userId || !orgId){
        throw new Error("User not authenticated");
    }
    if(orgRole !== "org:admin"){
        throw new Error("Only Organization Admins Can Delete Projects");
    }

    const project = await db.project.findUnique({
        where: {id: projectId},
    });

    if(!project || project.organizationId !== orgId){
        throw new Error("Project not found or you don't have permission to delete this project");
    }

    await db.project.delete({
        where: {id: projectId},
    });

    return {success:true};
}

export async function getProject(projectId){
    const {userId, orgId} = auth();
    if(!userId || !orgId){
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: {clerkUserId: userId},
    })

    if(!user){
        throw new Error("User not found");
    }

    const project = await db.project.findUnique({
        where: {id: projectId},
        include:{
            sprints:{
                orderBy: {createdAt: "desc"},
            },
        },
    });

    if(!project){
        return null;
    }

    if(project.organizationId != orgId){
        return null;
    }
    
    return project;
}