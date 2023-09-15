import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Profile() {
  return (
    <div className="flex flex-wrap flex-row bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2">
      <Image
        src="/profile-pic.png"
        alt="profile picture"
        className="rounded-full w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
        width={400}
        height={400}
        priority
      />
      <div className="md:m-5 md:p-5">
        <h1 className="font-sans text-3xl md:text-5xl font-bold">
          Krerkkiat Chusap
        </h1>
        <div className="mt-5">
          <a
            href="https://github.com/krerkkiat"
            target="_blank"
            className="p-1 m-2"
          >
            <FontAwesomeIcon icon={faGithub} className="text-3xl md:text-5xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/krerkkiatchusap/"
            target="_blank"
            className="p-1 m-2"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-3xl md:text-5xl" />
          </a>
          <a
            href="https://www.instagram.com/krerkkiatchusap/"
            target="_blank"
            className="p-1 m-2"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-3xl md:text-5xl" />
          </a>
          <a
            href="https://twitter.com/krerkkiat_c"
            target="_blank"
            className="p-1 m-2"
          >
            <FontAwesomeIcon icon={faXTwitter} className="text-3xl md:text-5xl" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Bio() {
  return (
    <div className="flex flex-wrap flex-row bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2 mt-2">
      <h1 className="text-3xl">Bio</h1>
      <p className="m-2">
        He is a graduate student at{" "}
        <a className="text-green-600" href="https://www.ohio.edu" target="_blank">
          Ohio University
        </a>
        . He manages to spend more running{" "}
        <a className="text-green-600" href="https://tsaou.page" target="_blank">
          OU Thai Student Association&apos;s website
        </a>{" "}
        on its own domain (he should just use Linktree). He thought it was fun
        to help run a conference and also live debugging production codebase for
        said conference. He loves to spend months automate task that only takes
        few hours.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-3 md:p-6 lg:p-24">
      <Profile></Profile>
      <Bio></Bio>
    </main>
  );
}
