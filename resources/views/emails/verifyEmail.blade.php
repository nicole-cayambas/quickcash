<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Quickcash Verify Email</title>
</head>
<body>
    <h2>Welcome to Quickcash, {{ $user->first_name }}!</h2>
    <p>
        Click <a href="{{url('/confirm/'.$user->verifyUser->token)}}">here</a> to verify your email :D
    </p>
</body>
</html>