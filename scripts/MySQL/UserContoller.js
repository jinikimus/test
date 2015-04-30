function create (user, callback) {
    var connection = mysql({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'mydb'
    });

    connection.connect();

    var query = "INSERT INTO users SET ?";

    var insert = {
        password: bcrypt.hashSync(user.password, 10),
        email:    user.email
    };

    connection.query(query, insert, function (err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();

        callback(null);

    });

}

function login (email, password, callback) {
    var connection = mysql({
        host     : 'localhost',
        user     : 'root',
        password : '1',
        database : 'fms1'
    });

    connection.connect();

    var query = "SELECT id, nickname, email, password " +
        "FROM users WHERE email = ?";

    connection.query(query, [email], function (err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();
        var user = results[0];

        if (!bcrypt.compareSync(password, user.password)) {
            return callback();
        }

        callback(null,   {
            id:          user.id.toString(),
            nickname:    user.nickname,
            email:       user.email
        });

    });

}

function verify (email, callback) {
    var connection = mysql({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'mydb'
    });

    connection.connect();

    var query = "UPDATE users SET email_Verified = true WHERE email_Verified = false AND email = ? ";

    connection.query(query, email, function (err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();

        callback(null, results.length > 0);
    });

}

function changePassword (email, newPassword, callback) {
    var connection = mysql({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'mydb'
    });

    connection.connect();


    var query = "UPDATE users SET password = ? WHERE email = ? ";

    var hashedPassword = bcrypt.hashSync(newPassword, 10);

    connection.query(query, hashedPassword, email, function (err, results) {
        if (err) return callback(err);
        callback(null, results.length > 0);
    });

}