import Main from "src/layout/Main";

export default function How() {
  return (
    <Main>
      <div className="p-5">
      <h1 className="text-[3rem] font-playfair">
        How
      </h1>
      <article className="prose">
        <p>
          View the manual&nbsp;
          <a href="https://www.notion.so/Kernel-Searching-Manual-76500dea72c54eb1b3e23e0ddbe79533?pvs=4" target="_blank">
            here ↗️
          </a>
        </p>
      </article>
      <h2 className="text-[2rem] font-playfair my-4">
        TL;DR
      </h2>
      <article className="prose">
        <ul>
          <li>
            Look for an email by the stewards that will mention the two weeks you have to search - all you have to do after that is open this app on those two weeks and accept applications
          </li>
          <li>
          Your job is to Accept at most two applications every week.
          </li>
          <li>
            You can either accept an application or remove your decision. 
          </li>
          <li>
            The current week number is always visible on the navbar
          </li>
        </ul>
      </article>
      </div>
    </Main>
  )
}