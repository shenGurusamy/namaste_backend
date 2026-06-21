Profile Router

    - POST /signup
    - POST /login
    - POST /logout

Profile Router

    - PATCH /Profile/password,
    - PATCH /Profile/edit,
    - GET /Profile

Connection Router

    - POST /req/send/interested/:userId
    - POST /req/send/ignored/:userId
    - POST /req/review/accepted/:reqID
    - POST /req/review/rejected/:reqID

User Router

    - GET /user/allconnections
    - GET /user/req/received
    - GET /user/feed