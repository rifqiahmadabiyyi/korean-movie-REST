<?php
// include database connection file
include_once("../config/database.php");
 
// Check if form is submitted for user update, then redirect to homepage after update
if(isset($_POST['update']))
{	
    $id = $_POST['id'];
    
    $title=$_POST['title'];
    $release_year=$_POST['release_year'];
    $director=$_POST['director'];
        
    // update user data
    $result = mysqli_query($conn, "UPDATE films SET title='$title',director='$director',release_year='$release_year' WHERE id=$id");
    
    // Redirect to homepage to display updated user in list
    header("Location: ../index.php");
}
?>
<?php
// Display selected user data based on id
// Getting id from url
$id = $_GET['id'];
 
// Fetech user data based on id
$result = mysqli_query($conn, "SELECT * FROM films WHERE id=$id");
 
while($user_data = mysqli_fetch_array($result))
{
    $title = $user_data['title'];
    $release_year = $user_data['release_year'];
    $director = $user_data['director'];
}
?>
<html>
<head>	
    <title>Edit User Data</title>
</head>
 
<body>
    <a href="../index.php">Home</a>
    <br/><br/>
    
    <form name="update_user" method="post" action="edit.php">
        <table border="0">
            <tr> 
                <td>Judul</td>
                <td><input type="text" name="title" value=<?php echo $title;?>></td>
            </tr>
            <tr> 
                <td>Tahun Rilis</td>
                <td><input type="text" name="release_year" value=<?php echo $release_year;?>></td>
            </tr>
            <tr> 
                <td>Direktor</td>
                <td><input type="text" name="director" value=<?php echo $director;?>></td>
            </tr>
            <tr>
                <td><input type="hidden" name="id" value=<?php echo $_GET['id'];?>></td>
                <td><input type="submit" name="update" value="Update"></td>
            </tr>
        </table>
    </form>
</body>
</html>