'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/Database_Connection'
import { UserAnswer } from '../../../../utils/Schema'
import { eq } from 'drizzle-orm'

import { Button } from '../../../../components/ui/button'
import { useRouter } from 'next/navigation'
import End_Interview from '../../../../components/End_Interview'
const EndInterview = ({ params }) => {
  const [loading, setloading] = useState(true)
  const [overallrating, setrating] = useState(0)

  const Router = useRouter()
  const GetFeedBackData = async () => {
    const FeedBackResult = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.MockIdREF, params.interviewID))
      .orderBy(UserAnswer.id)

    console.log(FeedBackResult)

    setloading(false)

    const totalRating = FeedBackResult.reduce(
      (sum, item) => sum + parseInt(item.rating, 10),
      0
    )
    const averageRating = totalRating / 5
    setrating(averageRating)
  }

  useEffect(() => {
    GetFeedBackData()
  }, [])

  return (
    <div>
      {loading ? (
        <div className=" flex gap-10  justify-center items-center px-10 py-52 ">
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
          <div className="  px-4 py-2 flex flex-col items-center">
            <p className=" "> Overall Rating: {overallrating.toFixed(1)}</p>
            <div className="">
              {overallrating > 7 ? (
                <p className=" capitalize p-2 bg-green-500 rounded-lg ">
                  Congratulations, You have Passed This Interview.
                </p>
              ) : (
                <>
                  <div className=" capitalize p-2 mb-4  text-white rounded-lg text-xs sm:text-sm bg-red-500 ">
                    <p className=" text-center">
                      {' '}
                      You have Failed This Interview.
                    </p>
                    <p className=" text-center">
                      But do not get de-motivated and Give Another Try
                    </p>
                  </div>
                  <End_Interview interviewID={params.interviewID} />
                </>
              )}
            </div>
          </div>
          <div className=" flex flex-col justify-center p-3  gap-5 items-center"></div>
          <div className=" flex justify-center items-center mb-4">
            <Button
              onClick={() => Router.push('/')}
              className="bg-green-400 rounded-lg p-4"
            >
              GO TO HOME
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default EndInterview
