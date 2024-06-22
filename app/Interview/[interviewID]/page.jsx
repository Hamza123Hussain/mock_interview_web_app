'use client'
import { Button } from '../../../components/ui/button'
import { db } from '../../../utils/Database_Connection'
import { MockInterview } from '../../../utils/Schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const INTERVIEW = ({ params }) => {
  const Router = useRouter()
  const [webcamEnabled, SetWebcam] = useState(false)
  const [InterviewDetails, SetInterviewDetails] = useState()
  const GetInterviewDetails = async () => {
    console.log(params.interviewID)
    const Result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.MockId, params.interviewID))

    // console.log(Result)

    SetInterviewDetails(Result[0])
  }

  useEffect(() => {
    GetInterviewDetails()
  }, [])
  return (
    <div className=" p-5 ">
      <strong className=" text-2xl">Let&apos;s Start</strong>

      <div className=" grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-10">
        <div className=" flex flex-col space-y-3 mt-5 ">
          <div className="border-slate-200 p-2 space-y-3 rounded-lg border-2 flex flex-col space-y- ">
            <strong className=" text-xl">
              Job Position : {InterviewDetails?.JobPosition}
            </strong>
            <strong className=" text-xl">
              Tech Stack : {InterviewDetails?.JobDescription}
            </strong>
            <strong className=" text-xl">
              Years Of Experience : {InterviewDetails?.JobExperience}
            </strong>
          </div>

          <div className=" flex flex-col border-2 space-y-3 border-yellow-300 p-2 bg-yellow-200 rounded-lg">
            <span className=" flex items-center gap-2 text-yellow-500">
              <Lightbulb /> Important Information
            </span>
            <p className=" capitalize text-justify text-yellow-600">
              Enable Web Cam and MicroPhone to Begin your Mock AI Generated
              Interview. It would consist of 5 questions and at the end of the
              Quiz,You will be provided a detailed report that would show
              details regarding your performance in the Quiz.
            </p>
          </div>
        </div>

        <div className=" flex flex-col justify-center items-center space-y-3">
          {webcamEnabled ? (
            <>
              <Webcam
                className=" w-96 h-72  "
                onUserMedia={() => SetWebcam(true)}
                onUserMediaError={() => SetWebcam(false)}
              />
            </>
          ) : (
            <>
              <WebcamIcon
                className=" w-96 h-72
           bg-gray-200"
              />
              <Button
                onClick={() => SetWebcam(true)}
                className="text-white bg-green-500"
              >
                Enable WebCam and MicroPhone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className=" flex justify-end mt-10">
        <Button
          onClick={() => {
            Router.push(`/Interview/${params.interviewID}/StartInterview`)
          }}
        >
          Start Interview
        </Button>
      </div>
    </div>
  )
}

export default INTERVIEW
