<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $users = json_decode(file_get_contents('users.json'), true);

    $username = $_POST['username'];
    $password = $_POST['password'];

    foreach ($users as $user) {
        if ($user['username'] === $username && $user['password'] === $password) {
            $_SESSION['admin_logged_in'] = true;
            header('Location: admin-panel.php');
            exit();
        }
    }

    $error = "غلط یوزر نیم یا پاس ورڈ";
}
?>

<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>ایڈمن لاگ اِن</title>
</head>
<body>
  <h2>ایڈمن لاگ اِن</h2>

  <?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>

  <form method="POST">
    <label>یوزر نیم:</label>
    <input type="text" name="username" required><br><br>

    <label>پاس ورڈ:</label>
    <input type="password" name="password" required><br><br>

    <button type="submit">لاگ اِن</button>
  </form>
</body>
</html>
