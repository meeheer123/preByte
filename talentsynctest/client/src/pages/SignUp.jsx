import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please Fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      if(data.success ===false)
      {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if(res.ok)
      {
        nevigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:item-center gap-5">
        {/* left */}
        <div className="flex-1 mt-20">
          <Link
            to="/"
            className="whitespace-nowrap font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Talent
            </span>
            Sync
          </Link>
          <p className="text-sm mt-5 font-bold">
            This is the demo Project You can Sign UP with Email and Password or
            with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1 ml-10">
        {
            errorMessage && (
              <Alert className='mb-5 font-bold text-xl' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Username" className="text-2xl" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                style={{ fontSize: '20px' }}
              />
            </div>
            <div className="">
              <Label value="Your Email" className="text-2xl" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
                style={{ fontSize: '20px' }}
              />
            </div>
            <div className="">
              <Label value="Your Password" className="text-2xl" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                style={{ fontSize: '20px' }}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="rounded-lg text-xl px-4.5 py-1.6 text-center"
              disabled={loading}
            >
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className="pl-3">Loading...</span>
                </>
                ):('SignUp')
              }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-xl mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-700">
              SIGN IN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
