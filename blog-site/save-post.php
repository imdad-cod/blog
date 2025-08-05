<?php
session_start();
if (!isset($_SESSION['loggedin'])) { header('Location: login.php'); exit(); }

$title = $_POST['title'];
$content = $_POST['content'];

$imagePath = '';
$bookPath = '';

// Handle Image Upload
if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
  $imagePath = 'uploads/images/' . basename($_FILES['image']['name']);
  move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
}

// Handle Book Upload
if (isset($_FILES['book']) && $_FILES['book']['error'] === 0) {
  $bookPath = 'uploads/books/' . basename($_FILES['book']['name']);
  move_uploaded_file($_FILES['book']['tmp_name'], $bookPath);
}

// Prepare Post Data
$post = [
  'title' => $title,
  'content' => $content,
  'image' => $imagePath,
  'book' => $bookPath,
  'date' => date('Y-m-d H:i:s')
];

// Save to JSON
$file = 'posts/posts.json';
$posts = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
array_unshift($posts, $post);
file_put_contents($file, json_encode($posts, JSON_PRETTY_PRINT));

header('Location: admin.php');
?>
