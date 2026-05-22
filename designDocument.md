So the idea is a website where users can rate different music albums that they've listened to, and can give a review about their feelings about them.
Their reviews are kept in their journal and it can give them a log of when they first listened to an album and how they felt about it at the time.



<img width="1365" height="755" alt="image" src="https://github.com/user-attachments/assets/4dc3c524-9589-429c-9146-afcf776f19db" />




**HTTP Endpoints**

| HTTP Method | Endpoint URL | Description | Authentication Required | Role-Based Access Control Required and Roles | Path Parameters | Query Parameters | Body Parameters |
                                                                                                  USER
| POST | /api/auth/register | Register a new user       | No  | None        | None | None         | username (string, required), email (string, required), gender (ENUM( male, female other), required), password (string required) |
| POST | /api/auth/login    | Login an existing user    | Yes | No          | None | None         | Email (string required), password (string required) |
| POST | /api/logout        | Allow user to logout      | Yes | No          | None | None         | None |
| GET  | /api/users/:id     | Look at user details      | No  | No          | id   | None         | None |
| GET  | /api/users         | Get a list of users       | No  | No          | id   | order (desc) | None |
| PUT  | /api/users/:id     | Update user’s own details | Yes | USER        | id   | None         | username (string, optional), bio (string, optional), gender (enum, optional)  |
| DEL  | /api/users/:id     | Delete an Account         | Yes | USER, ADMIN | id   | None         | None |

                                                                                                  Review
| POST | /api/review       | Write a new review  | Yes | USER        | None | None | albumId (uuid, required), rating (int 1–10, required), paragraph (string, optional), createdAt(date, required)  |
| GET  | /api/reviews/id   | Get a single review | Yes | No          | id   | None | None |
| PUT  | /api/reviews/:id  | Update a review     | Yes | USER        | id   | None | rating (int 1–10, optional), paragraph (string, optional), listenedAt (date, optional)  |
| DEL  | /api/reviews/:id  | Delete a review     | Yes | USER, ADMIN | id   | None | None |
                                                                                                  
                                                                                                  Journal 
| POST | /api/journals      | Create a new journal     | Yes | ADMIN | None | None | journalName (string required) |
| GET  | /api/journals/:id  | Look at a user’s journal | No  | No    | id   | None | None |
| PUT  | /api/journals/:id  | Update a journal         | Yes | USER  | id   | None | FavGenre (string, optional), FavArtist (string, optional) |
| DEL  | /api/journals/:id  | Delete a journal         | Yes | ADMIN | id   | None | None |
  
                                                                                                  Album 
| POST | /api/albums      | Create a new album      | Yes | ADMIN | None | None | name (string, required), artistId (uuid, required), genre (string, required), albumType (enum: LP/EP/Single, required), releaseDate (int, required),  |
| GET  | /api/albums/:id  | Look at an album page   | No  | No    | id   | None                                | None |
| GET  | /api/albums      | Look through all albums | No  | No    | id   | filter\[artistId\], filter\[genre\] | None |
| PUT  | /api/albums/:id  | Update an album page    | Yes | ADMIN | id   | None                                | name (string, optional), genre (string, optional), albumType (enum, optional), releaseDate (int, optional) |
| DEL  | /api/albums/:id  | Delete an album page    | Yes | ADMIN | id   | None                                | None |

                                                                                                  Songs 
| POST | /api/songs      | Create a new song page | Yes | ADMIN | No | None | name (string, required), albumId (uuid, required), artistId (uuid, required), genre (string, required), length (int, required), trackNumber (int, required) , description(string) |
| GET  | /api/songs      | Look at a song page    | No  | No    | No | None | None |
| PUT  | /api/songs/:id  | Update a song page     | Yes | ADMIN | id | None | name (string, optional), genre (string, optional), length (int, optional), trackNumber (int, optional), description (string, optional) |
| DEL  | /api/songs/:id  | Delete a song page     | Yes | ADMIN | id | None | None |
                                                                                                    
                                                                                                    Artist 
| POST | /api/artists      | Create a new artist page       | Yes | ADMIN | No   | None                     | name (string, required), bio (string, optional), dob (date, optional) |
| GET  | /api/artists/:id  | Look at an artist’s page       | No  | No    | id   | None                     | None |
| GET  | /api/artists      | Look through available artists | No  | No    | None | sort(name), order (desc) | None |
| PUT  | /api/artists/:id  | Update an artist’s page        | Yes | ADMIN | id   | None                     | name (string, optional), bio (string, optional), dob (date, optional), country (string, optional) |
| DEL  | /api/artists/:id  | Delete an artist’s page        | Yes | ADMIN | id   | None                     | None |

