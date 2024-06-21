'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/Database_Connection'
import { MockInterview } from '@/utils/Schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, Mic, Volume2, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
const INTERVIEW = ({ params }) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })
  const [useranswer, setuseranswer] = useState('')
  const [currentIndex, SetIndex] = useState(0)
  const [webcamEnabled, SetWebcam] = useState(false)
  const [InterviewDetails, SetInterviewDetails] = useState([])
  const [seeusertext, setusertext] = useState(false)
  const GetInterviewDetails = async () => {
    console.log(params.interviewID)
    const Result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.MockId, params.interviewID))

    console.log('', JSON.parse(Result[0].jsonMockResp))

    SetInterviewDetails(JSON.parse(Result[0].jsonMockResp))
  }

  const TexttoSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    } else {
      alert('YOUR BROWSER DOES NOT SUPPORT SPEECH TO TEXT')
    }
  }

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  useEffect(() => {
    results.map((result) =>
      setuseranswer((prevResponse) => prevResponse + result?.transcript)
    )
  }, [results])
  return (
    <div className=" p-5 flex flex-col items-center ">
      <div className=" grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-10">
        <div className=" flex flex-col space-y-3  ">
          <h1 className=" font-bold text-2xl">Questions</h1>
          <div className="border-slate-200 p-2 space-y-3 rounded-lg border-2 flex  flex-col space-y- ">
            <div>
              {currentIndex > 5 ? (
                <div>Quiz End</div>
              ) : (
                <>
                  <h1 className=" text-xl  text-black">
                    Question {currentIndex + 1}
                  </h1>
                  <p className=" text-gray-700 font-bold text-justify">
                    {InterviewDetails[currentIndex]?.question}
                  </p>
                  <Volume2
                    className=" cursor-pointer"
                    onClick={() =>
                      TexttoSpeech(InterviewDetails[currentIndex]?.question)
                    }
                  />
                </>
              )}
            </div>

            <div className=" flex justify-end">
              <Button
                className=" text-white bg-green-500 hover:brightness-110 hover:bg-green-500"
                onClick={() => {
                  SetIndex((prev) => prev + 1)
                }}
              >
                Next
              </Button>
            </div>
          </div>

          <div className=" flex flex-col border-2 space-y-3 border-blue-300 p-2 bg-blue-200 rounded-lg">
            <span className=" flex items-center gap-2 text-blue-500">
              <Lightbulb /> Important !!
            </span>
            <p className=" capitalize text-justify text-blue-700 ">
              Click on the record button to answer each of the question. At the
              end of this mock interview, you will given the correct answers to
              these questions along with feedback of your given answers.
            </p>
          </div>
        </div>

        <div className=" flex flex-col justify-center items-center space-y-3">
          {webcamEnabled ? (
            <>
              <Webcam
                className=" w-80 h-72 p-2  "
                onUserMedia={() => SetWebcam(true)}
                onUserMediaError={() => SetWebcam(false)}
              />
            </>
          ) : (
            <>
              {/* <WebcamIcon
                className=" w-96 h-72
           bg-gray-200 cursor-pointer"
                onClick={() => SetWebcam(true)}
              /> */}
              <svg
                className=" w-96 h-72 bg-black rounded-lg cursor-pointer"
                onClick={() => SetWebcam(true)}
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                enable-background="new 0 0 48 48"
              >
                <path
                  fill="#455A64"
                  d="M36.5,44H11.5c-1.1,0-1.8-1.2-1.3-2.2L13,37h22l2.7,4.8C38.3,42.8,37.6,44,36.5,44z"
                />
                <circle fill="#78909C" cx="24" cy="23" r="18" />
                <path
                  fill="#455A64"
                  d="M24,35c-6.6,0-12-5.4-12-12c0-6.6,5.4-12,12-12s12,5.4,12,12C36,29.6,30.6,35,24,35z"
                />
                <circle fill="#42A5F5" cx="24" cy="23" r="9" />
                <path
                  fill="#90CAF9"
                  d="M28.8,20c-1.2-1.4-3-2.2-4.8-2.2s-3.6,0.8-4.8,2.2c-0.5,0.5-0.4,1.3,0.1,1.8c0.5,0.5,1.3,0.4,1.8-0.1 c1.5-1.7,4.3-1.7,5.8,0c0.3,0.3,0.6,0.4,1,0.4c0.3,0,0.6-0.1,0.9-0.3C29.2,21.4,29.3,20.5,28.8,20z"
                />
              </svg>
            </>
          )}
          {isRecording ? (
            <Button
              onClick={stopSpeechToText}
              className="text-white bg-red-500 transition animate-pulse hover:brightness-110 hover:bg-red-500"
            >
              <Mic className=" text-white" /> Recording....
            </Button>
          ) : (
            <Button
              onClick={startSpeechToText}
              className="text-white bg-green-500 hover:brightness-110 hover:bg-green-500"
            >
              Start Recording
            </Button>
          )}
        </div>
      </div>
      <div></div>
      {/* {seeusertext ? (
        <p className=" mt-5">{useranswer}</p>
      ) : (
        <>
          <Button className=" mt-5" onClick={() => setusertext(true)}>
            See User Answer
          </Button>
        </>
      )} */}
    </div>
  )
}

export default INTERVIEW
