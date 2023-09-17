"use client";

import React, { useState } from "react";
import { Octokit, App } from "https://esm.sh/octokit";

function GitHubInvitationApp() {
  const [orgName, setOrgName] = useState("");
  const [token, setToken] = useState("");
  const [teamName, setTeamName] = useState("");
  const [url, setUrl] = useState("");
  const [emailAddresses, setEmailAddresses] = useState("");
  const [message, setMessage] = useState("");
  const [parsedResult, setParsedResult] = useState("");

  const handleSendInvitations = async () => {
    try {
      const octokit = new Octokit({ auth: `token ${token}` });

      // Retrieve the team's ID by name
      const { data: teams } = await octokit.teams.list({
        org: orgName,
      });

      const team = teams.find((t) => t.name === teamName);

      if (!team) {
        setMessage(`Team "${teamName}" not found in the organization.`);
        return;
      }

      // Split and trim email addresses
      const emailAddressesArray = emailAddresses
        .split(",")
        .map((email) => email.trim());

      // Send invitations to each email address
      for (const email of emailAddressesArray) {
        await octokit.orgs.createInvitation({
          org: orgName,
          email,
          team_id: team.id,
          role: "direct_member", // Replace with the desired role
          invitee_type: "Email",
          link_url: url,
        });
      }

      setMessage(
        `Invitations sent to the specified email addresses for Team "${teamName}".`
      );
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleParseURL = () => {
    const pattern = /\/_([^/]+)_\d+\//;
    const match = url.match(pattern);

    if (match && match[1]) {
      setParsedResult(match[1]);
    } else {
      setParsedResult("Course code not found in URL.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">
        GitHub Organization Invitation
      </h1>

      <div class="mb-4">
        <label htmlFor="url" class="block text-sm font-medium text-gray-700">
          Course URL:
        </label>
        <input
          type="text"
          id="url"
          placeholder="URL"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            handleParseURL();
          }}
          class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="orgName"
          className="block text-sm font-medium text-gray-700"
        >
          GitHub Organization Name:
        </label>
        <input
          type="text"
          id="orgName"
          placeholder="Your Organization Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div class="mb-4">
        <label htmlFor="token" class="block text-sm font-medium text-gray-700">
          GitHub Personal Access Token:
        </label>
        <input
          type="password"
          id="token"
          placeholder="Your Personal Access Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div class="mb-4">
        <label
          htmlFor="teamName"
          class="block text-sm font-medium text-gray-700"
        >
          Team Name:
        </label>
        <input
          type="text"
          id="teamName"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="emailAddresses"
          className="block text-sm font-medium text-gray-700"
        >
          Email Addresses (comma-separated):
        </label>
        <textarea
          id="emailAddresses"
          placeholder="Email Address 1, Email Address 2, ..."
          value={emailAddresses}
          onChange={(e) => setEmailAddresses(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
        />
      </div>

      <button
        onClick={handleSendInvitations}
        className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Send Invitations
      </button>

      <div className="text-red-500 mt-2">{message}</div>

      <div className="mt-4">
        <p className="text-sm text-gray-700">Parsed Result:</p>
        <p className="text-gray-900 font-semibold">{parsedResult}</p>
      </div>
    </div>
  );
}

export default function GhOrgInviteTool() {
  return (
    <main className="flex min-h-screen flex-col items-center p-3 md:p-24">
      <GitHubInvitationApp />
    </main>
  );
}
