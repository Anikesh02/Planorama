"use client"

import { createSprint } from "@/actions/sprints";
import { sprintSchema } from "@/app/lib/validators";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";

const SprintCreationForm = ({projectTitle, projectId, projectKey, sprintKey,}) => {

    const [showForm, setShowForm] = useState(false);
    const [dateRange, setDateRange] = useState({
      from:new Date(),
      to:addDays(new Date(), 14),
    })
    const router = useRouter();
    const {register, handleSubmit, formState:{errors}, control} = useForm({
        resolver: zodResolver(sprintSchema),
        defaultValues:{
            name: `${projectKey}-${sprintKey}`,
            startDate: dateRange.from,
            endDate: dateRange.to,
        },
    });

    const { loading: createSprintLoading, fn: createSprintFn } = useFetch(createSprint);
    const onSubmit = async (data) => {
      try {
        await createSprintFn(projectId, {
          ...data, startDate: dateRange.from, endDate: dateRange.to,
        });
        setShowForm(false);
        toast.success("Sprint Created Successfully");
        router.refresh();
      } catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('name')) {
          toast.error("A sprint with this name already exists. Please choose a different name.");
        } else {
          toast.error("An error occurred while creating the sprint. Please try again.");
        }
      }
    }


  return (
    <>
    <div className="flex justify-between">
        <h1 className="text-5xl font-bold mb-8 gradient-title">{projectTitle}</h1>
        <Button className="mt-2" onClick={()=>setShowForm(!showForm)} variant={showForm?"destructive":"default"}>{showForm?"Cancel":"Create New Sprint"}</Button>
    </div>
    {showForm && <Card className="pt-4 mb-4">
      <CardContent>
        <form className="flex gap-4 items-end" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Sprint Name</label>
            <Input id="name" readOnly className="bg-slate-950" {...register("name")} />
            {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Sprint Duration</label>
            <Controller
              control={control} name="dateRange" render={({field})=>{
                return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant='outline' className={`w-full justify-start text-left font-normal bg-slate-950 ${!dateRange && "text-muted-foreground"}`}>
                      <CalendarIcon className="mr-2 h-4 w-4"/>
                      {dateRange.from && dateRange.to?(
                        format(dateRange.from,"LLL dd, y")+" - "+format(dateRange.to,"LLL dd, y")
                      ):(
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto bg-slate-900" align="start">
                      <DayPicker
                      mode="range" selected={dateRange}
                      onSelect={(range)=>{
                        if(range?.from && range?.to){
                          setDateRange(range);
                          field.onChange(range);
                        }
                      }}
                      classNames={{
                        chevron: "fill-blue-500",
                        range_start: "bg-blue-700",
                        range_end: "bg-blue-700",
                        range_middle: "bg-blue-400",
                        day_button: "border-none",
                        today: "border-2 border-blue-700",
                      }}
                      />
                  </PopoverContent>
                </Popover>
                )
              }}
            />
          </div>
          <Button type='submit' disabled={createSprintLoading}>{createSprintLoading?"Creating...":"Create Sprint"}</Button>
        </form>
      </CardContent>
      </Card>}
    </>
  )
}

export default SprintCreationForm