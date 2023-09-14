function Inputs() {
  return (
    <div className="flex flex-wrap flex-row bg-violet-50 p-10 rounded-lg w-full md:w-1/2">
      <h1 className="text-2xl">GitHub Organization Invitation Tool</h1>
    </div>
  );
}

export default function GhOrgInviteTool() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Inputs></Inputs>
    </main>
  );
}
