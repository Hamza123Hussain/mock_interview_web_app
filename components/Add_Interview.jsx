'use client'
import { CirclePlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { chatSessions } from '../utils/GemniAiModel'
import { db } from '../utils/Database_Connection'
import { MockInterview } from '../utils/Schema'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { desc, eq } from 'drizzle-orm'

const AddInterview = () => {
  const [loading, setloading] = useState(false)
  const [loader, setloader] = useState(true)
  const { user } = useUser()
  // const [isopen, setopen] = useState(false)

  const Router = useRouter()

  const [InputValues, SetInputValues] = useState({
    Job_Position: '',
    Job_Description: '',
    Year_Of_Experience: undefined,
  })

  const [previnterviewdetails, setdetails] = useState([])

  const GenerateAiText = async () => {
    setloading(true)
    const InputPrompt = `Read the Job Postion:${InputValues.Job_Position}, Job Description: ${InputValues.Job_Description} and The Years of Experience: ${InputValues.Year_Of_Experience}. After Reading this Data, Give Me 5 Interview Questions along with the answers. The Questions and Answers should given in json format only. Just Give Me The Questions and Answers in Json and No other text.`

    const Result = await chatSessions.sendMessage(InputPrompt)

    const MockResponse = Result.response
      .text()
      .replace('```json', '')
      .replace('```', '')

    if (MockResponse) {
      const Response_Of_DB = await db
        .insert(MockInterview)
        .values({
          MockId: uuidv4(),
          jsonMockResp: MockResponse,
          JobPosition: InputValues.Job_Position,
          JobDescription: InputValues.Job_Description,
          JobExperience: InputValues.Year_Of_Experience,
          CreatedBy: user?.primaryEmailAddress?.emailAddress,
          CreatedAt: moment().format('DD-MM-yyyy'),
        })
        .returning({ MockId: MockInterview.MockId })
      //   console.log('INSERTED ID :', Response_Of_DB)
      setloading(false)

      Router.push(`/Interview/${Response_Of_DB[0]?.MockId}`)
    }
  }

  const UpdateInput = (name, Value) => {
    SetInputValues((Input) => ({
      ...Input,
      [name]: Value,
    }))
  }
  // console.log(InputValues)

  const GetPreviousInterviews = async () => {
    const Result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(
          '70110719@student.uol.edu.pk',
          user?.primaryEmailAddress?.emailAddress
        )
      )

    setdetails(Result)
    setloader(false)
  }

  useEffect(() => {
    user && GetPreviousInterviews()
  }, [user])

  if (previnterviewdetails.length > 1) {
    console.log(previnterviewdetails)
  }

  console.log(user?.primaryEmailAddress?.emailAddress)
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {' '}
          <div className=" flex flex-col justify-start items-start">
            <div className=" bg-slate-200  flex flex-col p-5 gap-4 justify-center items-center  w-[20vw]  border-slate-300 ">
              <p className=" text-xs    ">Add A NEW INTERVIEW</p>
              <CirclePlus size={50} className=" cursor-pointer" />
            </div>{' '}
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
                  Add Details for the Job Positon, Its Description and Years of
                  Experience Required
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
                    onChange={(e) => UpdateInput(e.target.name, e.target.value)}
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
                    onChange={(e) => UpdateInput(e.target.name, e.target.value)}
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
                    onChange={(e) => UpdateInput(e.target.name, e.target.value)}
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
                      {loading ? (
                        <div className=" flex items-center gap-2">
                          <span> Generating Data From AI</span>
                          <div class="spinner"></div>
                        </div>
                      ) : (
                        'Start Interview'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>{' '}
      {loader ? (
        <div className=" flex gap-10  justify-center items-center px-10 py-32 ">
          <div class="spinner2">
            <div class="loader l1"></div>
            <div class="loader l2"></div>
          </div>
          <div class="spinner2">
            <div class="loader l1"></div>
            <div class="loader l2"></div>
          </div>
          <div class="spinner2">
            <div class="loader l1"></div>
            <div class="loader l2"></div>
          </div>

          <div class="spinner2">
            <div class="loader l1"></div>
            <div class="loader l2"></div>
          </div>
        </div>
      ) : (
        <>
          {' '}
          <div className=" flex flex-col justify-start items-start p-5">
            <h1 className="  font-bold text-lg">Previous Interviews</h1>{' '}
            <div className=" grid grid-cols-2 sm:grid-cols-2 items-center gap-5 mt-5">
              {previnterviewdetails.map((element, index) => {
                return (
                  <div
                    key={index}
                    className=" flex flex-col items-start gap-2 border-2 border-slate-200 rounded-lg bg-slate-100 "
                  >
                    <p className=" p-2">
                      {' '}
                      Job Positon : {element?.JobPosition}
                    </p>
                    <p className=" p-2  text-justify">
                      Job Description : {element?.JobDescription}
                    </p>
                    <p className=" p-2">
                      Years Of Experience : {element?.JobExperience}
                    </p>
                    <div className=" p-2 flex  gap-10">
                      <Button className=" bg-white text-blue-300 border-2 border-slate-600">
                        View FeedBack
                      </Button>
                      <Button className=" bg-green-500 hover:brightness-105 hover:bg-green-500 ">
                        {' '}
                        Start Again
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AddInterview
