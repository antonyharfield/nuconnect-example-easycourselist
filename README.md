# NUWS - Example of performing oauth authentication from a website

## Getting started

Copy configuration.prod.json to configuration.json. Edit the configuration.json with your client_id and client_secret. The production oauth server is `https://nuws.nu.ac.th/oauth`.

If you are using a local development server then you can change the server and can generate your own client id and secret using the php artisan command:

```
php artisan passport:client

 Which user ID should the client be assigned to?:
 > 1

 What should we name the client?:
 > Oauth Demo

 Where should we redirect the request after authorization? [http://localhost/auth/callback]:
 > http://localhost:50451/login/nu/callback

New client created successfully.
Client ID: 3
Client secret: XYZ1234567890ABCDEFGHIJKLM
```
