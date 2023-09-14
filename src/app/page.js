import Image from 'next/image';

function Profile() {
  return (<div class="flex flex-wrap flex-row bg-violet-50 p-10 rounded-lg">
    <Image
      src="/profile-pic.png"
      alt="profile picture"
      className="rounded-full w-32 h-32 md:w-64 md:h-64"
      width={400}
      height={400}
      priority
    />
    <h1 className="font-sans text-5xl font-bold md:m-5 md:p-5">Krerkkiat Chusap</h1>
  </div>);
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Profile></Profile>
    </main>
  );
};
