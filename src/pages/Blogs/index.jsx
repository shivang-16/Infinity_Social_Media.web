import React, { useEffect, useState } from "react";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import "./gpt.module.scss";
import RightSidebar from "../HomePage/RightSideBar/RightSidebar";
import OpenAI from "openai";
import InProgress from '../../assets/workinprogress.gif'

const Blog = () => {
  // console.log(import.meta.env.VITE_OPEN_AI_API)
  const [prompt, setPrompt] = useState("");
  // const openai = new OpenAI({
  //   apiKey: import.meta.env.VITE_OPEN_AI_API,
  //   dangerouslyAllowBrowser: true  // defaults to process.env["OPENAI_API_KEY"]
  // });


  // const getResult = async (e) => {
  //   e.preventDefault()
  //   console.log(prompt)
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: `${prompt}` }],
  //     model: "gpt-3.5-turbo",
  //   });

  //   console.log(completion.choices, "Gpt result");
  // };

  // useEffect(() => {}, []);

  return (
    <main className="overflow-hidden">
    <div className="main-box left_sidebar ">
      <LeftSidebar />
    </div>
    <div className="main-box">
    <div className="relative top-[5rem] left-[7rem] flex flex-col items-center justify-cente max-[500px]:top-[-300px] max-[500px]:left-0">
      <img src={InProgress} alt="" className="  max-[500px]:left-0 max-[500px]:top-0"/>
      <h3>Working in progress</h3>
    </div>
        {/* <div className="absolute bottom-10">
          <form onSubmit={getResult}>
          <input
            type="text"
            className="w-[500px] p-2"
            placeholder="Enter you prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input type="submit" value="Ask" />
          </form>
        </div> */}
      </div>
    </main>
  );
};

export default Blog;
