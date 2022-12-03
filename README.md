# API of willchat documentation

## Routers

In this application we use openId, so we need to pass the accessToken as header to get the id. That id is used for idetify user in the database. But, in some routers we don't need the accessToken, i'll identify this routers as `dont need accessToken`.

Below i will show for you an example of header:

```json
{
  "accesstoken": "this_is_my_access_token"
}
```

### /key POST

Just send the accessToken in the header for create your key.

#### Response

```json
{
  "chat": {
    "id": "a3e03ba7-4b02-4694-bdc6-12c12f078735"
  },
  "userId": "638a8f625es7900ffcf8b795",
  "key": "fb83e54b2cfc00faf0eb520b3bae34",
  "id": "423c8c0d-732c-cac9-83d3-c59d44df27b1"
}
```

Now you have your chat identified as a key. You can get all your chats with the router bellow:

### /key GET

Just send the accessToken in the header for create your key.

#### Response

```json
[
  {
    "id": "423c8c0d-732c-4ac9-83d3-c59d44df27b1",
    "userId": "638a8f625ea7900ffcf8b795",
    "key": "fb83e54b2cfc00faf0eb520b3bae34"
  },
  {
    "id": "42sc1223-732c-4ac9-83d3-c59d44df27cd",
    "userId": "638a8f625ea7900ffcf8b795",
    "key": "f123e54b2cfc00faf0eb520b3baeaa"
  }
]
```

It's your list of chats key.

### /key/message POST `Dont need accessToken`

We need some key to save any message, then just use this router to save the message.

#### Request BODY

```json
{
  "key": "fake-key",
  "message": "Hello world!",
  "userName": "Willian",
  "userId": "fake-user-id"
}
```

#### Response

```json
{
  "chat": {
    "id": "33464c55-d19e-4f9e-9c3a-0105c301118e"
  },
  "message": "Hello world!",
  "userId": "fake-user-id",
  "userName": "Willian",
  "id": "3a711f4f-2383-495c-9290-2f9cfd4e146d"
}
```
