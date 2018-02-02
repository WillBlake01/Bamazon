# Bamazon

*What does it do?*<br>
Bamazon is a Command Line Interface (CLI) Node application that provides retail storefront functionality for customers, managers, and supervisors. It's core features include: viewing items and checkout for customers, viewing stock levels, adding to inventory, and adding new products to database for managers, and viewing Profit & Loss metrics as well as creating new departments to the database for supervisors.

*Why is this useful?*<br>
Bamazon is a one stop shop retail app run from the command line without the need to navigate to and open several other applications. It contains built in permissions so each role only has access to the commands granted by pay grade or title.

*How can I get started?* <br>
Just start typing! Follow the directions below &darr;

## Customer View<br>
Enter the below in the command line to initiate the customer user interface:<br>
```
node bamazonCustomer.js
```
<br><br>Once the application is initiated the customer is greeted with a table of items for sale:<br>1. They are prompted to enter the ID of the item they would like to purchase followed by a prompt to enter the quantity desired. <br>2. If the item and quantity is available to promise they are alerted the order has been fulfilled, total amount charged, and asked if they would like to make another purchase. If the item and quantity is out of stock they are notified of insufficient quantity and the order was cancelled.<br><br>![Alt Text](https://media.giphy.com/media/xUOwG1vNingDFqRgSk/giphy.gif)
## Manager View<br>
Enter the below in the command line to initiate the manager user interface:<br>
```
node bamazonManager.js
```
<br><br>Once initiated the manager is given a prompt to choose a task to perform:<br>1. **View products for sale**- displays the items table.<br>2. **View low inventory**- displays a table of all items with inventory of less than 5 units.<br>3. **Add to inventory**- allows manager to add backstock by item ID and quantity.<br>4. **Add new product**- allows manager to add a new item to the products table in the database.<br><br>![Alt Text](https://media.giphy.com/media/xThtapsyCcwwOFyH4s/giphy.gif)
## Supervisor View<br>
Enter the below in the command line to initiate the supervisor user interface:<br>
```
node bamazonSupervisor.js
```
<br><br>Once initiated the supervisor is given a prompt to choose a task to perform:<br>1. **View product sales by department**- displays a Profit & Loss table by department ID. Columns include Department ID, Department Name, Overhead Cost, Product Sales, and Total Profit.<br>2. **Create new department**. allows supervisor to add a new department to the department table in the database.<br><br>![Alt Text](https://media.giphy.com/media/l4pT05FIOy2qOdV0A/giphy.gif)
<br><br>*What technologies are used?*<br>
node.js<br>
mySQL

*Where can I get help?*<br>
For help regarding the Node runtime environment please reference the documentation here [https://nodejs.org/en/](https://nodejs.org/en/). For help with mySQL Database Management system please reference the documentation here [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/). For app specific help please message the address below.

*Who maintains and contributes to this project?*<br>
This project was created by and is maintained by William Blake. Any requests should be forwarded to willblakebooking@gmail.com. Connect with me on [LinkedIn](https://www.linkedin.com/in/william-blake/) or [GitHub](https://github.com/WillBlake01).