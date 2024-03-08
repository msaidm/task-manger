import LoginForm from "../components/LoginForm";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center">
        <p style={{ fontFamily: 'monospace' }} className="mb-3 text-2xl font-semibold">
          SIEMENS TASK MANAGER
        </p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
