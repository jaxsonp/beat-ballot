# Serverside README

## Functions

### `/create-account`

### `/get-account-info`

### `/logout`

### `/create-playlist`

Creates a new playlist with the specified name

Params:

-   `name`: Name of the playlist to be created

### `/add-user-to-playlist`

Adds a user to a playlist group

Params:

-   `username`: Name of the user
-   `playlist_id`: ID of the playlist

### `/sign-in`

Logs in a user

Params:

-   `username`: Name of the user
-   `pass`: Hashed password

Returns:

```JSON
{
  "message": "success",
  "session-token": "abc...xyz",
}
```
