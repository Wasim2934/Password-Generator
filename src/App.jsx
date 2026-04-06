import { useState, useEffect, useRef } from "react";

function App() {
  const maxCopyLimit = 40;
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);
  const [savedPassword, setSavedPassword] = useState([]);

  function randomPassword() {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let number = "0123456789";
    let char = "!@#$%^&*`~?:";

    if (isNumber) str += number;
    if (isCharacter) str += char;

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }

  useEffect(() => {
    randomPassword();
  }, [length, isNumber, isCharacter]);

  const copyPass = useRef(null);

  const copyPassToClipboard = () => {
    navigator.clipboard.writeText(password);
    copyPass.current?.select();
  };


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Password Generator
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create random secure passwords
        </p>

        {/* Password input */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Generated Password
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={password}
              ref={copyPass}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={copyPassToClipboard}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Range */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Password Length: <span className="text-blue-600">{length}</span>
          </label>
          <input
            type="range"
            min={4}
            max={maxCopyLimit}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Checkboxes */}
        <div className="mb-6">
          <p className="font-medium text-gray-700 mb-3">Options</p>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isNumber}
                onChange={(e) => setIsNumber(e.target.checked)}
              />
              Include Numbers
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isCharacter}
                onChange={(e) => setIsCharacter(e.target.checked)}
              />
              Include Symbols
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={randomPassword}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md w-full"
          >
            Generate
          </button>

          <button
            onClick={() => { setSavedPassword((prevPass) => [...prevPass, password]) }}
            className="bg-blue-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md w-full"
          >
            Save
          </button>

          <button
            onClick={() => {
              setLength(8);
              setIsNumber(false);
              setIsCharacter(false);
              setSavedPassword([]);
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full"
          >
            Reset
          </button>
        </div>

        {/* Saved passwords */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Saved Passwords</h2>

          {savedPassword.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-md p-4 text-center text-gray-500">
              No saved passwords yet
            </div>
          ) : (
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {savedPassword.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md px-3 py-2 bg-gray-50"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;