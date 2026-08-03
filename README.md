# Local Chat

A web application for a local chat that works without a server and uses only browser capabilities. All data is stored locally and restored after a page reload or when the browser is opened again.

## Useful links

- [Design in Figma](https://www.figma.com/design/IlROmRjK8GTSgyiageEpsU/local-chat?node-id=0-1&t=CnF7DmArDMn1YOef-1)

## Getting started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (or **Yarn**, if you prefer)

### Install dependencies

Clone the repository:

```
https://github.com/kuryuo/local-chat
```

Go to the project folder:

```
cd local-chat
```

Install dependencies:

```
npm install
```

Start the project:

```
npm run dev
```

The app will be available at: `http://localhost:5173`.

## Tech stack

* React 18
* TypeScript
* Vite
* HTML5, CSS3
* localStorage / sessionStorage — for storing chat data and sessions

## Main features

- **Serverless chat**: All data (users, messages, rooms) is stored in the browser. The app does not depend on a server and works fully locally.

- **Unique session IDs**: Each tab has its own unique session ID stored in `sessionStorage`, keeping sessions unique per browser tab.

- **User and room identification**: Users can enter their name and choose a room to join when starting the chat.

- **Data persistence and restore**: All user, message, and room data is saved in `localStorage` and restored after a page reload or when the browser is closed and opened again.

- **Emoji support**: Users can send messages with emoji using the built-in picker or by typing them manually.

- **Message quoting**: Messages can be quoted in chat for context or to reply to a specific message.

- **Media support**: Support for sending and displaying images in messages.
