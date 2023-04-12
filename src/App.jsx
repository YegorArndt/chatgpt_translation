import cn from "classnames";
import { useEffect, useState } from "react";
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { sourceTexts } from "../sourceTexts.js";

import i from "./assets/i.jpeg";

const BlueTitle = ({ text }) => (
  <h2 className="text-[#2F9BFF] font-bold text-3xl uppercase border-b border-white py-3 [&+*]:pt-3 mt-5">
    {text}
  </h2>
);
const BlackTitle = ({ text }) => (
  <h2 className="text-black font-semibold text-3xl border-b border-black py-3 [&+*]:pt-3 mt-5">
    {text}
  </h2>
);
const PositionTitle = ({ text }) => (
  <h2 className="text-black font-semibold text-2xl py-3">{text}</h2>
);

const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [flag, setFlag] = useState(null);
  const [language, setLanguage] = useState("English");
  const [texts, setTexts] = useState(sourceTexts);

  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch(`${apiBaseUrl}/api/location`).then((res) =>
        res.json()
      );
      return response;
    };
    const location = getLocation().then(({ country, city, flag, language }) => {
      setCountry(country);
      setCity(city);
      setFlag(flag);
      setLanguage(language);
    });
  }, []);

  const handleClick = async () => {
    if (language) {
      const response = await fetch(`${apiBaseUrl}/api/gpt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
        }),
      }).then((res) => res.json());

      const parsedResponse = JSON.parse(response.gptReply);

      // console.log(parsedResponse);

      setTexts(parsedResponse);
    }
  };

  return (
    <>
      <header className="bg-black text-white py-5 flex justify-center">
        <div className="w-[1300px] flex justify-between items-center">
          <div className="flex items-center gap-2">
            {flag} Translated on the fly by ChatGPT
          </div>
          <button onClick={() => setTexts(sourceTexts)}>
            Switch to English
          </button>
          <button onClick={handleClick}>Testing</button>
        </div>
      </header>

      <div className="flex justify-center bg-black">
        <aside className="flex flex-col text-white bg-[#272828] w-[400px] p-[30px]">
          <img src={i} />
          <section>
            <BlueTitle text={texts.contact} />
            <div className="grid grid-cols-2 gap-y-3">
              {[
                {
                  title: texts.address,
                  text: texts.exactAddress,
                  icon: <FaRegAddressBook />,
                },
                {
                  title: "Linkedin",
                  text: "tinyurl.com/4spnxhjb",
                  icon: <AiOutlineLinkedin />,
                },
                {
                  title: "Gmail",
                  text: (
                    <>
                      yegorarndt <br /> @gmail.com
                    </>
                  ),
                  icon: <CgMail />,
                },
                {
                  title: "Github",
                  text: (
                    <>
                      github.com
                      <br />
                      /YegorArndt
                    </>
                  ),
                  icon: <AiOutlineGithub />,
                },
              ].map(({ title, text, icon }) => (
                <div key={title} className="flex items-center gap-4">
                  <div className="[&>*]:h-[25px] [&>*]:w-[25px]"> {icon}</div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{title}</span>
                    <p className="text-sm">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <BlueTitle text={texts.languages} />
            <div className="grid grid-cols-2 ">
              {[
                [texts.english, texts.german, texts.russian],
                ["C1", "C1", "C2"],
              ].map((items, index) => (
                <div
                  key={index}
                  className={cn("flex-col flex", {
                    "ml-[-100px]": index === 1,
                  })}
                >
                  {items.map((item, i) => (
                    <span className="text-sm" key={i}>
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>
          <section>
            <BlueTitle text={texts.education} />
            <div className="flex flex-col gap-1">
              <span>2016-2020</span>
              <span className="uppercase font-semibold">{texts.major}</span>
              <span>{texts.university}</span>
            </div>
          </section>
          <section>
            <BlueTitle text={texts.skills} />
            <div className="flex flex-col gap-1">
              {[
                { title: texts.languages, text: "TypeScript" },
                {
                  title: "Backend",
                  text: "Nextjs, Nodejs, Express, Prisma, tRPC, Nestjs",
                },
                {
                  title: "Frontend",
                  text: "React, Redux, Zustand, React Query, Redux toolkit, Redux-Saga, Vue, Gatsby, atomic, CSS, SCSS, LESS, jest, rtl, styled, emotion, MUI, webpack, css-modules, storybook, lodash-es, ramda...",
                },
                { title: "Web Services", text: "REST API" },
                {
                  title: "Databases",
                  text: "RDBMS (MySQL, PostgreSQL), NoSQL (Firebase, MongoDB...)",
                },
                { title: " SDLC", text: "Scrum, Agile" },
                {
                  title: " Tools",
                  text: "Git, Docker, VS Code, Postman, Swagger, Jira, Confluence, Notion, Figma, Axiom",
                },
              ].map(({ title, text }) => (
                <div key={title}>
                  <span className="font-semibold pr-1">{title}:</span>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
        <main className="w-[900px] bg-white p-[100px] flex flex-col gap-4">
          <section className="flex justify-center flex-col">
            <h1 className="text-[3.5rem] font-extrabold">{texts.yegorArndt}</h1>
            <span className="text-[1.5rem]">{texts.softwareEngineer}</span>
          </section>
          <section className="mt-10">
            <BlackTitle text={texts.aboutMe} />
            <div className="text-[#737373]">{texts.exactAboutMe}</div>
          </section>

          <section className="py-5">
            <BlackTitle text={texts.myExperience} />
            <section className="border-t border-black py-4">
              <div>2017-2019</div>
              <div>{texts.freelancer}</div>
              <PositionTitle text={texts.juniorFrontendEngineer} />
              <div className="text-[#737373]">
                {texts.juniorFrontendEngineerHighlights}
              </div>
            </section>
            <section className="border-t border-black py-4">
              <div>2019-2022</div>
              <div>{texts.bellintegrator}</div>
              <PositionTitle text={texts.middleFrontendEngineer} />
              <div className="text-[#737373]">
                {texts.bellintegratorHighlights}
              </div>
            </section>
            <section className="border-t border-black py-4">
              <div>2022-2023</div>
              <div>{texts.aads}</div>
              <PositionTitle text={texts.middleFrontendEngineer} />
              <div className="text-[#737373]">{texts.aadsHighlights}</div>
            </section>
          </section>
        </main>
      </div>
      <footer className="py-5 bg-black" />
    </>
  );
}

export default App;
