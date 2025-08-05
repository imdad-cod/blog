<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>ایڈمن پینل</title>
</head>
<body>
  <h1>خوش آمدید، ایڈمن!</h1>
  <a href="logout.php">لاگ آؤٹ</a>
  <br><br>
  <a href="add-post.php">📤 نئی پوسٹ شامل کریں</a>
</body>
</html>
