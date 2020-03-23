# Tutorial 4
## Tasks
### JWT Token Application
Implement a simple Node.js application enabling login (generates and returns JWT token) and access to a resource with the valid token.

- Login resource
    - POST /login (consuming username and password as a JSON)
- Authorized access resource
    - GET /data
    - Verifies the Authorization header for the valid JWT token

### HMAC authentication
Extend the previous API about a resource implementing the pure HMAC.

- HMAC resource
    - GET /hmac
    - computed the digest using the user identifier, HTTP method, URI, timestamp, MD5