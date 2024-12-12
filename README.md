# Secret-Santa 🎅🎁

## Description
Secret-Santa is a modern, interactive web application designed to simplify the Secret Santa gift exchange process. This app allows users to create groups, assign participants, and manage assignments seamlessly. With a polished user interface, secure authentication, and a responsive design, it’s the perfect tool to bring joy to any holiday season!

## Features
- **Group Creation:** Create Secret Santa groups and add participants with ease.
- **Random Assignments:** Automatically assign participants to one another for gift-giving.
- **Save and Retrieve Data:** Store participant information and assignments securely in a database.
- **User Authentication:** Login functionality ensures secure access to groups and assignments.
- **Interactive and Responsive:** A user-friendly interface that works seamlessly across devices.

## Technologies Used
### Frontend
- React
- TypeScript
- CSS (with a festive holiday theme)

### Backend
- Node.js
- Express.js
- GraphQL (Apollo Server)
- MongoDB (Mongoose ODM)

### Tools
- JWT Authentication
- Render (Deployment)
- GitHub Actions (CI/CD)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AChrisMora/Secret-Santa.git
   cd secret-santa
   ```

2. Install dependencies:
   - **Client:**
     ```bash
     cd client
     npm install
     ```
   - **Server:**
     ```bash
     cd server
     npm install
     ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following:
     ```
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-secret-key>
     PORT=5000
     ```

4. Start the application:
   - **Server:**
     ```bash
     npm run build
     ```
   - **Client:**
     ```bash
     npm run start:dev
     ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage
1. **Login:** Enter your username and password to access the app.
2. **Create Group:** Add participants and generate Secret Santa assignments.
3. **Save Assignments:** Assignments are saved to the database for future reference.
4. **Access Assignments:** Retrieve group assignments and share them with participants.

## Future Developments
- **Participant Wish Lists:** Each participant will be able to log in, create their own wish list, and share it with their assigned Secret Santa.
- **Notifications:** Add email or SMS notifications for assignments and wish lists.
- **Enhanced Authentication:** Implement role-based access to allow group admins to manage participants and assignments.
- **Mobile App:** Develop a mobile-friendly version of the application for iOS and Android.
- **Gift Budget Tracker:** Allow participants to set and track gift budgets.
- **Theme Customization:** Add support for custom holiday themes.

## Deployment
The application is deployed on Render and can be accessed via this [link](https://secret-santa-5649.onrender.com).

## Contribution Guidelines
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push your changes: `git push origin feature-name`.
5. Create a pull request.

## License
This project is licensed under the MIT License. 

---

### Happy Holidays! 🎄✨
