<html>
<head>
    <title>Add Movie</title>
</head>
 
<body>
    <a href="../index.php">Go to Home</a>
    <br/><br/>
 
    <form action="add.php" method="post" name="form1">
        <table width="25%" border="0">
            <tr> 
                <td>title</td>
                <td><input type="text" name="title"></td>
            </tr>
            <tr> 
                <td>Tahun Rilis</td>
                <td><input type="text" name="release_year"></td>
            </tr>
            <tr> 
                <td>Director</td>
                <td><input type="text" name="director"></td>
            </tr>
            <tr> 
                <td></td>
                <td><input type="submit" name="Submit" value="Add"></td>
            </tr>
        </table>
    </form>
    
    <?php
 
    // Check If form submitted, insert form data into users table.
    if(isset($_POST['Submit'])) {
        $title = $_POST['title'];
        $release_year = $_POST['release_year'];
        $director = $_POST['director'];
        
        // include database connection file
        include_once("../config/database.php");
                
        // Insert user data into table
        $result = mysqli_query($conn, "INSERT INTO films(title,release_year,director) VALUES('$title','$release_year','$director')");
        
        // Show message when user added
        echo "Movie added successfully. <a href='../index.php'>View Movies</a>";
    }
    ?>
</body>
</html>