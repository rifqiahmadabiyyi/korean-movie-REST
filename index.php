<?php  
include_once("config/database.php");
 
// Fetch all users data from database
// $result = mysqli_query($conn, "SELECT films.*, actors.actor_name
// FROM films
// LEFT JOIN actors ON films.id = actors.film_id;");

$result = 'SELECT films.*, GROUP_CONCAT(actors.actor_name SEPARATOR ", ") AS actors
        FROM films
        LEFT JOIN actors ON films.id = actors.film_id
        GROUP BY films.id';
$result = mysqli_query($conn, $result);

if (!$result) {
  die('Error fetching data: ' . mysqli_error($conn));
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <title>List Movie</title>
</head>
<body>


<div class="container">
    <div class="mt-5 mb-5">
        <h1 class="mb-2 text-center">List Data Film Korea</h1>
        <a href="crud/add.php">Add Movie</a><br/><br/>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Judul</th>
              <th scope="col">Tahun Rilis</th>
              <th scope="col">Direktor</th>
              <th scope="col">Aktor</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          <?php  
            while($movie_data = mysqli_fetch_assoc($result)) {         
                echo "<tr>";
                echo "<th>".$movie_data['id']."</th>";
                echo "<th>".$movie_data['title']."</th>";
                echo "<th>".$movie_data['release_year']."</th>";
                echo "<th>".$movie_data['director']."</th>";
                echo "<th>".$movie_data['actors'] ."</th>";    
                echo "<th><a href='crud/edit.php?id=$movie_data[id]'>Edit</a> | <a href='crud/delete.php?id=$movie_data[id]' ' onclick='return checkDelete()'>Delete</a></td></tr>";        
                    
            }
            ?>
          </tbody>
        </table>
    </div>
</div>
    
</body>
</html>
<script language="JavaScript" type="text/javascript">
function checkDelete(){
    return confirm('Are you sure?');
}
</script>
<script src="assets/js/bootstrap.bundle.min.js"></script>