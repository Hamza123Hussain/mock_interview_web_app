'use client'
import { CirclePlus } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { chatSessions } from '@/utils/GemniAiModel'

const AddInterview = () => {
  // const [isopen, setopen] = useState(false)

  const [InputValues, SetInputValues] = useState({
    Job_Position: '',
    Job_Description: '',
    Year_Of_Experience: null,
  })

  const GenerateAiText = async () => {
    const InputPrompt = `Read the Job Postion:${InputValues.Job_Position}, Job Description: ${InputValues.Job_Description} and The Years of Experience: ${InputValues.Year_Of_Experience}. After Reading this Data, Give Me 5 Interview Questions along with the answers. The Questions and Answers should given in json format only`

    const Result = await chatSessions.sendMessage(InputPrompt)

    console.log(Result.response.text())
  }

  const UpdateInput = (name, Value) => {
    SetInputValues((Input) => ({
      ...Input,
      [name]: Value,
    }))
  }
  console.log(InputValues)
  return (
    <>
      <div className=" p-2 grid grid-cols-6">
        <div className="  bg-gray-200 border-2 flex justify-center items-center  border-slate-300 ">
          <Dialog>
            <DialogTrigger>
              {' '}
              <div className="flex flex-col gap-4 justify-center items-center border-slate-300 sm:w-[150px] sm:h-[150px]">
                <p className=" text-xs   ">Add A NEW INTERVIEW</p>
                <CirclePlus size={50} className=" cursor-pointer" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {' '}
                  <div className=" flex flex-col items-start">
                    <h6 className=" font-bold">
                      Provide Important Details About the Job
                    </h6>
                    <h6 className=" text-gray-500 text-xs">
                      Add Details for the Job Positon, Its Description and Years
                      of Experience Required
                    </h6>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className=" space-y-4">
                    <div className=" flex flex-col items-start gap-1">
                      <label className=" font-bold">Job Position</label>
                      <input
                        name="Job_Position"
                        className=" p-2 outline-2 outline focus:outline-slate-700 outline-slate-200 rounded-lg w-full text-gray-500"
                        type="text"
                        placeholder="Example Nextjs Developer"
                        value={InputValues.Job_Position}
                        onChange={(e) =>
                          UpdateInput(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className=" flex flex-col items-start gap-1">
                      <label className=" font-bold">Job Description</label>
                      <input
                        name="Job_Description"
                        className=" p-2 outline-2 outline focus:outline-slate-700 outline-slate-200 rounded-lg w-full text-gray-500"
                        type="text"
                        value={InputValues.Job_Description}
                        placeholder="Example create unqiue websites"
                        onChange={(e) =>
                          UpdateInput(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className=" flex flex-col items-start gap-1">
                      <label className=" font-bold">Years Of Experience</label>
                      <input
                        name="Year_Of_Experience"
                        className=" p-2 outline-2 outline focus:outline-slate-700 outline-slate-200 rounded-lg w-full text-gray-500"
                        type="number"
                        value={InputValues.Year_Of_Experience}
                        placeholder="Example 6"
                        onChange={(e) =>
                          UpdateInput(e.target.name, e.target.value)
                        }
                      />
                      <div className=" space-x-5 mt-5 flex  items-center">
                        <Button className=" bg-white text-red-500 border-2 border-slate-100 ">
                          {' '}
                          Cancel
                        </Button>
                        <Button
                          onClick={() => GenerateAiText()}
                          className=" bg-green-400 text-white hover:brightness-105 hover:bg-green-400 border-2 border-slate-100 "
                        >
                          {' '}
                          Start Interview
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>{' '}
        </div>
      </div>
    </>
  )
}

export default AddInterview
