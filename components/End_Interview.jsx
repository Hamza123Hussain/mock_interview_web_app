'use client'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { db } from '../utils/Database_Connection'
import { UserAnswer } from '../utils/Schema'
import { eq } from 'drizzle-orm'
const End_Interview = ({ interviewID }) => {
  const [isopen, setopen] = useState(false)
  const [FeedBackData, setFeedbackData] = useState([])
  const GetFeedBackData = async () => {
    const FeedBackResult = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.MockIdREF, interviewID))
      .orderBy(UserAnswer.id)

    console.log(FeedBackResult)
    setFeedbackData(FeedBackResult)

    if (FeedBackResult.length > 0) {
    }
  }
  useEffect(() => {
    GetFeedBackData()
  }, [])

  return (
    <div className=" flex flex-col gap-4">
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
  )
}

export default End_Interview
