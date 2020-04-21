# How the project is built

## Project structure as of APR 2020

### Components

#### Auth
Used in the navbar to authenticate a user.

#### Character-creation
Used for creating characters. **Will be reworked soon to listen to a service!**

#### Navbar
Containing the Auth-component.

#### Overview
Lists (at most) three entries of characters from Firebase.

### Pages

#### Home
The landing page for this project.

### Parts

#### Collapsible
A collapsible for objects of type `Character`.

#### Snackbar
A yet to be implemented snackbar for (error-) notifications

### Services

#### Auth
Redundant Service to be removed in future commits.

#### Character-creation
Service for writing an object of type `Character` to Firebase.
