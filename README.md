
# Chat application - final project

This Application that we developped with React & node.js allows users to exchange messages in a simple way. Moreover, we added some functionalities in order to make it easey to use and pretty. 

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/adaltas/ece-2020-fall-webtech-project.git webtech
  cd webtech
  ```
* Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:   
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```
  Note, the provided `.gitignore` file ignore the `dex` folder.
* Register your GitHub application, get the clientID and clientSecret from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config.yml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config.yml`, the frond-end application is already registered and CORS is activated. Now that Dex is built and configured, your can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Optional, fill the database with initial data
  bin/init
  # Start the back-end
  bin/start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```

## Author

Victor QUIDET / victor.quidet@edu.ece.fr
Théophile TARBE / theophile.tarbe-de-saint-hardouin@edu.ece.fr
ING4 - Gr01 SI International

## Tasks

Project management

* Naming convention (2pts)
Folders names : lowercase letter
Files .js : start with a uppercase letter
Variable & const : start with lowercase letter
React Components : start with a uppercase letter
* Project structure (4pts)
The project is structured as follow :
Back-End :
  - bin
  - db
  - lib
  - test
  - package.json
Front-End :
  - build
  - public
  - src 
  - package.json
Dex-Config :
  - config.yml
* Code quality (4pts)
The code respects indentation and avoids spaces where they are not needed.
We made our best for it to be as understandable as possible.
* Design, UX (4pts)
We coded an application as simple as possible to use for a new customer. The code is responsive, with an animated background, and proposes a refined theme around the colors blue and white. For that, we used librairies such as :
  - material ui (icons, components, routes, theme)
  - particules js (background)
We wanted to keep it simple and elegant and to prevent from bad user experience.
* Git and DevOps   
Throughout the project we used our TechWeb GitHub repository to exchange the different features we each coded.

Application development

* Sign in (4pts)
The Sign In screen proposes :
  - An secured authentification with Dex (OAuth & OpenID Connect)
  - The other fields (Email / Password) are here for estethic and an eventual future implementation of the code (as well as "Create an Account")
* Welcome screens (2pts)
It is the main page of the App with :
  - The header : menu icon - dropdown icon for accessing features - logout button
  - The drawer : search bar - list of channels
  - Main part : animated background - icons for creating new channels and accessing parameters - list of the all recent messages of the user 
  - The footer : copyright of the App
* New channel creation (6pts)
1- The user can create channels by 2 ways :
  - the main icon "add channels"
  - the dropdown menu in the header
2- On the form, the user can :
  - choose the name of the channel
  - chosse 1 OR multiple users to add on it (by emails)
3- The user who created the channel is automatically an Admin of the channel
4- Only the name of the user(s) of the channel appear on the top of the chat
5- Once created, the channel is registered in the database and accessible at anytime fot its users by :
  - The list of channels in the drawer
  - The list of last messages on the welcome page
* Channel membership and access (4pts)
1- A user only have access to the channels that :
  - he created himself
  - he has been invited in 
2- Once on the channel, the user have mutliple options over channels/messages depending on his status (Admin/Simple user)
* Ressource access control (4pts)
2 - We implemented a 2 rôles access for members wich doesn't give the same rights on a channel :
  - The Admin can :
    - Rename a channel
    - Delete a channel (and all messages within)
    - Add other admins
    - Add new users
    - Modify its own messages
    - Delete every message that he wants
  - The Simple user can :
    - Add new users to the channel
    - Delete and modify its own messages only
* Invite users to channels (6pts)
There are multiple ways to invite users in a channel :
1- At the moment of creating the channel with the form (by emails)
2- Once on the channel, the admin adn the simple user can add other users
* Message modification (2pts)
A user (either Admin or simple user) can only modify its own messages by clicking on the icon "modify" in front of each message
* Message removal (2pts)
We impemented a 2 ways access for :
  - Admin : he can delete any message he wants 
  - Simple user : he can only delete its own messages
* Account settings (4pts)
On setting the user can :
  - access his email
  - see his avatar
* Gravatar integration   
When logged with Dex, a user either :
  - gets his own avatar if he has a gravatar account
  - gets a default avatar
* Avatar selection   
On settings the user can see 5 other avatars but we couldn't manage to change it correctly.
* Personal custom avatar   
This functionality wasn't working perfectly so we didn't push it in our final version of the App


## Bonus

We added some bonus tasks to our App for a better utilization (and not by priority; only because it was easy and quick for us to implement them during the project):
1- The Search Bar is working inside the Drawer in order to quickly find a channel
2- Admins of a channel can :
  - Rename the channel
  - Delete the channel (and all messages within)
3- The "Recent Messages" in the Welcome Page :
  - automatically presents all recents messages on every channels of the user
  - by clicking on any message, it redirects the user on the dedicated channel
