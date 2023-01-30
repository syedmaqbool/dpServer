import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginAction } from "../../redux/authSlice";
import { userLogin } from "../../services/AuthService";

function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = async () => {
    const data = {
      email: email,
      pwd: password,
    };
    const response = await userLogin(data);
    if (response && response.status === 200) {
      dispatch(userLoginAction(response.data));
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mx-auto flex h-full items-center justify-center">
      <div className="w-[32rem]">
        <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm text-gray-700 shadow focus:outline-blue-400"
              id="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border  py-2 px-3 text-sm text-gray-700 shadow focus:outline-blue-400"
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-blue-400"
              type="button"
              onClick={loginHandler}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

const DUMMY = [`bg-green-500`, `hover:bg-green-700`];

export default AuthLogin;
