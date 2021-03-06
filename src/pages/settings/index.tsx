import React from "react";

import useLocalStorage from "@hooks/use-local-storage";

const Settings = () => {
  const [gistId, setGistId] = useLocalStorage("gistId", "");
  const [gistToken, setGistToken] = useLocalStorage("gistToken", "");
    const [userName, setUserName] = useLocalStorage("userName", "");
    const [password, setPassword] = useLocalStorage("password", "");
    const [repositoryName, setRepositoryName] = useLocalStorage("repositoryName", "");

  return (
    <div className="border flex flex-col m-4 p-1 bg-gray-100">
      <label className="mb-3 bg-gray-200 flex-1">Storage:</label>
        <div className="mb-1 flex-1">
            <label>Git username: </label>
            <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className="bg-white flex-1"
            />
        </div>
        <div className="mb-1 flex-1">
            <label>Password: </label>
            <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                className="bg-white flex-1"
            />
        </div>
        <div className="mb-1 flex-1">
            <label>Git branch name: </label>
            <input
                onChange={(e) => setRepositoryName(e.target.value)}
                value={repositoryName}
                className="bg-white flex-1"
            />
            {repositoryName.length === 0 && (
                <a
                    target="_blank"
                    href="https://github.com/new"
                    className="ml-4 bg-gray-300 px-3"
                >
                    create
                </a>
            )}
        </div>
      <div className="mb-1 flex-1">
        <label>Auth token: </label>
        <input
          onChange={(e) => setGistToken(e.target.value)}
          type="password"
          value={gistToken}
          className="bg-white flex-1"
        />
        {gistToken.length === 0 && (
          <a
            target="_blank"
            href="https://github.com/settings/tokens/new"
            className="ml-4 bg-gray-300 px-3"
          >
            create
          </a>
        )}
      </div>
      <div>
        <label>Gist id: </label>
        <input
          onChange={(e) => setGistId(e.target.value)}
          type="text"
          value={gistId}
          className="bg-white flex-1"
        />
        {gistId.length === 0 && (
          <a
            target="_blank"
            href="https://gist.github.com/"
            className="ml-4 bg-gray-300 px-3"
          >
            create
          </a>
        )}
      </div>
    </div>
  );
};

export default Settings;
