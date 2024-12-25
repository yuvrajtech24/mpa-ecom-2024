## Nimap Ecommerce CRUD Application
1. ***HTML Page*** - Category Master with CRUD operations
2. ***HTML Page*** - Product Master with CRUD operations. A product belongs to a category.

The product list should also display ProductId, ProductName, CategoryName, and CategoryId.
The product list should have pagination on the server side, which means extracting records from DB as per the page size on the view.
So if the page size is 10 and the user is on page 9 then pull only records from 90 - 100.

## Environment Setup
- ***OS*** - Linux Ubuntu / Debian / Windows
- ***IDE*** - VSCODE
- ***JavaScript runtime environment*** - Node
- ***Package manager*** - NPM
- ***Database*** - MySQL Community Server
- ***Database Schema Visualizer*** - DBeaver / MySQL Workbench

## Steps For Running
- ***Step 1*** - Install Node js and then NPM
- ***Step 2*** - Install Mysql Community Server
- ***Step 3*** - Install DBeaver ***(for Linux)*** or MySQL Workbench ***(for Windows)***
- ***Step 4*** - Install VSCODE for development
- ***Step 5*** - Clone Repository to local machine
- ***Step 6*** - Open Repository folder in VSCODE
- ***Step 7*** - For installing Node modules folder or dependencies mentioned  in ***Package.json*** open terminal in VSCODE and run
  ```
  npm install
  ```
- ***Step 8*** - Before running Node JS Project, first start MY SQL Server through command line / terminal

  ***For Windows***
  ```
  mysqld start
  ```

  ***For Linux***
  ```
  sudo systemctl start mysqld
  OR
  sudo service mysqld start
  ```
- ***Step 9*** - Create a ***.env*** file in project directory and paste below code and store it in parent directory
    ```
    # APP Server
    APPHOST="localhost"
    APPPORT=3000
    
    # Database Server
    DBUSERNAME = "<Enter database username>"
    DBPASSWORD = "<Enter database password>"
    DBNAME = "nimapecom"
    DBHOST = "localhost"
    DBPORT = 3306
  
    ```
- ***Step 10*** - Replace database username and password with your database user name and password
- ***Step 11*** - For starting Project server, open terminal in VSCODE and run 
  ```
  nodemon index.js
  OR
  node index.js
  ```
- ***Step 12*** - Start Dbeaver or MySQL Workbench for viewing DATABASE SCHEMA ERD
- ***Step 13*** - Open browser and run ***localhost:3000*** in new tab

## Database
### Database Schema ERD ( Entity Relationship Diagram )
![Screenshot from 2024-12-19 16-42-01](https://github.com/user-attachments/assets/85628c6b-058c-41fe-a1ce-7711c8c5626f)

### Database Schema SQL
- ***CREATE DATABASE***
```sql
CREATE DATABASE nimapecom;
```

- ***products table***
```sql
CREATE TABLE `products` (
  `productId` varchar(100) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `categoryId` varchar(100) NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
```

- ***categories table***
```sql
CREATE TABLE `categories` (
  `categoryId` varchar(100) NOT NULL,
  `categoryName` varchar(100) NOT NULL,
  PRIMARY KEY (`categoryId`)
);
```

## Outputs
![Screenshot 2024-11-21 at 14-00-46 Product Page](https://github.com/user-attachments/assets/667b6f49-8715-4651-86b4-c47415c7c1c5)
![Screenshot 2024-11-21 at 14-00-37 Product Page](https://github.com/user-attachments/assets/7e5fea51-e757-4b8a-977e-3af746c566d6)
![Screenshot 2024-11-21 at 14-00-25 Product Page](https://github.com/user-attachments/assets/83d7c06b-742c-4047-89c7-ff439f5b72f8)
![Screenshot 2024-11-21 at 14-00-09 Product Page](https://github.com/user-attachments/assets/7c34b8d2-c67a-401a-837d-3c4554f7008c)
![Screenshot 2024-11-21 at 14-03-54 Product Page](https://github.com/user-attachments/assets/648b960d-b96e-448e-9ca6-9f9f29301edd)

