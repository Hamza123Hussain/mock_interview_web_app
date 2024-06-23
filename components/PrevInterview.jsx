'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useUser } from '@clerk/nextjs'
import { db } from '../utils/Database_Connection'
import { MockInterview } from '../utils/Schema'

const PrevInterview = () => {
  const { user } = useUser()
  const [loader, setLoader] = useState(true)
  const [prevInterviewDetails, setDetails] = useState([])
  const router = useRouter()

  const getPreviousInterviews = async () => {
    const result = await db.select().from(MockInterview)
    setDetails(result)
    setLoader(false)
  }

  useEffect(() => {
    if (user) {
      getPreviousInterviews()
    }
  }, [user])

  if (prevInterviewDetails.length > 1) {
    console.log(prevInterviewDetails)
  }

  console.log(user?.primaryEmailAddress?.emailAddress)
  return (
    <div>
      {loader ? (
        <div className="flex gap-10 justify-center items-center px-10 py-32">
          <div className="spinner2">
            <div className="loader l1"></div>
            <div className="loader l2"></div>
          </div>
          <div className="spinner2">
            <div className="loader l1"></div>
            <div className="loader l2"></div>
          </div>
          <div className="spinner2">
            <div className="loader l1"></div>
            <div className="loader l2"></div>
          </div>
          <div className="spinner2">
            <div className="loader l1"></div>
            <div className="loader l2"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-5">
          <h1 className="font-bold text-lg">Previous Interviews</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5 mt-5">
            {prevInterviewDetails.map((element, index) => (
              <div
                key={index}
                className="border-2 border-slate-200 rounded-lg bg-slate-100 flex flex-col justify-center"
              >
                <div className="text-xs sm:text-sm">
                  <p className="p-2">Job Position: {element?.JobPosition}</p>
                  <p className="p-2 text-justify">
                    Job Description: {element?.JobDescription}
                  </p>
                  <p className="p-2">
                    Years Of Experience: {element?.JobExperience}
                  </p>
                  <p className="p-2">Created By: {element?.CreatedBy}</p>
                </div>
                <div className="p-2 flex flex-col justify-end sm:flex-row gap-5">
                  <Button
                    onClick={() =>
                      router.push(`/Interview/${element.MockId}/EndInterview`)
                    }
                    className="bg-white text-blue-300 border-2 border-slate-600"
                  >
                    View Feedback
                  </Button>
                  <Button
                    onClick={() =>
                      router.push(`/Interview/${element.MockId}/StartInterview`)
                    }
                    className="bg-green-500 hover:brightness-105 hover:bg-green-500"
                  >
                    Start Again
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PrevInterview
