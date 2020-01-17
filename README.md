Command line SQLCipher client for Windows

[SQLCipher](https://www.zetetic.net/sqlcipher/) is a sqlite extension which supports data encryption. It provides source code in the community edition, but compiling that for Windows seems not easy. Fortunately, there is a nodejs package named (node-sqlcipher)[https://github.com/journeyapps/node-sqlcipher]. This command line SQLCipher client is developed based on it.

Have a try if you need to read SQLCipher database on Windows.

## Installation

```
# assume that you already installed node
npm i -g sqlcipher-cli
```

## Usage

Connect to the database with your secret key

```
sqlcipher-cli -d test.db -s secretkey
```

Type the query string (it should end with ';') 

```
Database connected
> select * from user;
[ { id: 1, name: '123' } ]
>
```

Type `quit` to exit