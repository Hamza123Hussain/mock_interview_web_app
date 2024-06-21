'use client'
import { db } from '@/utils/Database_Connection'
import { MockInterview } from '@/utils/Schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const INTERVIEW = ({ params }) => {
  const [InterviewDetails, SetInterviewDetails] = useState()
  const GetInterviewDetails = async () => {
    console.log(params.interviewID)
    const Result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.MockId, params.interviewID))

    console.log(Result)

    SetInterviewDetails(Result[0])
  }

  useEffect(() => {
    GetInterviewDetails()
  }, [])
  return <div>111111</div>
}

export default INTERVIEW
