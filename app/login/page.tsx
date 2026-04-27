import LoginForm from "@/components/LoginForm";

import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <div className="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">

      <LoginForm onSend={loginAction}/>
    </div>
  );
}
