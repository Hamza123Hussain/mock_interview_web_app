'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/Database_Connection'
import { UserAnswer } from '../../../../utils/Schema'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../components/ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { useRouter } from 'next/navigation'

const EndInterview = ({ params }) => {
  const [loading, setloading] = useState(true)
  const [overallrating, setrating] = useState(0)
  const [isopen, setopen] = useState(false)
  const [FeedBackData, setFeedbackData] = useState([])
  const Router = useRouter()
  const GetFeedBackData = async () => {
    const FeedBackResult = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.MockIdREF, params.interviewID))
      .orderBy(UserAnswer.id)

    console.log(FeedBackResult)
    setFeedbackData(FeedBackResult)
    setloading(false)
    if (FeedBackResult.length > 0) {
    }
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
                <div className=" capitalize p-2  text-white rounded-lg text-xs sm:text-sm bg-red-500 ">
                  <p className=" text-center">
                    {' '}
                    You have Failed This Interview.
                  </p>
                  <p>But do not get de-motivated and Give Another Try</p>
                </div>
              )}
            </div>
          </div>
          <div className=" flex flex-col justify-center p-3  gap-5 items-center">
            {FeedBackData.map((element, index) => {
              return (
                <div
                  key={element?.id}
                  className=" border-2 rounded-lg border-slate-600 p-1.5 sm:p-4    sm:w-[700px]"
                >
                  <Collapsible>
                    <div className="  flex  items-center   gap-2  ">
                      <div className=" font-bold  sm:text-sm  text-pretty text-justify sm:text-justify flex flex-col">
                        <p>Question {index + 1}</p>
                        <p> {element?.Question}</p>
                      </div>
                      <CollapsibleTrigger className="">
                        {!isopen ? (
                          <ChevronDown onClick={() => setopen(true)} />
                        ) : (
                          <ChevronUp onClick={() => setopen(false)} />
                        )}
                      </CollapsibleTrigger>{' '}
                    </div>
                    <CollapsibleContent>
                      <div className=" flex flex-col mt-5 gap-2 text-pretty  text-justify">
                        <div className=" flex flex-col gap-1 bg-gray-300 rounded-lg p-2">
                          {' '}
                          <p>User Answer</p>
                          <p className=" ">{element?.UserAns}</p>
                        </div>
                        <div className="  flex flex-col gap-1 bg-blue-300 rounded-lg p-2">
                          <p>FeedBack</p>
                          <p>{element?.feedback}</p>
                        </div>
                        <div className=" flex flex-col gap-1  bg-green-400 rounded-lg p-2">
                          <p> Correct Answer</p>
                          <p>{element?.CorrectAns}</p>
                        </div>

                        <p className=" bg-red-300 rounded-lg p-2">
                          {' '}
                          Rating : {element?.rating}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )
            })}
          </div>
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
